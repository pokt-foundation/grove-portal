import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { Stripe, stripe } from "~/models/stripe/stripe.server"
import { AccountBillingOutletContext } from "~/routes/account.$accountId.billing/route"
import AccountBillingView from "~/routes/account.$accountId.billing._index/view"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return [
    {
      title: `Account Billing ${seo_title_append}`,
    },
  ]
}

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
    const invoices = await stripe.invoices.list({
      subscription: String(accountStripeId),
      limit: 21,
    })

    const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
      subscription: String(accountStripeId),
    })

    return json<AccountBillingLoaderData>({
      upcomingInvoice,
      invoices: invoices.data ?? [],
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
