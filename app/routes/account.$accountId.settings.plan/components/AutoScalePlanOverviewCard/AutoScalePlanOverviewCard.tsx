import { Divider } from "@mantine/core"
import { Button, Group, Text, Stack, Box } from "@pokt-foundation/pocket-blocks"
import { Form, useLocation } from "@remix-run/react"
import React from "react"
import { LuArrowUpRight, LuRepeat, LuStopCircle } from "react-icons/lu"
import { TitledCard } from "~/components/TitledCard"
import { Account, RoleName } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import useSubscriptionModals from "~/routes/account.$accountId.settings.plan/hooks/useSubscriptionModals"
import useCommonStyles from "~/styles/commonStyles"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { dayjs } from "~/utils/dayjs"
import { getPlanName } from "~/utils/planUtils"

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

  const { openStopSubscriptionModal, openRenewSubscriptionModal } =
    useSubscriptionModals()

  const accountPlanType = account.planType

  const cardItems = [
    {
      label: "Plan Type",
      value: getPlanName(accountPlanType),
    },
    {
      label: "Subscription",
      value: subscription.id,
    },
    {
      label: "Status",
      value: subscription.status.replace(/^\w/, (char) => char.toUpperCase()),
    },
    // {
    //   label: "Free Daily Relays",
    //   value: account.integrations.dailyLimit,
    // },
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
      <Stack px={20} py={10}>
        {cardItems.map(({ label, value }, index) => (
          <React.Fragment key={`${label}-${index}`}>
            <Group p={12} position="apart">
              <Text>{label}</Text> <Text>{value}</Text>
            </Group>
            <Divider />
          </React.Fragment>
        ))}
        {userRole !== "MEMBER" && (
          <Box mt="auto">
            <Form action="/api/stripe/portal-session" method="post">
              <input hidden defaultValue={location.pathname} name="return-path" />
              <Group grow spacing="md">
                {accountPlanType === "PAY_AS_YOU_GO_V0" ? (
                  <Button
                    className={commonClasses.grayOutlinedButton}
                    color="gray"
                    rightIcon={<LuStopCircle size={18} />}
                    type="button"
                    variant="outline"
                    onClick={() => openStopSubscriptionModal(account)}
                  >
                    Stop subscription
                  </Button>
                ) : (
                  <Button
                    rightIcon={<LuRepeat size={18} />}
                    type="button"
                    variant="outline"
                    onClick={() => openRenewSubscriptionModal(account)}
                  >
                    Renew subscription
                  </Button>
                )}

                <Button
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
              </Group>
            </Form>
          </Box>
        )}
      </Stack>
    </TitledCard>
  )
}
