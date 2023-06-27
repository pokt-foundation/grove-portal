import { CardProps, Anchor } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
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
      <Anchor
        component={Link}
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: `1px solid ${theme.colors.blue[5]}`,
          color: theme.colors.blue[5],
          borderRadius: "0.5rem",
          width: "100%",
          padding: "0 1.375rem",
          height: "2.625rem",
          marginTop: "1.5rem",
          textAlign: "center",
        })}
        to="/empty-route-for-now"
        variant="text"
      >
        {t.AppPlanLatestInvoiceCard.viewRelayData}
      </Anchor>
    </Card>
  )
}
