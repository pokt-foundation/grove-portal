import { Button, Group, CardProps } from "@pokt-foundation/pocket-blocks"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/Card"
import CardList, { CardListItem, links as CardListLinks } from "~/components/CardList"
import { useTranslate } from "~/context/TranslateContext"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { Stripe } from "~/models/stripe/stripe.server"
import { dayjs } from "~/utils/dayjs"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), ...CardListLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface PlanLatestInvoiceCardProps {
  invoice: Stripe.Invoice
  usageRecords: Stripe.ApiList<Stripe.UsageRecordSummary>
  relaysLatestInvoice: RelayMetric
  CardProps?: Partial<CardProps>
}

export default function AppPlanLatestInvoiceCard({
  invoice,
  usageRecords,
  relaysLatestInvoice,
  CardProps,
}: PlanLatestInvoiceCardProps) {
  const { t } = useTranslate()

  const listItems: CardListItem[] = [
    {
      label: t.AppPlanLatestInvoiceCard.invoice,
      value: invoice.id,
    },
    {
      label: t.AppPlanLatestInvoiceCard.status,
      value: invoice.paid ? "Paid" : "Open",
    },
    {
      label: t.AppPlanLatestInvoiceCard.relaysBilled,
      value: usageRecords.data[0].total_usage,
    },
    {
      label: t.AppPlanLatestInvoiceCard.relaysUsed,
      value: relaysLatestInvoice.Count.Total,
    },
    {
      label: t.AppPlanLatestInvoiceCard.dateStart,
      value: dayjs.unix(Number(invoice.lines.data[0].period.start)).toString(),
    },
    {
      label: t.AppPlanLatestInvoiceCard.dateEnd,
      value: dayjs.unix(Number(invoice.lines.data[0].period.end)).toString(),
    },
  ]

  return (
    <div className="pokt-app-plan-latest-invoice">
      <Card {...CardProps}>
        <div className="pokt-card-header">
          <h3>{t.AppPlanLatestInvoiceCard.title}</h3>
        </div>
        <CardList items={listItems} />
        <Group mt="xl" position="right">
          <Button
            component="a"
            href={invoice.hosted_invoice_url ?? ""}
            rel="noreferrer"
            target="_blank"
          >
            {t.AppPlanLatestInvoiceCard.view}
          </Button>
          <Button
            component="a"
            href={invoice.invoice_pdf ?? ""}
            rel="noreferrer"
            target="_blank"
          >
            {t.AppPlanLatestInvoiceCard.download}
          </Button>
        </Group>
      </Card>
    </div>
  )
}
