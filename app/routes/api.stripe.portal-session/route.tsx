import { ActionFunction, redirect, json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { getCustomer, stripe } from "~/models/stripe/stripe.server"
import { getPoktId, requireUser } from "~/utils/user.server"

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  invariant(user.profile.id && user.profile.emails, "user not found")
  const userId = getPoktId(user.profile.id)
  const url = new URL(request.url)
  const defaultReturnPath = "/account"
  const formData = await request.formData()
  const returnPathParam = formData.get("return-path") as string | null
  const returnPath = returnPathParam ?? defaultReturnPath
  const returnUrl = `${url.origin}${returnPath}`

  const uEmail = user?.profile?._json?.email ?? ""
  const customer = await getCustomer(uEmail, userId)

  if (customer) {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
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
