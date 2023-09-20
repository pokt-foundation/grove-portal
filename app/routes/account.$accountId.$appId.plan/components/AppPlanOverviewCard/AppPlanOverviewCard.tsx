import { Divider } from "@mantine/core"
import { Button, Group, Text, Stack, Box } from "@pokt-foundation/pocket-blocks"
import { Form, useLocation } from "@remix-run/react"
import React from "react"
import { LuArrowUpRight, LuStopCircle } from "react-icons/lu"
import { TitledCard } from "~/components/TitledCard"
import { PortalApp } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import useSubscriptionModals from "~/routes/account.$accountId.$appId/hooks/useSubscriptionModals"
import useCommonStyles from "~/styles/commonStyles"
import { dayjs } from "~/utils/dayjs"

interface AppPlanOverviewCardProps {
  app: PortalApp
  subscription: Stripe.Subscription
  usageRecords: Stripe.ApiList<Stripe.UsageRecordSummary>
}

export default function AppPlanOverviewCard({
  app,
  subscription,
  usageRecords,
}: AppPlanOverviewCardProps) {
  const location = useLocation()
  const { classes: commonClasses } = useCommonStyles()

  const { openStopSubscriptionModal } = useSubscriptionModals()

  const cardItems = [
    {
      label: "Subscription",
      value: subscription.id,
    },
    {
      label: "Status",
      value: subscription.status.replace(/^\w/, (char) => char.toUpperCase()),
    },
    {
      label: "Total Relays on this Billing Period",
      value: usageRecords.data[0].total_usage,
    },
    {
      label: "Start date",
      value: dayjs.unix(Number(subscription.start_date)).format("DD MMMM YYYY"),
    },
  ]

  return (
    <TitledCard header={() => <Text weight={600}>Current plan</Text>}>
      <Stack h="calc(100% - 25px)" px={20} py={10}>
        {cardItems.map(({ label, value }, index) => (
          <>
            <Group key={`${label}-${index}`} p={12} position="apart">
              <Text>{label}</Text> <Text>{value}</Text>
            </Group>
            <Divider />
          </>
        ))}
        <Box mt="auto">
          <Form action="/api/stripe/portal-session" method="post">
            <input hidden defaultValue={location.pathname} name="return-path" />
            <Group grow spacing="md">
              <Button
                className={commonClasses.grayOutlinedButton}
                color="gray"
                rightIcon={<LuStopCircle size={18} />}
                type="button"
                variant="outline"
                onClick={() => openStopSubscriptionModal(app)}
              >
                Stop subscription
              </Button>
              <Button
                color="green"
                rightIcon={<LuArrowUpRight size={18} />}
                type="submit"
              >
                Manage in Stripe
              </Button>
            </Group>
          </Form>
        </Box>
      </Stack>
    </TitledCard>
  )
}
