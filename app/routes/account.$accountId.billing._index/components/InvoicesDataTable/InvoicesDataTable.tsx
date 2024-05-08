import { Button, Menu, NumberFormatter, Text } from "@mantine/core"
import { useNavigate } from "@remix-run/react"
import { DataTable } from "mantine-datatable"
import React from "react"
import ContextMenuTarget from "~/components/ContextMenuTarget"
import { Stripe } from "~/models/stripe/stripe.server"
import { KeyValuePair } from "~/types/global"
import { formatStripeDate, getStripeAmount } from "~/utils/billingUtils"

export const INVOICE_STATUS_COLOR: KeyValuePair<"green" | "red" | "orange"> = {
  deleted: "red",
  uncollectible: "red",
  void: "red",
  pending: "orange",
  paid: "green",
}

type InvoicesDataTableProps = {
  invoices: Stripe.Invoice[]
  usageRecords?: Stripe.UsageRecordSummary[]
}
const InvoicesDataTable = ({ invoices, usageRecords }: InvoicesDataTableProps) => {
  const navigate = useNavigate()

  const invoicesWithUSage = invoices.map((invoice) => {
    const invoiceUsageRecord = usageRecords?.find(
      (usageRecord) => usageRecord.invoice === invoice.id,
    )

    return {
      id: invoice.id,
      number: invoice.number,
      status: invoice.status,
      amount_due: invoice.amount_due,
      period_start: invoice.period_start,
      period_end: invoice.period_end,
      total_usage: invoiceUsageRecord?.total_usage,
      charge: invoice.charge,
      invoice_pdf: invoice.invoice_pdf,
    }
  })

  return (
    <DataTable
      highlightOnHover
      className="clickable-table"
      columns={[
        {
          accessor: "number",
          title: "Invoice ID",
        },
        {
          accessor: "status",
          render: ({ status }) => (
            <Text c={status ? INVOICE_STATUS_COLOR[status] : ""} tt="capitalize">
              {status}
            </Text>
          ),
          title: "Status",
        },
        {
          accessor: "total_usage",
          title: "Total Relays Billed",
          noWrap: true,
          render: ({ total_usage }) =>
            total_usage ? <NumberFormatter thousandSeparator value={total_usage} /> : "—",
        },
        {
          accessor: "amount_due",
          title: "Amount in USD",
          noWrap: true,
          render: ({ amount_due }) => (
            <NumberFormatter
              thousandSeparator
              prefix="USD $"
              value={getStripeAmount(amount_due)}
            />
          ),
        },
        {
          accessor: "period_start",
          title: "Start Date",
          render: ({ period_start }) =>
            formatStripeDate(period_start, "Do MMM YYYY, HH:mm"),
        },
        {
          accessor: "period_end",
          title: "End Date",
          render: ({ period_end }) => formatStripeDate(period_end, "Do MMM YYYY, HH:mm"),
        },
        {
          accessor: "action",
          title: "",
          render: ({ invoice_pdf }) => (
            <Menu>
              <ContextMenuTarget />
              <Menu.Dropdown>
                <Menu.Item>
                  <Button
                    color="gray"
                    component="a"
                    href={invoice_pdf ?? ""}
                    rel="noreferrer"
                    size="compact-sm"
                    target="_blank"
                    variant="subtle"
                  >
                    Download Invoice PDF
                  </Button>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ),
        },
      ]}
      records={invoicesWithUSage}
      verticalSpacing={5}
      onRowClick={({ record }) => navigate(`${record.id}`)}
    />
  )
}

export default InvoicesDataTable
