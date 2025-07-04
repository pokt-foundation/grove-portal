import { json, LoaderFunction, redirect } from "@remix-run/node"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { Stripe, stripe, STRIPE_RECORDS_LIMIT } from "~/models/stripe/stripe.server"
import { AccountBillingOutletContext } from "~/routes/account.$accountId.billing/route"
import AccountBillingView from "~/routes/account.$accountId.billing._index/view"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { requireUser } from "~/utils/user.server"

export type AccountBillingLoaderData = {
  upcomingInvoice?: Stripe.UpcomingInvoice
  invoices: Stripe.Invoice[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { accountId } = params

  invariant(accountId, "account id not found")

  if (getRequiredServerEnvVar("FLAG_STRIPE_PAYMENT") === "false") {
    return redirect(`/account/${accountId}/settings`)
  }

  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  try {
    const getUserAccountStripeIdResponse = await portal.getUserAccountStripeId({
      accountID: accountId,
    })
    const accountStripeId =
      getUserAccountStripeIdResponse.getUserAccount.integrations?.stripeSubscriptionID
    let invoices: Stripe.Invoice[] = []
    let upcomingInvoice: Stripe.UpcomingInvoice | undefined
    if (accountStripeId) {
      const invoicesResponse = await stripe.invoices.list({
        subscription: String(accountStripeId),
        limit: STRIPE_RECORDS_LIMIT,
      })

      invoices = invoicesResponse?.data ?? []

      upcomingInvoice = await stripe.invoices.createPreview({
        subscription: String(accountStripeId),
      })
    }

    return json<AccountBillingLoaderData>({
      upcomingInvoice,
      invoices,
    })
  } catch (error) {
    throw new Response(getErrorMessage(error), {
      status: 500,
    })
  }
}
export default function AccountBilling() {
  const { userRole, usageRecords } = useOutletContext<AccountBillingOutletContext>()
  const { upcomingInvoice, invoices } = useLoaderData<AccountBillingLoaderData>()

  return (
    <AccountBillingView
      invoices={invoices}
      upcomingInvoice={upcomingInvoice}
      usageRecords={usageRecords}
      userRole={userRole}
    />
  )
}
