import { ActionFunction, redirect, json } from "@remix-run/node"
import { getCustomer, stripe } from "~/models/stripe/stripe.server"
import { getPoktId, requireUser } from "~/utils/session.server"

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  const userId = getPoktId(user?.profile.id)
  const url = new URL(request.url)
  const defaultReturnPath = "/dashboard"
  const formData = await request.formData()
  const returnPathParam = formData.get("return-path") as string | null
  const returnPath = returnPathParam ?? defaultReturnPath
  const returnUrl = `${url.origin}${returnPath}`

  const customer = await getCustomer(user.profile.emails[0].value, userId)

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
