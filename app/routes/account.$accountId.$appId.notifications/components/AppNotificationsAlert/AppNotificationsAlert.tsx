import { Divider } from "@mantine/core"
import { Text, Switch, Group, Stack } from "@pokt-foundation/pocket-blocks"
import { useFetcher } from "@remix-run/react"
import React from "react"
import { useCallback } from "react"
import useActionNotification from "~/hooks/useActionNotification"
import { PortalApp, RoleNameV2 } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { formatNumberToSICompact } from "~/utils/formattingUtils"
import { FREE_TIER_MAX_RELAYS } from "~/utils/planUtils"

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

type NotificationsAlertFormProps = {
  app: PortalApp
  userRole: RoleNameV2
}

export default function AppNotificationsAlert({
  app,
  userRole,
}: NotificationsAlertFormProps) {
  const { notifications } = app
  const fetcher = useFetcher()

  const getNotificationCheckedState = useCallback(
    (level: NotificationLevel) => {
      // @ts-ignore
      return Object.keys(notifications).length > 0 && notifications[level]
        ? // @ts-ignore
          (notifications[level] as boolean)
        : DEFAULT_ALERT_PERCENTAGES[level]
    },
    [notifications],
  )

  const updateNotification = (level: string, value: string) => {
    fetcher.submit(
      {
        [level]: value,
      },
      {
        method: "PUT",
      },
    )
  }

  useActionNotification(fetcher.data)

  return (
    <Stack pt={36}>
      <Text pb={16}>
        Set up usage alerts to be warned when you are approaching your relay limits. We
        will send an email when your usage crosses the thresholds specified below.
      </Text>
      <Stack my={16} spacing={32}>
        {NOTIFICATIONS_ALERT_LEVELS.map((level, index) => (
          <React.Fragment key={level}>
            <Group position="apart" px={20}>
              <Text>
                {getUsagePercentage(level)} of{" "}
                {formatNumberToSICompact(FREE_TIER_MAX_RELAYS)} relays per day
              </Text>
              <Switch
                defaultChecked={getNotificationCheckedState(level)}
                disabled={userRole === "MEMBER"}
                name={level}
                onChange={(event) => {
                  updateNotification(level, event.currentTarget.value)
                  trackEvent({
                    category: AnalyticCategories.app,
                    action: AnalyticActions.app_notifications,
                    label: level,
                  })
                }}
              />
            </Group>
            {index !== NOTIFICATIONS_ALERT_LEVELS.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  )
}
