import {
  Button,
  CardProps,
  Group,
  IconArrowUpRight,
} from "@pokt-foundation/pocket-blocks"
import { Form, useLocation } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import { Card, links as CardLinks } from "~/components/Card"
import CardList, { CardListItem, links as CardListLinks } from "~/components/CardList"
import { useTranslate } from "~/context/TranslateContext"
import { EndpointQuery, PayPlanType } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import { dayjs } from "~/utils/dayjs"
import { getPlanName } from "~/utils/utils"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), ...CardListLinks()]
}
/* c8 ignore stop */

interface AppPlanOverviewCardProps {
  subscription: Stripe.Subscription
  CardProps?: Partial<CardProps>
  endpoint: EndpointQuery["endpoint"]
  user: Auth0Profile
  planType: PayPlanType
}

export default function AppPlanOverviewCard({
  subscription,
  CardProps,
  endpoint,
  user,
  planType,
}: AppPlanOverviewCardProps) {
  const { t } = useTranslate()
  const location = useLocation()
  const role = endpoint?.users.find((u) => u.email === user._json?.email)?.roleName

  const listItems: CardListItem[] = [
    {
      label: t.AppPlanOverviewCard.currentPlan,
      value: getPlanName(planType),
    },
    {
      label: t.AppPlanOverviewCard.status,
      value: subscription.status,
    },
    {
      label: t.AppPlanOverviewCard.role,
      value: `${role}`,
    },
    {
      label: t.AppPlanOverviewCard.date,
      value: dayjs.unix(Number(subscription.start_date)).toString(),
    },
  ]

  return (
    <Card {...CardProps}>
      <div className="pokt-card-header">
        <h3>{t.AppPlanOverviewCard.title}</h3>
      </div>
      <div>
        <CardList items={listItems} />
        <Group mt="xl" position="center">
          <Form
            action="/api/stripe/portal-session"
            method="post"
            style={{
              width: "100%",
            }}
          >
            <input hidden defaultValue={location.pathname} name="return-path" />
            <Button
              fullWidth
              rightIcon={<IconArrowUpRight height={18} width={18} />}
              type="submit"
            >
              {t.AppPlanOverviewCard.managePlan}
            </Button>
          </Form>
        </Group>
      </div>
    </Card>
  )
}
