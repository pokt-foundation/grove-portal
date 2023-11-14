import { Divider } from "@mantine/core"
import { Text, Switch, Group, Stack } from "@pokt-foundation/pocket-blocks"
import { useFetcher } from "@remix-run/react"
import React from "react"
import { useCallback } from "react"
import useActionNotification from "~/hooks/useActionNotification"
import { Account, RoleName } from "~/models/portal/sdk"
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
  account: Account
  userRole: RoleName
}

export default function AccountNotificationsView({
  account,
  userRole,
}: NotificationsAlertFormProps) {
  const { notifications } = account
  const fetcher = useFetcher()
  useActionNotification(fetcher.data)

  const notificationEvents = notifications[0]?.notificationSettings?.events

  const getNotificationCheckedState = useCallback(
    (level: NotificationLevel) =>
      Object.keys(notificationEvents).length > 0 &&
      notificationEvents.hasOwnProperty(level)
        ? (notificationEvents[level] as boolean)
        : DEFAULT_ALERT_PERCENTAGES[level],
    [notificationEvents],
  )

  const updateNotification = (level: string, value: string) => {
    const otherNotificationEventsValues = NOTIFICATIONS_ALERT_LEVELS.filter(
      (notificationLevel) => notificationLevel !== level,
    ).reduce(
      (result, notificationLevel) => ({
        ...result,
        [notificationLevel]: getNotificationCheckedState(notificationLevel)
          ? "on"
          : "off",
      }),
      {},
    )

    fetcher.submit(
      {
        [level]: value,
        ...otherNotificationEventsValues,
      },
      {
        method: "POST",
      },
    )
  }

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
                disabled={userRole === "MEMBER" || fetcher.state !== "idle"}
                name={level}
                onChange={(event) => {
                  updateNotification(level, event.currentTarget.checked ? "on" : "off")
                  trackEvent({
                    category: AnalyticCategories.account,
                    action: AnalyticActions.account_notifications,
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
