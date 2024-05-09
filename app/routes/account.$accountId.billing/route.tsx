import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react"
import React from "react"
import invariant from "tiny-invariant"
import ErrorBoundaryView from "~/components/ErrorBoundaryView/ErrorBoundaryView"
import { initPortalClient } from "~/models/portal/portal.server"
import { PayPlanType, RoleName } from "~/models/portal/sdk"
import { Stripe, stripe, STRIPE_RECORDS_LIMIT } from "~/models/stripe/stripe.server"
import { AccountIdLoaderData } from "~/routes/account.$accountId/route"
import AccountBillingLayoutView from "~/routes/account.$accountId.billing/view"
import { getUserAccountRole } from "~/utils/accountUtils"
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

    const getBillingRouteAccountInfoResponse = await portal.getBillingRouteAccountInfo({
      accountID: accountId,
    })

    const account = getBillingRouteAccountInfoResponse.getUserAccount
    const accountStripeId = account.integrations?.stripeSubscriptionID
    const userRole = getUserAccountRole(account.users, user.user.portalUserID) as RoleName

    // Redirect to account page if user is a member or account is on Starter
    if (userRole === RoleName.Member || account.plan.type === PayPlanType.FreetierV0) {
      return redirect(`/account/${accountId}`)
    }

    if (accountStripeId) {
      const subscription = await stripe.subscriptions.retrieve(accountStripeId)
      usageRecords = await stripe.subscriptionItems.listUsageRecordSummaries(
        subscription.items.data[0].id,
        { limit: STRIPE_RECORDS_LIMIT },
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
