import { ActionFunction, json, redirect } from "@remix-run/node"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { PayPlanType, UpdateEndpointMutation } from "~/models/portal/sdk"
import { getSubscription, stripe, Stripe } from "~/models/stripe/stripe.server"
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
  const userId = await getPoktId(user.profile.id)
  const portal = initPortalClient(user.accessToken)
  const formData = await request.formData()
  const appId = formData.get("app-id")

  try {
    invariant(appId, "app id not found")
    const { endpoint } = await portal.endpoint({
      endpointID: appId as string,
    })
    const subscription = await getSubscription(
      user.profile.emails[0].value,
      endpoint.id,
      userId,
    )

    if (subscription) {
      const cancel = await stripe.subscriptions.update(subscription.id, {
        cancel_at_period_end: true,
      })
      if (cancel) {
        await portal.updateEndpoint({
          input: {
            id: appId as string,
            payPlanType: PayPlanType.FreetierV0,
          },
        })
        return redirect(`/dashboard/apps/${appId}`)
      }
    }

    throw new Error("no subscription")
  } catch (error) {
    return redirect(
      `/dashboard/apps/${appId}?cancelError=true&cancelMessage=${getErrorMessage(error)}`,
    )
  }
}
