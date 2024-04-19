import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import invariant from "tiny-invariant"
import { AccountPlanView } from "./view"
import ErrorBoundaryView from "~/components/ErrorBoundaryView/ErrorBoundaryView"
import { AnalyticsRelaysTotal } from "~/models/dwh/sdk/models/AnalyticsRelaysTotal"
import { getTotalRelays } from "~/models/portal/dwh.server"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account, PortalApp, User } from "~/models/portal/sdk"
import { Stripe, stripe } from "~/models/stripe/stripe.server"
import { AppIdOutletContext } from "~/routes/account.$accountId.$appId/route"
import { getErrorMessage } from "~/utils/catchError"
import { dayjs } from "~/utils/dayjs"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return [
    {
      title: `Account Plan ${seo_title_append}`,
    },
  ]
}

export type AccountAppRelays = Pick<AnalyticsRelaysTotal, "countTotal"> &
  Pick<PortalApp, "name" | "appEmoji">

export type AccountPlanLoaderData = {
  account: Account
  subscription?: Stripe.Subscription
  usageRecords?: Stripe.ApiList<Stripe.UsageRecordSummary>
  latestInvoice?: Stripe.Invoice
  accountAppsRelays: AccountAppRelays[]
  user: User
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
    let subscription
    let usageRecords
    let latestInvoice
    let account
    const accountAppsRelays: AccountAppRelays[] = []

    account = await portal.getUserAccount({ accountID: accountId, accepted: true })

    if (account.getUserAccount.integrations?.stripeSubscriptionID) {
      subscription = await stripe.subscriptions.retrieve(
        account.getUserAccount.integrations.stripeSubscriptionID,
      )

      usageRecords = await stripe.subscriptionItems.listUsageRecordSummaries(
        subscription.items.data[0].id,
        { limit: 3 },
      )

      if (subscription.latest_invoice) {
        latestInvoice = await stripe.invoices.retrieve(`${subscription.latest_invoice}`)

        const invoicePeriodStart = dayjs.unix(Number(latestInvoice.period_start)).toDate()
        const invoicePeriodEnd = dayjs.unix(Number(latestInvoice.period_end)).toDate()

        const accountApps = account.getUserAccount.portalApps as PortalApp[]
        const sortedAccountApps = accountApps.sort((a, b) => (a.name > b.name ? 1 : -1))

        if (sortedAccountApps && sortedAccountApps.length > 0) {
          for (const app of accountApps) {
            const total = (await getTotalRelays({
              category: "application_id",
              categoryValue: [app.id],
              from: invoicePeriodStart,
              to: invoicePeriodEnd,
            })) as AnalyticsRelaysTotal

            accountAppsRelays.push({
              ...total,
              name: app?.name,
              appEmoji: app?.appEmoji,
            } as AccountAppRelays)
          }
        }
      }
    }

    return json<AccountPlanLoaderData>({
      account: account.getUserAccount as Account,
      subscription,
      usageRecords,
      latestInvoice,
      accountAppsRelays,
      user: user.user,
    })
  } catch (error) {
    throw new Response(getErrorMessage(error), {
      status: 500,
    })
  }
}

export default function AccountPlanDetails() {
  const data = useLoaderData<AccountPlanLoaderData>()
  const { userRole } = useOutletContext<AppIdOutletContext>()

  return <AccountPlanView {...data} userRole={userRole} />
}

export function ErrorBoundary() {
  return <ErrorBoundaryView />
}
