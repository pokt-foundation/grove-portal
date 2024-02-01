import { Divider, Button, Group, Text, Stack, Box, Grid, SimpleGrid } from "@mantine/core"
import { Form, useLocation } from "@remix-run/react"
import React from "react"
import { LuArrowUpRight, LuStopCircle } from "react-icons/lu"
import { TitledCard } from "~/components/TitledCard"
import { Account, RoleName } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import useSubscriptionModals from "~/routes/account.$accountId.settings.plan/hooks/useSubscriptionModals"
import useCommonStyles from "~/styles/commonStyles"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { formatTimestampShort } from "~/utils/dayjs"
import { getPlanName } from "~/utils/planUtils"
import { capitalizeFirstLetter } from "~/utils/utils"

interface AutoScalePlanOverviewCardProps {
  account: Account
  userRole: RoleName
  subscription: Stripe.Subscription
  usageRecords: Stripe.ApiList<Stripe.UsageRecordSummary>
}

export default function AutoScalePlanOverviewCard({
  account,
  userRole,
  subscription,
  usageRecords,
}: AutoScalePlanOverviewCardProps) {
  const location = useLocation()
  const { classes: commonClasses } = useCommonStyles()

  const { openStopSubscriptionModal } = useSubscriptionModals()

  const accountPlanType = account.planType
  const currentPeriodUsageRecords = usageRecords.data.find(({ invoice }) => !invoice)

  return (
    <TitledCard header={() => <Text weight={600}>Current plan</Text>}>
      <Stack pt={22} px={20}>
        <SimpleGrid breakpoints={[{ maxWidth: "md", cols: 1 }]} cols={2} spacing={40}>
          <Stack spacing={12}>
            <Group position="apart">
              <Text>Plan Type</Text> <Text>{getPlanName(accountPlanType)}</Text>
            </Group>
            <Divider />
            <Group position="apart">
              <Text>Subscription</Text> <Text>{subscription.id}</Text>
            </Group>
            <Divider />
            <Group position="apart">
              <Text>Start date</Text>
              <Text>{formatTimestampShort(subscription.start_date)}</Text>
            </Group>
            <Divider />
          </Stack>

          <Stack spacing={12}>
            <Group position="apart">
              <Text>Your role</Text> <Text>{capitalizeFirstLetter(userRole)}</Text>
            </Group>
            <Divider />
            <Group position="apart">
              <Text>Free Daily Relays</Text> <Text>100,000</Text>
            </Group>
            <Divider />
            <Group position="apart">
              <Text>Total Relays on this Billing Period</Text>
              <Text>
                {currentPeriodUsageRecords ? currentPeriodUsageRecords.total_usage : "-"}
              </Text>
            </Group>
            <Divider />
          </Stack>
        </SimpleGrid>

        {userRole !== "MEMBER" && (
          <Box mt="auto">
            <Form action="/api/stripe/portal-session" method="post">
              <input hidden defaultValue={location.pathname} name="return-path" />
              <Grid gutter="sm" justify="flex-end">
                <Grid.Col lg={4} md={4} sm={6}>
                  <Button
                    fullWidth
                    className={commonClasses.grayOutline}
                    color="gray"
                    rightIcon={<LuStopCircle size={18} />}
                    type="button"
                    variant="outline"
                    onClick={() => openStopSubscriptionModal(account)}
                  >
                    Stop subscription
                  </Button>
                </Grid.Col>
                <Grid.Col lg={4} md={4} sm={6}>
                  <Button
                    fullWidth
                    rightIcon={<LuArrowUpRight size={18} />}
                    type="submit"
                    onClick={() => {
                      trackEvent({
                        category: AnalyticCategories.account,
                        action: AnalyticActions.account_plan_manage,
                        label: account.id,
                      })
                    }}
                  >
                    Manage in Stripe
                  </Button>
                </Grid.Col>
              </Grid>
            </Form>
          </Box>
        )}
      </Stack>
    </TitledCard>
  )
}
