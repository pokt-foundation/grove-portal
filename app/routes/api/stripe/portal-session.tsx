import { ActionFunction, redirect, json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { stripe } from "~/models/stripe.server"
import { authenticator } from "~/utils/auth.server"
// import { getPoktId } from "~/utils/session.server"

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  const url = new URL(request.url)
  const returnUrl = `${url.origin}/dashboard`

  invariant(user, "user must be logged in")

  const customer = await stripe.customers.list({
    email: user.profile.emails[0].value,
  })

  if (customer) {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.data[0].id,
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
  return json({
    error: true,
    message: "Stripe customer not found",
  })
}
