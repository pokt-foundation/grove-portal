import {
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
  ALERT_USAGE_PERCENTAGES,
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
  const [isFormdirty, setIsFormDirty] = useState(false)
  const [resetKey, setResetKey] = useState(Math.random())

  return (
    <Form key={resetKey} method="put">
      <Box w="100%">
        <Card>
          <Flex justify="space-between" w="100%" wrap="wrap">
            <Title order={4}>Email Notifications</Title>

            {isFormdirty && (
              <Flex gap="xs">
                <Button
                  disabled={
                    navigation.state === "loading" || navigation.state === "submitting"
                  }
                  variant="outline"
                  onClick={() => setResetKey((prev) => prev + 1)}
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
                    Notify me at {ALERT_USAGE_PERCENTAGES[level]} of (
                    {getRelaysByPercentage(level).toLocaleString()} Relays)
                  </Text>
                  <Switch
                    defaultChecked={
                      Object.keys(notificationSettings).length > 0
                        ? (notificationSettings[level] as boolean)
                        : DEFAULT_ALERT_PERCENTAGES[level]
                    }
                    name={level}
                    onChange={() => setIsFormDirty(true)}
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
