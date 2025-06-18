import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import invariant from "tiny-invariant"
import { getBillingPeriodRelays } from "~/models/portal/dwh.server"
import { initPortalClient } from "~/models/portal/portal.server"
import { D2Stats } from "~/models/portal/sdk"
import { stripe, Stripe } from "~/models/stripe/stripe.server"
import { AccountBillingOutletContext } from "~/routes/account.$accountId.billing/route"
import InvoiceView from "~/routes/account.$accountId.billing.$invoiceId/view"
import { getErrorMessage } from "~/utils/catchError"
import { dayjs } from "~/utils/dayjs"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = ({ data }) => {
  const { invoice } = data as InvoiceLoaderData
  return [
    {
      title: `Invoice ${invoice?.number} ${seo_title_append}`,
    },
  ]
}

export type InvoiceLoaderData = {
  invoiceUsageStats?: D2Stats[]
  invoice: Stripe.Invoice
  charge?: Stripe.Charge
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { accountId, invoiceId } = params

  invariant(accountId, "account id not found")
  invariant(invoiceId, "invoice id not found")

  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  try {
    const invoice = await stripe.invoices.retrieve(`${invoiceId}`, {
      expand: ["discounts", "charge"],
    })

    const invoicePeriodStart = dayjs.unix(Number(invoice.period_start)).toDate()
    const invoicePeriodEnd = dayjs.unix(Number(invoice.period_end)).toDate()

    const invoiceUsageStats = await getBillingPeriodRelays({
      from: invoicePeriodStart,
      to: invoicePeriodEnd,
      accountId,
      portalClient: portal,
    })

    return json<InvoiceLoaderData>({
      invoiceUsageStats,
      charge: (invoice as any).charge
        ? ((invoice as any).charge as Stripe.Charge)
        : undefined,
      invoice,
    })
  } catch (error) {
    throw new Response(getErrorMessage(error), {
      status: 500,
    })
  }
}

export default function Invoice() {
  const { account, blockchains, usageRecords } =
    useOutletContext<AccountBillingOutletContext>()

  const { invoiceUsageStats, charge, invoice } = useLoaderData<InvoiceLoaderData>()

  return (
    <InvoiceView
      account={account}
      blockchains={blockchains}
      charge={charge}
      invoice={invoice}
      invoiceUsageStats={invoiceUsageStats}
      usageRecords={usageRecords}
    />
  )
}
