import { Form, useLocation } from "@remix-run/react"
import styles from "./styles.css"
import Button from "~/components/shared/Button"
import { Card, links as CardLinks } from "~/components/shared/Card"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"
import Group from "~/components/shared/Group"
import { useTranslate } from "~/context/TranslateContext"
import { Stripe } from "~/models/stripe/stripe.server"
import { dayjs } from "~/utils/dayjs"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), ...CardListLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface PlanLatestInvoiceCardProps {
  subscription: Stripe.Subscription
  usageRecords: Stripe.ApiList<Stripe.UsageRecordSummary>
}

export default function AppPlanLatestInvoiceCard({
  subscription,
  usageRecords,
}: PlanLatestInvoiceCardProps) {
  const { t } = useTranslate()
  const location = useLocation()

  const listItems: CardListItem[] = [
    {
      label: t.AppPlanOverviewCard.subscription,
      value: subscription.id,
    },
    {
      label: t.AppPlanOverviewCard.status,
      value: subscription.status,
    },
    {
      label: t.AppPlanOverviewCard.relays,
      value: usageRecords.data[0].total_usage,
    },
    {
      label: t.AppPlanOverviewCard.date,
      value: dayjs.unix(Number(subscription.start_date)).toString(),
    },
  ]

  return (
    <div className="pokt-app-plan-overview">
      <Card>
        <div className="pokt-card-header">
          <h3>{t.AppPlanOverviewCard.title}</h3>
        </div>
        <div>
          <CardList items={listItems} />
          <Group mt="xl" position="right">
            <Form action="/api/stripe/portal-session" method="post">
              <input hidden name="return-path" value={location.pathname} />
              <Button type="submit" variant="outline">
                {t.AppPlanOverviewCard.managePlan}
              </Button>
            </Form>
          </Group>
        </div>
      </Card>
    </div>
  )
}
