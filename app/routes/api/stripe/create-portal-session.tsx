import { ActionFunction, redirect, json } from "@remix-run/node"
import { getUserId } from "~/utils/session.server"
import { stripe } from "~/models/stripe.server"

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserId(request)
  const url = new URL(request.url)
  const returnUrl = `${url.origin}/dashboard`

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: userId,
    return_url: returnUrl,
  })

  if (portalSession.url) {
    return redirect(portalSession.url)
  }

  return json({
    error: true,
    message: "Stripe portal session was not established",
  })
}
