import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import invariant from "tiny-invariant"
import { AccountPlanView } from "./view"
import ErrorView from "~/components/ErrorView"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account, PortalApp, User } from "~/models/portal/sdk"
import { getRelays, RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { Stripe, stripe } from "~/models/stripe/stripe.server"
import { AppIdOutletContext } from "~/routes/account.$accountId.$appId/route"
import { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { dayjs } from "~/utils/dayjs"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Account Plan ${seo_title_append}`,
  }
}

export type AccountAppRelays = RelayMetric & Pick<PortalApp, "name" | "appEmoji">

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
  const account = await portal.getUserAccount({ accountID: accountId, accepted: true })

  if (!account.getUserAccount) {
    throw new Error(
      `Account ${params.accountId} not found for user ${user.user.portalUserID}`,
    )
  }

  try {
    let subscription
    let usageRecords
    let latestInvoice
    const accountAppsRelays = []

    if (account.getUserAccount.integrations?.stripeSubscriptionID) {
      subscription = await stripe.subscriptions.retrieve(
        account.getUserAccount.integrations.stripeSubscriptionID,
      )

      if (!subscription) {
        throw new Error(`Subscription not found for account`)
      }

      usageRecords = await stripe.subscriptionItems.listUsageRecordSummaries(
        subscription.items.data[0].id,
        { limit: 3 },
      )
      if (!usageRecords) {
        throw new Error(`Useage records not found for subscription ${subscription.id}`)
      }

      if (subscription.latest_invoice) {
        latestInvoice = await stripe.invoices.retrieve(`${subscription.latest_invoice}`)
        if (!latestInvoice) {
          throw new Error(`Latest invoice not found for subscription ${subscription.id}`)
        }

        const invoicePeriodStart = dayjs
          .unix(Number(latestInvoice.period_start))
          .toISOString()
        const invoicePeriodEnd = dayjs
          .unix(Number(latestInvoice.period_end))
          .toISOString()

        const accountApps = account.getUserAccount.portalApps
        if (accountApps && accountApps.length > 0) {
          for (const app of accountApps) {
            const latestInvoiceRelays = await getRelays(
              "endpoints",
              invoicePeriodStart,
              invoicePeriodEnd,
              app?.id,
            )

            if (!latestInvoiceRelays) {
              throw new Error(
                `Relays not found for latest invoice period on account for app ${app?.id}`,
              )
            }

            accountAppsRelays.push({
              ...latestInvoiceRelays,
              name: app?.name,
              appEmoji: app?.appEmoji,
            } as AccountAppRelays)
          }
        }
      }
    }

    return json<DataStruct<AccountPlanLoaderData>>({
      data: {
        account: account.getUserAccount as Account,
        subscription,
        usageRecords,
        latestInvoice,
        accountAppsRelays,
        user: user.user,
      },
      error: false,
    })
  } catch (error) {
    return json<DataStruct<AccountPlanLoaderData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export const AccountPlanDetails = () => {
  const { data, error, message } = useLoaderData() as DataStruct<AccountPlanLoaderData>
  const { userRole } = useOutletContext<AppIdOutletContext>()

  if (error) {
    return <ErrorView message={message} />
  }

  return <AccountPlanView {...data} userRole={userRole} />
}

export default AccountPlanDetails
