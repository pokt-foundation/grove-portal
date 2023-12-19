import { ActionFunction, json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { AdminUpdateAccountMutationVariables, PayPlanType } from "~/models/portal/sdk"
import { initAdminPortal } from "~/utils/adminPortal"
import { getErrorMessage } from "~/utils/catchError"
import { triggerSubscriptionActionNotification } from "~/utils/notifications.server"
import { getPlanName } from "~/utils/planUtils"

export type UpdatePlanActionData = {
  error: boolean
  message: string
}

export type UpdatePlanArgs = {
  id: string | null
  type: PayPlanType | null
  limit?: number | null
  subscription?: string | null
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const id = formData.get("id") as UpdatePlanArgs["id"]
  const type = formData.get("type") as UpdatePlanArgs["type"]
  const limit = formData.get("limit") as UpdatePlanArgs["limit"]
  const subscription = formData.get("subscription") as UpdatePlanArgs["subscription"]

  return await updatePlan({
    id,
    type,
    limit,
    subscription,
  })
}

export const updatePlan = async ({
  id,
  type: planType,
  limit,
  subscription,
}: UpdatePlanArgs) => {
  const portal = initPortalClient()

  try {
    invariant(id, "account id not found")
    invariant(planType, "plan type not found")

    const portalAdmin = await initAdminPortal(portal)

    const options: AdminUpdateAccountMutationVariables = {
      input: { accountID: id, payPlanType: planType },
    }

    if (limit) {
      options.input.enterpriseLimit = limit
    }
    if (subscription) {
      options.input.stripeSubscriptionID = subscription
    }

    await portalAdmin.adminUpdateAccount(options)

    if (planType !== PayPlanType.FreetierV0) {
      await triggerSubscriptionActionNotification({
        planType,
        accountId: id,
        type: "upgrade",
      })
    }

    return json<UpdatePlanActionData>({
      error: false,
      message: `Account ${id} has successfully been updated to ${getPlanName(planType)}`,
    })
  } catch (error) {
    return json<UpdatePlanActionData>({
      error: true,
      message: getErrorMessage(error),
    })
  }
}
