import { ActionFunction, redirect, json } from "@remix-run/node"
import { authenticator } from "~/utils/auth.server"
import { stripe } from "~/models/stripe.server"
import invariant from "tiny-invariant"

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const user = await authenticator.isAuthenticated(request)
  const url = new URL(request.url)
  const returnUrl = `${url.origin}/dashboard`

  invariant(user, "user must be logged in")

  const lookup_key = formData.get("lookup_key")
  invariant(
    lookup_key && typeof lookup_key === "string",
    "Need a price 'lookup key' of type string in order to place an order.",
  )

  const quantity = formData.get("quantity")
  invariant(
    quantity && typeof quantity === "number",
    "Need a quanity value of type number in order to place an order.",
  )

  const doesUserExists = await stripe.customers.retrieve("test") //user.poktId)

  const prices = await stripe.prices.list({
    lookup_keys: [lookup_key],
    expand: ["data.product"],
  })

  const session = await stripe.checkout.sessions.create({
    customer: doesUserExists ? user.profile.id : undefined,
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: quantity,
      },
    ],
    mode: "subscription",
    success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${returnUrl}?canceled=true`,
  })

  if (session.url) {
    return redirect(session.url)
  }

  return json({
    error: true,
    message: "Stripe checkout session was not established",
  })
}
