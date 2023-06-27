import { Button, Group, CardProps } from "@pokt-foundation/pocket-blocks"
import { Card, links as CardLinks } from "~/components/Card"
import CardList, { CardListItem, links as CardListLinks } from "~/components/CardList"
import { useTranslate } from "~/context/TranslateContext"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { Stripe } from "~/models/stripe/stripe.server"
import { dayjs } from "~/utils/dayjs"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), ...CardListLinks()]
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
      label: t.AppPlanLatestInvoiceCard.relaysUsed,
      value: relaysLatestInvoice.Count.Total,
    },
    {
      label: "USD",
      value: `$${usageRecords.data[0].total_usage}`,
    },
    {
      label: t.AppPlanLatestInvoiceCard.dateStart,
      value: dayjs
        .unix(Number(invoice.lines.data[0].period.start))
        .toDate()
        .toLocaleDateString(),
    },
    {
      label: t.AppPlanLatestInvoiceCard.dateEnd,
      value: dayjs
        .unix(Number(invoice.lines.data[0].period.end))
        .toDate()
        .toLocaleDateString("en-US"),
    },
  ]

  return (
    <Card {...CardProps}>
      <h3>{t.AppPlanLatestInvoiceCard.title}</h3>
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
  )
}
