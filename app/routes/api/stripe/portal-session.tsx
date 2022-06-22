import { ActionFunction, redirect, json } from "@remix-run/node"
import { authenticator } from "~/utils/auth.server"
import { stripe } from "~/models/stripe.server"
import invariant from "tiny-invariant"
import { getPoktId } from "~/utils/session.server"

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  const url = new URL(request.url)
  const returnUrl = `${url.origin}/dashboard`

  invariant(user, "user must be logged in")

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: getPoktId(user.profile.id),
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
