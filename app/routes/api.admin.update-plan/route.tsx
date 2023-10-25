import { ActionFunction, json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { AdminUpdatePortalAppMutationVariables, PayPlanType } from "~/models/portal/sdk"
import { initAdminPortal } from "~/utils/adminPortal"
import { getErrorMessage } from "~/utils/catchError"

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

  return await updatePlan({ id, type, limit, subscription })
}

export const updatePlan = async ({ id, type, limit, subscription }: UpdatePlanArgs) => {
  const portal = initPortalClient()

  try {
    invariant(id, "endpoint id not found")
    invariant(type, "plan type not found")

    const portalAdmin = await initAdminPortal(portal)

    const options: AdminUpdatePortalAppMutationVariables = {
      input: {
        portalAppID: id,
        payPlanType: type,
      },
    }

    if (limit) {
      options.input.customLimit = limit
    }
    if (subscription) {
      options.input.stripeSubscriptionID = subscription
    }

    await portalAdmin.adminUpdatePortalApp(options)

    return json<UpdatePlanActionData>({
      error: false,
      message: `Application ${id} has successfully been updated to ${type}`,
    })
  } catch (error) {
    return json<UpdatePlanActionData>({
      error: true,
      message: getErrorMessage(error),
    })
  }
}
