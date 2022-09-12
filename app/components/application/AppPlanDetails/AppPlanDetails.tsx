import { Button, Text, Title } from "@pokt-foundation/pocket-blocks"
import { Link, useFetcher } from "@remix-run/react"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import HelpTooltip from "~/components/shared/HelpTooltip"
import { useTranslate } from "~/context/TranslateContext"
import { PayPlanType } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import { commify } from "~/utils/formattingUtils"
import { getPlanName, isFreePlan } from "~/utils/utils"

/* c8 ignore next */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface AppPlanDetailsProps {
  planType: PayPlanType
  dailyLimit: number
  id: string
  name: string
  subscription: Stripe.Subscription | undefined
}

export default function AppPlanDetails({
  planType,
  dailyLimit,
  id,
  name,
  subscription,
}: AppPlanDetailsProps) {
  const { t } = useTranslate()
  const subscriptionFetcher = useFetcher()
  const stripe = `/api/stripe/checkout-session?app-id=${id}&app-name=${name}`
  return (
    <div className="pokt-app-plan-details">
      <Card>
        <div className="flexRow">
          <Title mb={16} mt={8} order={3}>
            {t.AppPlanDetails.relayLimit}
          </Title>
          <div>
            <Text>{dailyLimit !== 0 ? commify(dailyLimit) : "Unlimited"}</Text>
            <Text className="smallText">{t.AppPlanDetails.relaysPerDay}</Text>
          </div>
        </div>
        <div className="flexRow">
          <Title className="centerGap" mb={16} mt={8} order={3}>
            {t.AppPlanDetails.currentPlan}{" "}
            <HelpTooltip label={t.AppPlanDetails.currentPlanToolTip} />
          </Title>
          <div>
            <Text className="centerGap">{getPlanName(planType)}</Text>
          </div>
        </div>
        {!subscription && isFreePlan(planType) && (
          <Button
            className="upgrade-button pokt-button"
            component={Link}
            to={stripe}
            variant="outline"
          >
            {t.AppPlanDetails.upgrade}
          </Button>
        )}
        {subscription && subscription.cancel_at_period_end && (
          <subscriptionFetcher.Form action="/api/stripe/subscription" method="post">
            <input hidden name="app-id" value={id} />
            <input hidden name="subscription-renew" value="true" />
            <Button
              fullWidth
              className="upgrade-button pokt-button"
              type="submit"
              variant="outline"
            >
              {t.AppPlanDetails.renew}
              {/* {subscriptionFetcher.state === "submitting" && (
                <Loader className="pokt-loader" />
              )} */}
            </Button>
          </subscriptionFetcher.Form>
        )}
      </Card>
    </div>
  )
}
