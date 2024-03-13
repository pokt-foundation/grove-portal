import { Divider, Group, Text, Stack } from "@mantine/core"
import React from "react"
import { TitledCard } from "~/components/TitledCard"
import { Account } from "~/models/portal/sdk"
import { getPlanName } from "~/utils/planUtils"

type StarterPlanLimitCardProps = {
  account: Account
}

export const StarterPlanLimitCard = ({ account }: StarterPlanLimitCardProps) => {
  const cardItems = [
    {
      label: "Plan Type",
      value: getPlanName(account.planType),
    },
    // {
    //   label: "Daily Limit",
    //   value: account.integrations.dailyLimit,
    // },
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

export default StarterPlanLimitCard
