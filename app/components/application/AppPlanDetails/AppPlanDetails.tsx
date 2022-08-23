import { Text, Title } from "@mantine/core"
import { Link } from "@remix-run/react"
import styles from "./styles.css"
import Button from "~/components/shared/Button"
import { Card, links as CardLinks } from "~/components/shared/Card"
import HelpTooltip from "~/components/shared/HelpTooltip"
import { useTranslate } from "~/context/TranslateContext"
import { isFreePlan } from "~/utils/utils"

/* c8 ignore next */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface AppPlanDetailsProps {
  planType: string
  dailyLimit: number
  id: string
  name: string
}

export default function AppPlanDetails({
  planType,
  dailyLimit,
  id,
  name,
}: AppPlanDetailsProps) {
  const { t } = useTranslate()
  const stripe = `/api/stripe/checkout-session?app-id=${id}&app-name=${name}`
  return (
    <div className="pokt-app-plan-details">
      <Card>
        <div className="flexRow">
          <Title mb={16} mt={8} order={3}>
            {t.AppPlanDetails.relayLimit}
          </Title>
          <div>
            <Text>{dailyLimit !== 0 ? dailyLimit : "Unlimited"}</Text>
            <Text className="smallText">{t.AppPlanDetails.relaysPerDay}</Text>
          </div>
        </div>
        <div className="flexRow">
          <Title className="centerGap" mb={16} mt={8} order={3}>
            {t.AppPlanDetails.currentPlan}{" "}
            <HelpTooltip label={t.AppPlanDetails.currentPlanToolTip} />
          </Title>
          <div>
            <Text className="centerGap">{planType || "Free"}</Text>
          </div>
        </div>
        {isFreePlan(planType) && (
          <Button
            className="upgrade-button pokt-button"
            component={Link}
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
