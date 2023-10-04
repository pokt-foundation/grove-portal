import { Divider } from "@mantine/core"
import { Group, Text, Stack } from "@pokt-foundation/pocket-blocks"
import React from "react"
import { TitledCard } from "~/components/TitledCard"
import { PortalApp } from "~/models/portal/sdk"
import { getPlanName } from "~/utils/planUtils"

type PlanLimitOverviewCardProps = {
  app: PortalApp
}

export const PlanLimitOverviewCard = ({ app }: PlanLimitOverviewCardProps) => {
  const cardItems = [
    {
      label: "Plan Type",
      value: getPlanName(app.legacyFields.planType),
    },
    {
      label: "Daily Limit",
      value: app.legacyFields.dailyLimit,
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
            {index !== cardItems.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Stack>
    </TitledCard>
  )
}

export default PlanLimitOverviewCard
