import { ActionFunction, json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { PayPlanType } from "~/models/portal/sdk"
import { getSubscription, stripe, Stripe } from "~/models/stripe/stripe.server"
import { updatePlan } from "~/routes/api.$appId.update-plan/route"
import { getErrorMessage } from "~/utils/catchError"
import { getPoktId, requireUser } from "~/utils/session.server"

export type StripeDeleteActionData =
  | {
      error: false
      subscription: Stripe.Subscription
    }
  | {
      error: true
      message: string
    }

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  invariant(user.profile.id && user.profile.emails, "user not found")
  const userId = await getPoktId(user.profile.id)
  const portal = initPortalClient(user.accessToken)
  const formData = await request.formData()
  const appId = formData.get("app-id")
  const renew = formData.get("subscription-renew")
  const action = renew !== "true"

  try {
    invariant(appId, "app id not found")
    const { endpoint } = await portal.endpoint({
      endpointID: appId as string,
    })
    const uEmail = user?.profile?._json?.email ?? ""
    const subscription = await getSubscription(uEmail, endpoint.id, userId)

    if (subscription) {
      const updatedSubscription = await stripe.subscriptions.update(subscription.id, {
        cancel_at_period_end: action,
      })
      if (updatedSubscription) {
        await updatePlan({
          id: appId as string,
          type: action ? PayPlanType.FreetierV0 : PayPlanType.PayAsYouGoV0,
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
