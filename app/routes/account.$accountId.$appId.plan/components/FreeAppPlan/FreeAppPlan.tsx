import { SimpleGrid, Stack, Text, Title } from "@pokt-foundation/pocket-blocks"
import { useNavigate } from "@remix-run/react"
import React from "react"
import { AccountPlan } from "~/components/AccountPlan"
import { PayPlanTypeV2, PortalApp } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type FreeAppPlanProps = {
  app: PortalApp
}

const FreeAppPlan = ({ app }: FreeAppPlanProps) => {
  const navigate = useNavigate()

  return (
    <Stack align="center" mt={"xl"}>
      <Stack spacing="xs" ta="center">
        <Title order={3}>Upgrade your plan</Title>
        <Text>
          Your current plan is Free. <br /> Upgrade now to Auto-Scale and pay as you go.
        </Text>
      </Stack>
      <SimpleGrid breakpoints={[{ maxWidth: "lg", cols: 1 }]} cols={3}>
        <AccountPlan disableFree type={PayPlanTypeV2.FreetierV0} />
        <AccountPlan
          type={PayPlanTypeV2.PayAsYouGoV0}
          onContinue={() => {
            trackEvent({
              category: AnalyticCategories.app,
              action: AnalyticActions.app_plan_upgrade,
              label: app.id,
            })
            navigate(
              `/api/stripe/checkout-session?app-id=${app.id}&app-accountId=${app.accountID}&app-name=${app.name}`,
            )
          }}
        />
        <AccountPlan
          type={PayPlanTypeV2.Enterprise}
          onContinue={() => {
            trackEvent({
              category: AnalyticCategories.app,
              action: AnalyticActions.app_plan_enterprise,
              label: app.id,
            })
            window.open("https://www.grove.city/enterprise", "_blank", "noreferrer")
          }}
        />
      </SimpleGrid>
    </Stack>
  )
}

export default FreeAppPlan
