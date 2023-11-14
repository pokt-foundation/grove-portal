import { SimpleGrid, Stack, Text, Title } from "@pokt-foundation/pocket-blocks"
import { useNavigate } from "@remix-run/react"
import React from "react"
import { AccountPlan } from "~/components/AccountPlan"
import { Account, PayPlanType, RoleName } from "~/models/portal/sdk"
import StarterPlanLimitCard from "~/routes/account.$accountId.settings.plan/components/StarterPlanLimitCard"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { getPlanName } from "~/utils/planUtils"

type StarterAccountPlanProps = {
  account: Account
  userRole: RoleName
}

const StarterAccountPlan = ({ account, userRole }: StarterAccountPlanProps) => {
  const navigate = useNavigate()

  return userRole === "MEMBER" ? (
    <Stack mt={"xl"}>
      <StarterPlanLimitCard account={account} />
    </Stack>
  ) : (
    <Stack align="center" mt={"xl"}>
      <Stack spacing="xs" ta="center">
        <Title order={3}>Upgrade your plan</Title>
        <Text>
          Your current plan is {getPlanName(account.planType)}. <br /> Upgrade now to
          Auto-Scale and pay as you go.
        </Text>
      </Stack>
      <SimpleGrid breakpoints={[{ maxWidth: "lg", cols: 1 }]} cols={3}>
        <AccountPlan disableFree type={PayPlanType.FreetierV0} />
        <AccountPlan
          type={PayPlanType.PayAsYouGoV0}
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

export default StarterAccountPlan
