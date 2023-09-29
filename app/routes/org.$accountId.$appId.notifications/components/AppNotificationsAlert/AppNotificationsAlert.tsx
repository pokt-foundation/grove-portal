import { Text, Switch, Group, Stack } from "@pokt-foundation/pocket-blocks"
import { useFetcher } from "@remix-run/react"
import { useCallback } from "react"
import { AppIdOutletContext } from "~/routes/org.$accountId.$appId/route"
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
  app: AppIdOutletContext["app"]
}

export default function AppNotificationsAlert({ app }: NotificationsAlertFormProps) {
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

  return (
    <Stack>
      <Text pb={16} pt={36} px={20}>
        Set up usage alerts to be warned when you are approaching your relay limits. We
        will send an email when your usage crosses the thresholds specified below.
      </Text>
      <Stack my={16} spacing={32}>
        {NOTIFICATIONS_ALERT_LEVELS.map((level) => (
          <Group key={level} position="apart">
            <Text px={20}>
              {getUsagePercentage(level)} of{" "}
              {formatNumberToSICompact(FREE_TIER_MAX_RELAYS)} relays per day
            </Text>
            <Switch
              defaultChecked={getNotificationCheckedState(level)}
              disabled={fetcher.state === "submitting"}
              name={level}
              onChange={(event) => updateNotification(level, event.currentTarget.value)}
            />
          </Group>
        ))}
      </Stack>
    </Stack>
  )
}
