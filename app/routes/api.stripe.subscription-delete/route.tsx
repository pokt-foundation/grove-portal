import { ActionFunction, json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { PayPlanType } from "~/models/portal/sdk"
import { getSubscription, stripe } from "~/models/stripe/stripe.server"
import { updatePlan } from "~/routes/api.admin.update-plan/route"
import { getErrorMessage } from "~/utils/catchError"
import { getPoktId, requireUser } from "~/utils/user.server"

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  invariant(user.user.auth0ID && user.user.email, "user not found")
  const userId = getPoktId(user.user.auth0ID)
  const formData = await request.formData()
  const accountId = formData.get("account-id")

  try {
    invariant(accountId, "account id not found")
    const uEmail = user.user.email ?? ""
    const subscription = await getSubscription(uEmail, accountId as string, userId)

    if (subscription) {
      const updatedSubscription = await stripe.subscriptions.del(subscription.id)
      if (updatedSubscription) {
        await updatePlan({
          id: accountId as string,
          type: PayPlanType.FreetierV0,
        })

        return json({
          error: false,
          subscription: updatedSubscription,
        })
      }
    }

    throw new Error("no subscription")
  } catch (error) {
    return json({
      error: true,
      message: getErrorMessage(error),
    })
  }
}
