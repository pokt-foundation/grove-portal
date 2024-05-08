import Stripe from "stripe"
import { getRequiredServerEnvVar } from "~/utils/environment"

export const stripe = new Stripe(getRequiredServerEnvVar("STRIPE_SECRET_KEY"))

export * from "stripe"

export const MOCK_STRIPE_ID =  "sub_1MUaJsKhNIAUaK2OLFvSwCsu"
// export  const MOCK_STRIPE_ID =  "sub_1OJcteKhNIAUaK2Os961zgS5" // Failed payment
// export const MOCK_STRIPE_ID =  "sub_1P2F5mKhNIAUaK2OE0JcYODm" // Unpaid invoice:
// export const MOCK_STRIPE_ID =  "sub_1P2F7EKhNIAUaK2ORtAhuzhN"

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
  accountId: string,
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
    (sub) => sub.metadata.account_id && sub.metadata.account_id === accountId,
  )
}
