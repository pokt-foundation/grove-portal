import styles from "./styles.css"
import Button from "~/components/shared/Button"
import { Card, links as CardLinks } from "~/components/shared/Card"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"
import Group from "~/components/shared/Group"
import { useTranslate } from "~/context/TranslateContext"
import { RelayMetric } from "~/models/relaymeter.server"
import { Stripe } from "~/models/stripe.server"
import { dayjs } from "~/utils/dayjs"

/* c8 ignore next */
export const links = () => {
  return [...CardLinks(), ...CardListLinks(), { rel: "stylesheet", href: styles }]
}

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
  const { t } = useTranslate()

  const listItems: CardListItem[] = [
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
      label: "Period Start",
      value: dayjs.unix(Number(invoice.period_start)).toString(),
    },
    {
      label: "Period End",
      value: dayjs.unix(Number(invoice.period_end)).toString(),
    },
  ]

  return (
    <div className="pokt-app-plan-latest-invoice">
      <Card>
        <div className="pokt-card-header">
          <h3>Latest Invoice</h3>
        </div>
        <CardList items={listItems} />
        <Group mt="xl" position="right">
          <Button
            component="a"
            href={invoice.hosted_invoice_url ?? ""}
            rel="noreferrer"
            target="_blank"
          >
            View in Stripe
          </Button>
          <Button
            component="a"
            href={invoice.invoice_pdf ?? ""}
            rel="noreferrer"
            target="_blank"
          >
            Download
          </Button>
        </Group>
      </Card>
    </div>
  )
}
