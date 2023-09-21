import { Divider } from "@mantine/core"
import { Button, Group, Text, Stack, Box } from "@pokt-foundation/pocket-blocks"
import { Form, useLocation } from "@remix-run/react"
import React from "react"
import { LuArrowUpRight, LuRepeat, LuStopCircle } from "react-icons/lu"
import { TitledCard } from "~/components/TitledCard"
import { PortalApp, RoleNameV2 } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import useSubscriptionModals from "~/routes/account.$accountId.$appId/hooks/useSubscriptionModals"
import useCommonStyles from "~/styles/commonStyles"
import { dayjs } from "~/utils/dayjs"
import { getPlanName } from "~/utils/utils"

interface AppPlanOverviewCardProps {
  app: PortalApp
  userRole: RoleNameV2
  subscription: Stripe.Subscription
  usageRecords: Stripe.ApiList<Stripe.UsageRecordSummary>
}

export default function AppPlanOverviewCard({
  app,
  userRole,
  subscription,
  usageRecords,
}: AppPlanOverviewCardProps) {
  const location = useLocation()
  const { classes: commonClasses } = useCommonStyles()

  const { openStopSubscriptionModal, openRenewSubscriptionModal } =
    useSubscriptionModals()

  const appPlanType = app.legacyFields.planType

  const cardItems = [
    {
      label: "Subscription",
      value: subscription.id,
    },
    {
      label: "Current Plan",
      value: getPlanName(appPlanType),
    },
    {
      label: "Status",
      value: subscription.status.replace(/^\w/, (char) => char.toUpperCase()),
    },
    {
      label: "Your Role",
      value: userRole.toLowerCase().replace(/^\w/, (char) => char.toUpperCase()),
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
              {appPlanType === "PAY_AS_YOU_GO_V0" ? (
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
              ) : (
                <Button
                  rightIcon={<LuRepeat size={18} />}
                  type="button"
                  variant="outline"
                  onClick={() => openRenewSubscriptionModal(app)}
                >
                  Renew subscription
                </Button>
              )}

              <Button rightIcon={<LuArrowUpRight size={18} />} type="submit">
                Manage in Stripe
              </Button>
            </Group>
          </Form>
        </Box>
      </Stack>
    </TitledCard>
  )
}
