import { Text } from "@mantine/core"
import { LinksFunction } from "@remix-run/node"
import { Form, useTransition } from "@remix-run/react"
import styles from "./styles.css"
import Button from "~/components/shared/Button"
import Card from "~/components/shared/Card"
import Switch, { links as SwitchLinks } from "~/components/shared/Switch"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { AppIdLoaderData } from "~/routes/dashboard/apps/$appId"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { formatNumberToSICompact } from "~/utils/formattingUtils"

export const links: LinksFunction = () => [
  ...SwitchLinks(),
  {
    rel: "stylesheet",
    href: styles,
  },
]

type NotificationLevel = "quarter" | "half" | "threeQuarters" | "full"

const NOTIFICATIONS_ALERT_LEVELS: NotificationLevel[] = [
  "quarter",
  "half",
  "threeQuarters",
  "full",
]

const DEFAULT_ALERT_PERCENTAGES = {
  quarter: false,
  half: false,
  threeQuarters: true,
  full: true,
}

function getUsagePercentage(usageLevel: string): string {
  if (usageLevel === "quarter") {
    return "25%"
  } else if (usageLevel === "half") {
    return "50%"
  } else if (usageLevel === "threeQuarters") {
    return "75%"
  } else {
    return "100%"
  }
}

function backgroundColor(usageLevel: string): string {
  if (usageLevel === "quarter") {
    return "positive"
  } else if (usageLevel === "half") {
    return "yellow"
  } else if (usageLevel === "threeQuarters") {
    return "warning"
  } else {
    return "negative"
  }
}

export default function NotificationsAlertForm() {
  const { state } = useTransition()
  const appIdRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  const appIdData = appIdRoute?.data as AppIdLoaderData
  const {
    maxDailyRelays,
    app: { notificationSettings },
  } = appIdData

  return (
    <Form method="put">
      <section className="pokt-network-notifications-activate-alerts">
        <Card>
          <div className="pokt-card-header">
            <h3>Activate Alerts</h3>
          </div>
          <p>
            Set up usage alerts to be warned when you are approaching your relay limits.
            We will send an email when your usage crosses the thresholds specified below.
          </p>
          <div className="pokt-network-notifications-alerts">
            {NOTIFICATIONS_ALERT_LEVELS.map((level) => (
              <div key={level} className="pokt-network-notifications-alert">
                <div
                  className={`pokt-network-notifications-alert-border pokt-network-notifications-alert-border-${backgroundColor(
                    level,
                  )}`}
                />
                <div className="pokt-network-notifications-alert-description">
                  <p>
                    {getUsagePercentage(level)} of{" "}
                    {formatNumberToSICompact(maxDailyRelays)} relays per day
                  </p>
                  <Switch
                    defaultChecked={
                      Object.keys(notificationSettings).length > 0 &&
                      notificationSettings[level]
                        ? notificationSettings
                        : DEFAULT_ALERT_PERCENTAGES[level]
                    }
                    name={level}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pokt-network-notifications-alert-btn-container">
            <Button
              className="pokt-network-notifications-submit-btn"
              disabled={state === "loading" || state === "submitting"}
              type="submit"
              variant="filled"
              onClick={() => {
                trackEvent(AmplitudeEvents.NotificationSettingsChange)
              }}
            >
              {state === "loading" || state === "submitting" ? state : "Save Changes"}
            </Button>
          </div>
          <Text mt={16} size="xs">
            The Portal automatically redirects all surplus relays to our backup
            infrastructure. If you want all relays to be unstoppable, stay under your
            limit or contact the team to up your stake.
          </Text>
        </Card>
      </section>
    </Form>
  )
}
