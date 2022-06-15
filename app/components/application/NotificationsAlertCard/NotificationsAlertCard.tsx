import { Switch } from "@mantine/core"
import type { LinksFunction } from "@remix-run/node"
import React, { useCallback, useState } from "react"
import Card from "~/components/shared/Card"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { AppIdLoaderData } from "~/routes/dashboard/apps/$appId"
import { formatNumberToSICompact } from "~/utils/formattingUtils"
import styles from "./styles.css"

interface NotificationsAlertCardProps {
  level: "quarter" | "half" | "threeQuarters" | "full"
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
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

export default function NotificationsAlertCard({ level }: NotificationsAlertCardProps) {
  const appIdRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  const appIdData = appIdRoute?.data as AppIdLoaderData
  const {
    maxDailyRelays,
    app: { notificationSettings },
  } = appIdData

  const [checked, setChecked] = useState<boolean>(
    Object.keys(notificationSettings).length > 0 && notificationSettings[level]
      ? notificationSettings
      : DEFAULT_ALERT_PERCENTAGES[level],
  )

  const onAlertCheckChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { checked },
    } = event
    setChecked(checked)
  }, [])

  return (
    <div className="pokt-network-notifications-alert">
      <Card>
        <div
          className={`pokt-network-notifications-alert-border pokt-network-notifications-alert-border-${backgroundColor(
            level,
          )}`}
        />
        <div className="pokt-network-notifications-alert-description">
          <p>
            {getUsagePercentage(level)} of {formatNumberToSICompact(maxDailyRelays)}{" "}
            relays per day
          </p>
          <Switch name={level} checked={checked} onChange={onAlertCheckChange} />
        </div>
      </Card>
    </div>
  )
}
