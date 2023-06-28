import {
  Flex,
  IconArrowUpRight,
  Anchor,
  IconDownload,
  Badge,
} from "@pokt-foundation/pocket-blocks"
import Table from "~/components/Table"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { Stripe } from "~/models/stripe/stripe.server"

interface InvoicesTableProps {
  invoices: Stripe.Invoice[]
  usageRecords: Stripe.ApiList<Stripe.UsageRecordSummary>[]
  relaysInvoices: RelayMetric[]
  emptyComponent?: JSX.Element
}

const CENTS = 100
const MS = 1000

export function InvoicesTable({
  invoices,
  usageRecords,
  relaysInvoices,
  emptyComponent,
}: InvoicesTableProps) {
  return (
    <Table
      paginate
      columns={[
        "No",
        "Period",
        "Relays Used",
        "Relays Billed",
        "Billed",
        "Payment Status",
        "Download/View in Stripe",
      ]}
      data={invoices?.map(({ lines, status, invoice_pdf, hosted_invoice_url }, idx) => ({
        no: idx + 1,
        period: `${new Date(lines.data[0].period.start * MS).toDateString()} - ${new Date(
          lines.data[0].period.end * MS,
        ).toDateString()}`,
        relaysUsed: relaysInvoices[idx].Count.Total,
        relaysBilled: usageRecords[idx].data[0].total_usage,
        billed: `US$${lines.data[0].amount / CENTS}`,
        paymentStatus: {
          element: <Badge>{status}</Badge>,
        },
        download: {
          element: (
            <Flex gap={12}>
              {invoice_pdf && (
                <Anchor
                  href={invoice_pdf}
                  sx={(theme) => ({
                    color: theme.colors.gray[5],
                  })}
                  onClick={(e) => {
                    e.preventDefault()
                    const link = document.createElement("a")
                    link.href = invoice_pdf ?? ""
                    link.download = "Pocket Invoice"
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                >
                  <IconDownload width={18} />
                </Anchor>
              )}
              {hosted_invoice_url && (
                <Anchor
                  href={hosted_invoice_url}
                  rel="noopener noreferrer"
                  sx={(theme) => ({
                    color: theme.colors.gray[5],
                  })}
                  target="_blank"
                >
                  <IconArrowUpRight width={18} />
                </Anchor>
              )}
            </Flex>
          ),
        },
      }))}
      emptyComponent={emptyComponent}
      label="Invoice History"
    />
  )
}

export default InvoicesTable
