import { Text, Title } from "@mantine/core"
import { Link } from "@remix-run/react"
import styles from "./styles.css"
import Button from "~/components/shared/Button"
import { Card, links as CardLinks } from "~/components/shared/Card"
import HelpTooltip from "~/components/shared/HelpTooltip"

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
  const stripe = `/api/stripe/checkout-session?app-id=${id}&app-name=${name}`
  return (
    <div className="pokt-app-plan-details">
      <Card>
        <div className="flexRow">
          <Title mb={16} mt={8} order={3}>
            Relays Limit
          </Title>
          <div>
            <Text>{dailyLimit}</Text>
            <Text className="smallText">relays per day</Text>
          </div>
        </div>
        <div className="flexRow">
          <Title className="centerGap" mb={16} mt={8} order={3}>
            Current Plan{" "}
            <HelpTooltip
              label={"This is the current plan for this specific application."}
            />
          </Title>
          <div>
            <Text className="centerGap">
              {planType || "Free"}
              {(planType === "free" || planType === "") && (
                <Button component={Link} to={stripe} variant="outline">
                  Upgrade
                </Button>
              )}
            </Text>
          </div>
        </div>
      </Card>
    </div>
  )
}
