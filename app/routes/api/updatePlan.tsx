import { ActionFunction, json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { PayPlanType } from "~/models/portal/sdk"
import { getErrorMessage } from "~/utils/catchError"
import { requireUser } from "~/utils/session.server"

export type UpdatePlanActionData =
  | {
      error: false
    }
  | {
      error: true
      message: string
    }

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  const formData = await request.formData()
  const id = formData.get("id") as string | null
  const type = formData.get("type") as PayPlanType | null
  const portal = initPortalClient(user.accessToken)

  try {
    invariant(id, "endpoint id not found")
    invariant(type, "plan type not found")

    await portal.updateEndpoint({
      input: {
        id: id,
        payPlanType: type,
      },
    })

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
