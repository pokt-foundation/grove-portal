import { Button, Text, Title } from "@pokt-foundation/pocket-blocks"
import { Link, useFetcher } from "@remix-run/react"
import clsx from "clsx"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import CardList, { links as CardListLinks } from "~/components/shared/CardList"
import HelpTooltip from "~/components/shared/HelpTooltip"
import { useFeatureFlags } from "~/context/FeatureFlagContext"
import { useTranslate } from "~/context/TranslateContext"
import { PayPlanType } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import { commify } from "~/utils/formattingUtils"
import { getPlanName, isFreePlan, isLegacyPlan } from "~/utils/utils"

/* c8 ignore next */
export const links = () => {
  return [...CardLinks(), ...CardListLinks(), { rel: "stylesheet", href: styles }]
}

interface AppPlanDetailsProps {
  planType: PayPlanType
  dailyLimit: number
  id: string
  name: string
  subscription: Stripe.Subscription | undefined
  isMember: boolean
}

export default function AppPlanDetails({
  planType,
  dailyLimit,
  id,
  name,
  subscription,
  isMember,
}: AppPlanDetailsProps) {
  const { flags } = useFeatureFlags()
  const { t } = useTranslate()
  const subscriptionFetcher = useFetcher()
  const stripe = `/api/stripe/checkout-session?app-id=${id}&app-name=${name}`

  return (
    <div className="pokt-app-plan-details">
      <Card>
        <div className="pokt-card-header">
          <h3>Plan</h3>
          {subscription && subscription.cancel_at_period_end && (
            <subscriptionFetcher.Form action="/api/stripe/subscription" method="post">
              <input hidden name="app-id" value={id} />
              <input hidden name="subscription-renew" value="true" />
              <Button
                disabled={flags.STRIPE_PAYMENT === "false"}
                size="xs"
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
        </div>
        <CardList
          items={[
            {
              label: t.AppPlanDetails.relayLimit,
              value: dailyLimit !== 0 ? commify(dailyLimit) : "Unlimited",
            },
            {
              label: t.AppPlanDetails.currentPlan,
              value: getPlanName(planType),
              help: t.AppPlanDetails.currentPlanToolTip,
            },
          ]}
        />
        {!subscription && (isFreePlan(planType) || isLegacyPlan(planType)) && (
          <Button
            fullWidth
            className={clsx("pokt-button", {
              disabled: flags.STRIPE_PAYMENT === "false",
            })}
            component={Link}
            disabled={flags.STRIPE_PAYMENT === "false"}
            mt={16}
            size="xs"
            to={stripe}
            variant="outline"
          >
            {t.AppPlanDetails.upgrade}
          </Button>
        )}
      </Card>
    </div>
  )
}
