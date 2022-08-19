import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import Button from "~/components/shared/Button"
import Card, { links as CardLinks } from "~/components/shared/Card"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"
import Group from "~/components/shared/Group"
import { initPortalClient } from "~/models/portal/portal.server"
import { ProcessedEndpoint } from "~/models/portal/sdk"
import { getCustomer, Stripe, stripe } from "~/models/stripe.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getErrorMessage } from "~/utils/catchError"
import { dayjs } from "~/utils/dayjs"
import { FREE_TIER_MAX_RELAYS } from "~/utils/pocketUtils"
import { getPoktId, requireUser } from "~/utils/session.server"

export const links = () => {
  return [...CardLinks(), ...CardListLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: "Application Plan Details",
  }
}

type AppPlanLoaderData =
  | {
      error: false
      subscription: Stripe.Subscription
      usageRecords: Stripe.ApiList<Stripe.UsageRecordSummary>
      invoice: Stripe.Invoice
      endpoint: ProcessedEndpoint
    }
  | {
      error: true
      message: string
    }

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.appId, "app id not found")
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
          return json(
            {
              error: false,
              subscription: subscription,
              usageRecords,
              invoice: invoiceLatest,
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

  const subscriptionItems: CardListItem[] = [
    {
      label: "Total Relays on this Billing Period",
      value: !data.error ? data.usageRecords.data[0].total_usage : 0,
    },
  ]

  const invoiceItems: CardListItem[] = [
    {
      label: "Invoice",
      value: !data.error ? data.invoice.id : "",
    },
    {
      label: "Status",
      // eslint-disable-next-line no-nested-ternary
      value: !data.error ? (data.invoice.paid ? "Paid" : "Open") : "",
    },
    {
      label: "Period Start",
      value: !data.error ? dayjs.unix(Number(data.invoice.period_start)).toString() : "",
    },
    {
      label: "Period End",
      value: !data.error ? dayjs.unix(Number(data.invoice.period_end)).toString() : "",
    },
  ]

  return (
    <>
      {!data.error && (
        <>
          <Card>
            <div className="pokt-card-header">
              <h3>Application Plan</h3>
            </div>
            <div>
              <CardList items={subscriptionItems} />
              {data.subscription.id}
            </div>
          </Card>
          <Card>
            <div className="pokt-card-header">
              <h3>Latest Invoice</h3>
            </div>
            <CardList items={invoiceItems} />
            <Group mt="xl" position="apart">
              <Button
                component="a"
                href={data.invoice.hosted_invoice_url ?? ""}
                rel="noreferrer"
                target="_blank"
              >
                View in Stripe
              </Button>
              <Button
                component="a"
                href={data.invoice.invoice_pdf ?? ""}
                rel="noreferrer"
                target="_blank"
              >
                Download
              </Button>
            </Group>
          </Card>
        </>
      )}
    </>
  )
}

export default AppPlanDetails
