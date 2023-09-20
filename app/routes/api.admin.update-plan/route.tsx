import { ActionFunction, json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { AdminUpdatePortalAppMutationVariables, PayPlanTypeV2 } from "~/models/portal/sdk"
import { initAdminPortal } from "~/utils/admin"
import { getErrorMessage } from "~/utils/catchError"

export type UpdatePlanActionData =
  | {
      error: false
    }
  | {
      error: true
      message: string
    }

export type UpdatePlanArgs = {
  id: string | null
  type: PayPlanTypeV2 | null
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
    })
  } catch (error) {
    return json<UpdatePlanActionData>({
      error: true,
      message: getErrorMessage(error),
    })
  }
}
