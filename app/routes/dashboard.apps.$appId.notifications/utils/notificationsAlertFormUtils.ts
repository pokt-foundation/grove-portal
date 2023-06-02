import { MantineTheme } from "@mantine/core"
import { FREE_TIER_MAX_RELAYS } from "~/utils/pocketUtils"

export type NotificationLevel = "quarter" | "half" | "threeQuarters" | "full"

export const NOTIFICATIONS_ALERT_LEVELS: NotificationLevel[] = [
  "quarter",
  "half",
  "threeQuarters",
  "full",
]

export const DEFAULT_ALERT_PERCENTAGES = {
  quarter: false,
  half: false,
  threeQuarters: true,
  full: true,
}

export function getUsagePercentage(usageLevel: string): string {
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

export function getBackgroundColor(usageLevel: string, theme: MantineTheme): string {
  if (usageLevel === "quarter") {
    return theme.colors.green[6]
  } else if (usageLevel === "half") {
    return theme.colors.yellow[6]
  } else if (usageLevel === "threeQuarters") {
    return theme.colors.orange[6]
  } else {
    return theme.colors.red[6]
  }
}

export function getRelaysByPercentage(
  level: NotificationLevel,
  relays: number = FREE_TIER_MAX_RELAYS,
) {
  switch (level) {
    case "quarter":
      return relays * 0.25
    case "half":
      return relays * 0.5
    case "threeQuarters":
      return relays * 0.75
    case "full":
      return relays
  }
}


/**
 * 
 * import {
  Button,
  Card,
  Text,
  Switch,
  Box,
  Flex,
  Title,
} from "@pokt-foundation/pocket-blocks"
import { Form, useNavigation } from "@remix-run/react"
import { useState } from "react"
import {
  DEFAULT_ALERT_PERCENTAGES,
  NOTIFICATIONS_ALERT_LEVELS,
  getBackgroundColor,
  getRelaysByPercentage,
  getUsagePercentage,
} from "../../utils/notificationsAlertFormUtils"
import { AppIdOutletContext } from "~/routes/dashboard.apps.$appId/route"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

type NotificationsAlertFormProps = {
  endpoint: AppIdOutletContext["endpoint"]
}

export default function NotificationsAlertForm({
  endpoint,
}: NotificationsAlertFormProps) {
  const navigation = useNavigation()
  const { notificationSettings } = endpoint
  const [changeHappened, setChangeHappened] = useState(false)
  const [resetKey, setResetKey] = useState(135813)

  return (
    <Form key={resetKey} method="put">
      <Box w="100%">
        <Card>
          <Flex justify="space-between" w="100%" wrap="wrap">
            <Title order={4}>Email Notifications</Title>

            {changeHappened && (
              <Flex gap="xs">
                <Button
                  disabled={
                    navigation.state === "loading" || navigation.state === "submitting"
                  }
                  variant="outline"
                  onClick={() => setResetKey(prev => prev + 1)}
                >
                  Reset
                </Button>
                <Button
                  disabled={
                    navigation.state === "loading" || navigation.state === "submitting"
                  }
                  type="submit"
                  onClick={() => {
                    trackEvent(AmplitudeEvents.NotificationSettingsChange)
                  }}
                >
                  {navigation.state === "loading" || navigation.state === "submitting"
                    ? navigation.state
                    : "Save Changes"}
                </Button>
              </Flex>
            )}
          </Flex>
          <Text>
            Receive alerts and email notifications when you're nearing or exceeding your
            usage limits.
          </Text>
          <Flex direction="column">
            {NOTIFICATIONS_ALERT_LEVELS.map((level) => (
              <Flex key={level} align="center" gap="xs">
                <Box
                  sx={(theme) => ({
                    width: "8px",
                    height: "8px",
                    borderRadius: "8px",
                    backgroundColor: getBackgroundColor(level, theme),
                  })}
                />
                <Flex align="center" gap="xs" justify="space-between" w="100%">
                  <Text>
                    Notify me at {getUsagePercentage(level)} of (
                    {getRelaysByPercentage(level).toLocaleString()} Relays)
                  </Text>
                  <Switch
                    defaultChecked={
                      Object.keys(notificationSettings).length > 0
                        ? (notificationSettings[level] as boolean)
                        : DEFAULT_ALERT_PERCENTAGES[level]
                    }
                    name={level}
                    onChange={() => setChangeHappened(true)}
                  />
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Text mt={16} size="xs">
            To ensure uninterrupted relay service, any surplus relays are automatically
            redirected to our backup infrastructure. Stay within your limit or reach out
            to our team to increase your stake for full relay capacity.
          </Text>
        </Card>
      </Box>
    </Form>
  )
}

 * 
 */