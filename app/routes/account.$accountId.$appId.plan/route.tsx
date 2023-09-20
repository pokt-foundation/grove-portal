import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import PlanView, { links as PlanViewLinks } from "./view"
import ErrorView from "~/components/ErrorView"
import { initPortalClient } from "~/models/portal/portal.server"
import { PortalApp } from "~/models/portal/sdk"
import { getRelays, RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { Stripe, stripe } from "~/models/stripe/stripe.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getErrorMessage } from "~/utils/catchError"
import { dayjs } from "~/utils/dayjs"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { LoaderDataStruct } from "~/utils/loader"
import { requireUser } from "~/utils/user.server"

export const links = () => {
  return [...PlanViewLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: "Application Plan Details",
  }
}

export type AppPlanLoaderData = {
  app: PortalApp
  subscription?: Stripe.Subscription
  usageRecords?: Stripe.ApiList<Stripe.UsageRecordSummary>
  latestInvoice?: Stripe.Invoice
  latestInvoiceRelays?: RelayMetric
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { appId, accountId } = params
  invariant(appId, "app id not found")

  if (getRequiredServerEnvVar("FLAG_STRIPE_PAYMENT") === "false") {
    return redirect(`/account/${accountId}/${params.appId}`)
  }

  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  try {
    const getUserPortalAppResponse = await portal.getUserPortalApp({
      portalAppID: appId,
    })
    if (!getUserPortalAppResponse.getUserPortalApp) {
      throw new Error(
        `Account ${params.appId} not found for user ${user.user.portalUserID}`,
      )
    }
    const app = getUserPortalAppResponse.getUserPortalApp

    let subscription
    let usageRecords
    let latestInvoice
    let latestInvoiceRelays

    if (app.legacyFields.stripeSubscriptionID) {
      subscription = await stripe.subscriptions.retrieve(
        app.legacyFields.stripeSubscriptionID,
      )

      if (!subscription) {
        throw new Error(`Subscription not found for app ${app.id}`)
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
          .unix(Number(latestInvoice.period_start))
          .toISOString()
        latestInvoiceRelays = await getRelays(
          "endpoints",
          invoicePeriodStart,
          invoicePeriodEnd,
          getUserPortalAppResponse.getUserPortalApp.id,
        )

        if (!latestInvoiceRelays) {
          throw new Error(`Relays not found for lastest invoice period on app ${app.id}`)
        }
      }
    }

    return json<LoaderDataStruct<AppPlanLoaderData>>({
      data: {
        app: app as PortalApp,
        subscription,
        usageRecords,
        latestInvoice,
        latestInvoiceRelays,
      },
      error: false,
    })
  } catch (error) {
    return json<LoaderDataStruct<AppPlanLoaderData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export const AppPlanDetails = () => {
  const { data, error, message } = useLoaderData() as LoaderDataStruct<AppPlanLoaderData>

  useEffect(() => {
    trackEvent(AmplitudeEvents.AppPlanDetailsView)
  }, [])

  if (error) {
    return <ErrorView message={message} />
  }

  return <PlanView {...data} />
}

export default AppPlanDetails
