import Stripe from "stripe"
import { getRequiredServerEnvVar } from "~/utils/environment"

export const stripe = new Stripe(getRequiredServerEnvVar("STRIPE_SECRET_KEY"), {
  apiVersion: "2020-08-27",
})

export * from "stripe"

export const getCustomer = async (
  email: string,
  userId: string,
): Promise<Stripe.Customer | undefined> => {
  const potentialCustomers = await stripe.customers.list({
    email: email,
  })

  const customer = potentialCustomers.data.find(
    (cust) => cust.metadata.user_id === userId,
  )

  return customer
}

export const getSubscription = async (
  email: string,
  endpointId: string,
  userId: string,
): Promise<Stripe.Subscription | undefined> => {
  const customer = await getCustomer(email, userId)

  if (!customer) {
    return undefined
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: customer.id,
  })

  return subscriptions.data.find(
    (sub) => sub.metadata.endpoint_id && sub.metadata.endpoint_id === endpointId,
  )
}
