import { ActionFunction } from "@remix-run/node"
import { PayPlanType } from "~/models/portal/sdk"
import { updatePlan } from "~/utils/updatePlan.server"

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
