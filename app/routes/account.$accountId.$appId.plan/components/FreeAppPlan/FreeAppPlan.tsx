import {
  Box,
  createStyles,
  Group,
  Stack,
  Text,
  Title,
} from "@pokt-foundation/pocket-blocks"
import { useNavigate } from "@remix-run/react"
import React from "react"
import { AccountPlan } from "~/components/AccountPlan"
import { PayPlanTypeV2, PortalApp } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type FreeAppPlanProps = {
  app: PortalApp
}

const useStyles = createStyles((theme) => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "16px",

    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  },
}))

const FreeAppPlan = ({ app }: FreeAppPlanProps) => {
  const navigate = useNavigate()
  const { classes } = useStyles()

  return (
    <Stack align="center" mt={"xl"}>
      <Stack spacing="xs" ta="center">
        <Title order={3}>Upgrade your plan</Title>
        <Text>
          Your current plan is Free. <br /> Upgrade now to Auto-Scale and pay as you go.
        </Text>
      </Stack>
      <Box className={classes.grid}>
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
            navigate("https://www.grove.city/enterprise")
          }}
        />
      </Box>
    </Stack>
  )
}

export default FreeAppPlan
