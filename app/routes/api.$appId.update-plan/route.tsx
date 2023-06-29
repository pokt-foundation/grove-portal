import { ActionFunction, json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { AdminUpdatePayPlanTypeMutationVariables, PayPlanType } from "~/models/portal/sdk"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredServerEnvVar } from "~/utils/environment"

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
  type: PayPlanType | null
  limit?: number | null
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const id = formData.get("id") as UpdatePlanArgs["id"]
  const type = formData.get("type") as UpdatePlanArgs["type"]
  const limit = formData.get("limit") as UpdatePlanArgs["limit"]

  const result = await updatePlan({ id, type, limit })
  return result
}

export const updatePlan = async ({ id, type, limit }: UpdatePlanArgs) => {
  const portal = initPortalClient()

  try {
    invariant(id, "endpoint id not found")
    invariant(type, "plan type not found")

    const resultGetUserJWT = await portal.getUserJWT({
      username: getRequiredServerEnvVar("ADMIN_EMAIL"),
      password: getRequiredServerEnvVar("ADMIN_PASSWORD"),
    })

    const portalAdmin = initPortalClient({
      token: resultGetUserJWT.getUserJWT,
      "x-Admin-Key": getRequiredServerEnvVar("ADMIN_KEY"),
    })

    let options: AdminUpdatePayPlanTypeMutationVariables = {
      endpointID: id,
      payPlanType: type,
    }

    if (limit) {
      options.customLimit = limit
    }

    await portalAdmin.adminUpdatePayPlanType(options)

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
