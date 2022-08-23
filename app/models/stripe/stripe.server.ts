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

  const customer = potentialCustomers.data.filter(
    (cust) => cust.metadata.user_id === userId,
  )[0]

  return customer
}
