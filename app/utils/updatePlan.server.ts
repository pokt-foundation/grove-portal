import { json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { AdminUpdateAccountMutationVariables, PayPlanType } from "~/models/portal/sdk"
import {
  UpdatePlanActionData,
  UpdatePlanArgs,
} from "~/routes/api.admin.update-plan/route"
import { initAdminPortal } from "~/utils/adminPortal"
import { getErrorMessage } from "~/utils/catchError"
import { triggerSubscriptionActionNotification } from "~/utils/notifications.server"
import { getPlanName } from "~/utils/planUtils"

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
