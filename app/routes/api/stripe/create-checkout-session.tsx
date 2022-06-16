import { ActionFunction, redirect, json } from "@remix-run/node"
import { getUserId } from "~/utils/session.server"
import { stripe } from "~/models/stripe.server"
import invariant from "tiny-invariant"

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const userId = await getUserId(request)
  const url = new URL(request.url)
  const returnUrl = `${url.origin}/dashboard`

  const lookup_key = formData.get("lookup_key")
  invariant(lookup_key, "Need a price lookup key in order to place an order.")
  invariant(typeof lookup_key === "string", "Need a price lookup key must be a string")

  const quantity = formData.get("quantity")
  invariant(quantity, "Need a quanity value in order to place an order.")
  invariant(typeof quantity === "number", "Need a quantity value must be a number")

  const doesUserExists = await stripe.customers.retrieve(userId)

  const prices = await stripe.prices.list({
    lookup_keys: [lookup_key],
    expand: ["data.product"],
  })

  const session = await stripe.checkout.sessions.create({
    customer: doesUserExists ? userId : undefined,
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
