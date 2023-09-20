import { Divider } from "@mantine/core"
import { Button, Group, Text, Stack } from "@pokt-foundation/pocket-blocks"
import React from "react"
import { LuArrowUpRight, LuDownload } from "react-icons/lu"
import { TitledCard } from "~/components/TitledCard"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { Stripe } from "~/models/stripe/stripe.server"
import { dayjs } from "~/utils/dayjs"

interface PlanLatestInvoiceCardProps {
  invoice: Stripe.Invoice
  usageRecords: Stripe.ApiList<Stripe.UsageRecordSummary>
  relaysLatestInvoice: RelayMetric
}

export default function AppPlanLatestInvoiceCard({
  invoice,
  usageRecords,
  relaysLatestInvoice,
}: PlanLatestInvoiceCardProps) {
  const cardItems = [
    {
      label: "Invoice",
      value: invoice.id,
    },
    {
      label: "Status",
      value: invoice.paid ? "Paid" : "Open",
    },
    {
      label: "Relays Billed",
      value: usageRecords.data[0].total_usage,
    },
    {
      label: "Relays Used",
      value: relaysLatestInvoice.Count.Total,
    },
    {
      label: "Start period",
      value: dayjs.unix(Number(invoice.period_start)).format("DD MMMM YYYY"),
    },
    {
      label: "End Period",
      value: dayjs.unix(Number(invoice.period_end)).format("DD MMMM YYYY"),
    },
  ]

  return (
    <TitledCard header={() => <Text weight={600}>Latest Invoice</Text>}>
      <Stack px={20} py={10}>
        {cardItems.map(({ label, value }, index) => (
          <>
            <Group key={`${label}-${index}`} p={12} position="apart">
              <Text>{label}</Text> <Text>{value}</Text>
            </Group>
            <Divider />
          </>
        ))}
        <Group grow spacing="md">
          <Button
            component="a"
            href={invoice.invoice_pdf ?? ""}
            rightIcon={<LuDownload size={18} />}
          >
            Download
          </Button>
          <Button
            component="a"
            href={invoice.hosted_invoice_url ?? ""}
            rel="noreferrer"
            rightIcon={<LuArrowUpRight size={18} />}
            target="_blank"
          >
            View in Stripe
          </Button>
        </Group>
      </Stack>
    </TitledCard>
  )
}
