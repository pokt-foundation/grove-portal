import { ActionFunction, redirect, json, LoaderFunction } from "@remix-run/node"
import invariant from "tiny-invariant"
import { stripe, Stripe } from "~/models/stripe/stripe.server"
import { authenticator } from "~/utils/auth.server"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { getPoktId, requireUser } from "~/utils/session.server"

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  const userId = getPoktId(user.profile.id)

  const url = new URL(request.url)
  const id = url.searchParams.get("app-id")
  const name = url.searchParams.get("app-name")
  const referral = url.searchParams.get("referral-id")

  if (getRequiredServerEnvVar("FLAG_STRIPE_PAYMENT") === "false") {
    return redirect(`/dashboard/apps/${id}`)
  }

  try {
    // get pokemon relay price
    const priceID = getRequiredServerEnvVar("STRIPE_PRICE_ID")
    const price = await stripe.prices.retrieve(priceID, {
      expand: ["tiers"],
    })

    // check that customer exists or create a new one
    let customer: Stripe.Customer | null = null
    const userExists = await stripe.customers.list({
      email: user.profile._json.email,
    })
    if (userExists.data.length > 0) {
      customer = userExists.data.find((cust) => cust.metadata.user_id === userId) ?? null
    }
    if (!customer) {
      customer = await stripe.customers.create({
        email: user.profile._json.email,
        metadata: {
          user_id: userId,
        },
      })
    }

    // handle metadata that gets tied to the subscription
    let metadata: {} = {
      endpoint_id: id,
      endpoint_name: name,
    }

    if (referral) {
      metadata = {
        ...metadata,
        referral_id: referral,
      }
    }

    // create stripe checkout session and redirect to stripe hosted checkout page
    // TODO: metadata doesnt seem to be sending here: https://stripe.com/docs/api/checkout/sessions/object
    const returnUrl = `${url.origin}/dashboard/apps/${id}`
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      billing_address_collection: "auto",
      line_items: [
        {
          price: price.id,
        },
      ],
      mode: "subscription",
      metadata,
      success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}?success=false`,
    })

    if (session.url) {
      return redirect(session.url)
    }
  } catch (error) {
    const params = new URLSearchParams({
      error: "true",
      message: getErrorMessage(error),
    })
    return redirect(`/dashboard/apps/${id}?${params}`)
  }
}

export const action: ActionFunction = async ({ request }) => {
  // ensure user is logged in
  const user = await authenticator.isAuthenticated(request)
  invariant(user, "user must be logged in")

  return json({
    error: true,
    message: "Stripe checkout session was not established",
  })
}
