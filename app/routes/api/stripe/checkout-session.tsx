import { ActionFunction, redirect, json } from "@remix-run/node"
import { authenticator } from "~/utils/auth.server"
import { stripe, Stripe } from "~/models/stripe.server"
import invariant from "tiny-invariant"
import { getPoktId } from "~/utils/session.server"

export const action: ActionFunction = async ({ request }) => {
  // ensure user is logged in
  const user = await authenticator.isAuthenticated(request)
  invariant(user, "user must be logged in")
  const id = getPoktId(user.profile.id)

  // get products from subscription cart
  const formData = await request.formData()
  const productsStringified = formData.getAll("product")
  invariant(productsStringified, "A product must be pased in order to place an order.")
  const products: {
    id: string
    name: string
    quantity: string
  }[] = productsStringified.map((product) => JSON.parse(product as string))

  // check that custom exists or create a new one
  let customer: Stripe.Customer | null = null
  const userExists = await stripe.customers.list({
    email: user.profile.emails[0].value,
  })
  if (userExists.data.length > 0) {
    customer = userExists.data.find((cust) => cust.metadata.poktId === id) ?? null
  }
  if (!customer) {
    customer = await stripe.customers.create({
      email: user.profile.emails[0].value,
      metadata: {
        poktId: id,
      },
    })
  }

  // get prices from stripe or create new products with prices if they dont exist
  let prices: Stripe.ApiList<Stripe.Price>
  prices = await stripe.prices.list({
    lookup_keys: products.map((product) => product.id),
    expand: ["data.product"],
  })

  if (prices && prices.data.length !== products.length) {
    const remainders = products.filter(
      (product) => !prices.data.find((price) => price.id === product.id),
    )
    const newPrices = await Promise.all(
      remainders.map(async (product) => {
        await stripe.products.create({
          id: product.id,
          name: product.name,
        })
        return stripe.prices.create({
          currency: "usd",
          product: product.id,
          lookup_key: product.id,
          recurring: {
            interval: "month",
            usage_type: "licensed",
          },
          unit_amount: 100,
        })
      }),
    )
    prices.data = [...prices.data, ...newPrices]
  }

  // create stripe checkout session and redirect to stripe hosted checkout page
  const url = new URL(request.url)
  const returnUrl = `${url.origin}/dashboard`

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    billing_address_collection: "auto",
    line_items: prices.data.map((price) => ({
      price: price.id,
      quantity: Number(products.find((product) => product.id === price.id)?.quantity),
    })),
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
