import { json, LoaderFunction, redirect } from "@remix-run/node"
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react"
import React from "react"
import invariant from "tiny-invariant"
import ErrorBoundaryView from "~/components/ErrorBoundaryView/ErrorBoundaryView"
import { initPortalClient } from "~/models/portal/portal.server"
import { Stripe, stripe } from "~/models/stripe/stripe.server"
import { AccountIdLoaderData } from "~/routes/account.$accountId/route"
import AccountBillingLayoutView from "~/routes/account.$accountId.billing/view"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { requireUser } from "~/utils/user.server"

export type AccountBillingOutletLoaderData = {
  subscription?: Stripe.Subscription
  usageRecords?: Stripe.UsageRecordSummary[]
}

export type AccountBillingOutletContext = AccountBillingOutletLoaderData &
  AccountIdLoaderData
export const loader: LoaderFunction = async ({ request, params }) => {
  const { accountId } = params

  invariant(accountId, "account id not found")

  if (getRequiredServerEnvVar("FLAG_STRIPE_PAYMENT") === "false") {
    return redirect(`/account/${accountId}/settings`)
  }

  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  try {
    let usageRecords

    const getUserAccountStripeIdResponse = await portal.getUserAccountStripeId({
      accountID: accountId,
    })
    const accountStripeId =
      getUserAccountStripeIdResponse.getUserAccount.integrations?.stripeSubscriptionID

    if (accountStripeId) {
      const subscription = await stripe.subscriptions.retrieve(accountStripeId)
      usageRecords = await stripe.subscriptionItems.listUsageRecordSummaries(
        subscription.items.data[0].id,
        { limit: 21 },
      )
    }

    return json<AccountBillingOutletLoaderData>({
      usageRecords: usageRecords?.data ?? [],
    })
  } catch (error) {
    throw new Response(getErrorMessage(error), {
      status: 500,
    })
  }
}
export default function AccountBilling() {
  const outletData = useOutletContext<AccountIdLoaderData>()
  const { usageRecords } = useLoaderData<AccountBillingOutletLoaderData>()

  return (
    <AccountBillingLayoutView>
      <Outlet
        context={
          {
            ...outletData,
            usageRecords,
          } as AccountBillingOutletContext
        }
      />
    </AccountBillingLayoutView>
  )
}
export function ErrorBoundary() {
  return <ErrorBoundaryView />
}
