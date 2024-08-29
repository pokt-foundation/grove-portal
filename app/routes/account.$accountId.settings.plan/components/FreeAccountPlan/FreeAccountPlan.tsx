import { SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { useNavigate } from "@remix-run/react"
import React from "react"
import { AccountPlan } from "~/components/AccountPlan"
import { Account, PayPlanType, RoleName } from "~/models/portal/sdk"
import FreePlanLimitCard from "~/routes/account.$accountId.settings.plan/components/FreePlanLimitCard"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { getPlanName } from "~/utils/planUtils"

type FreeAccountPlanProps = {
  account: Account
  userRole: RoleName
}

const FreeAccountPlan = ({ account, userRole }: FreeAccountPlanProps) => {
  const navigate = useNavigate()

  return userRole === "MEMBER" ? (
    <Stack mt={"xl"}>
      <FreePlanLimitCard account={account} />
    </Stack>
  ) : (
    <Stack align="center" mt={"xl"}>
      <Stack gap="xs" ta="center">
        <Title order={3}>Upgrade your plan</Title>
        <Text>
          Your current plan is {getPlanName(account.planType)}. <br /> Upgrade now to
          Unlimited.
        </Text>
      </Stack>
      <SimpleGrid cols={{ base: 1, lg: 3 }}>
        <AccountPlan disableFree type={PayPlanType.PlanFree} />
        <AccountPlan
          type={PayPlanType.PlanUnlimited}
          onContinue={() => {
            trackEvent({
              category: AnalyticCategories.account,
              action: AnalyticActions.account_plan_upgrade,
              label: account.id,
            })
            navigate(`/api/stripe/checkout-session?account-id=${account.id}`)
          }}
        />
        <AccountPlan
          type={PayPlanType.Enterprise}
          onContinue={() => {
            trackEvent({
              category: AnalyticCategories.account,
              action: AnalyticActions.account_plan_enterprise,
              label: account.id,
            })
            window.open("https://www.grove.city/enterprise", "_blank", "noreferrer")
          }}
        />
      </SimpleGrid>
    </Stack>
  )
}

export default FreeAccountPlan
