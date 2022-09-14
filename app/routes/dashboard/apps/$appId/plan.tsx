import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { ProcessedEndpoint } from "~/models/portal/sdk"
import { getRelays, RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { getCustomer, Stripe, stripe } from "~/models/stripe/stripe.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getErrorMessage } from "~/utils/catchError"
import { dayjs } from "~/utils/dayjs"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { getPoktId } from "~/utils/session"
import { requireUser } from "~/utils/session.server"
import PlanView, {
  links as PlanViewLinks,
} from "~/views/dashboard/apps/appId/plan/planView"

export const links = () => {
  return [...PlanViewLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: "Application Plan Details",
  }
}

export type AppPlanLoaderData =
  | {
      error: false
      subscription: Stripe.Subscription
      usageRecords: Stripe.ApiList<Stripe.UsageRecordSummary>
      invoice: Stripe.Invoice
      relaysLatestInvoice: RelayMetric
      endpoint: ProcessedEndpoint
    }
  | {
      error: true
      message: string
    }

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.appId, "app id not found")
  if (getRequiredServerEnvVar("FLAG_STRIPE_PAYMENT") === "false") {
    return redirect(`/dashboard/apps/${params.appId}`)
  }
  const user = await requireUser(request)
  const userId = await getPoktId(user.profile.id)
  const portal = initPortalClient(user.accessToken)

  try {
    const { endpoint } = await portal.endpoint({
      endpointID: params.appId,
    })
    const customer = await getCustomer(user.profile.emails[0].value, userId)

    if (customer) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
      })

      const subscription = subscriptions.data.filter(
        (sub) => sub.metadata.endpoint_id && sub.metadata.endpoint_id === endpoint.id,
      )[0]

      if (subscription) {
        if (subscription.latest_invoice) {
          const usageRecords = await stripe.subscriptionItems.listUsageRecordSummaries(
            subscription.items.data[0].id,
            { limit: 3 },
          )
          const invoiceLatest = await stripe.invoices.retrieve(
            `${subscription.latest_invoice}`,
          )

          const invoicePeriodStart = dayjs
            .unix(Number(invoiceLatest.period_start))
            .toISOString()
          const invoicePeriodEnd = dayjs
            .unix(Number(invoiceLatest.period_start))
            .toISOString()
          const relaysLatestInvoice = await getRelays(
            "endpoints",
            invoicePeriodStart,
            invoicePeriodEnd,
            endpoint.id,
          )

          return json(
            {
              error: false,
              subscription: subscription,
              usageRecords,
              invoice: invoiceLatest,
              relaysLatestInvoice,
              endpoint,
            },
            {
              headers: {
                "Cache-Control": `private, max-age=${
                  process.env.NODE_ENV === "production" ? "3600" : "60"
                }`,
              },
            },
          )
        }
      }

      return redirect(`/dashboard/apps/${params.appId}`)
    }
  } catch (error) {
    return json({
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export const AppPlanDetails = () => {
  const data = useLoaderData() as AppPlanLoaderData

  useEffect(() => {
    trackEvent(AmplitudeEvents.AppPlanDetailsView)
  }, [])

  return <PlanView {...data} />
}

export default AppPlanDetails
