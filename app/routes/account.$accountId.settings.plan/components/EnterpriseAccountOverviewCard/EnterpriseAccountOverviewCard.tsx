import { Divider, Button, Group, Text, Stack } from "@mantine/core"
import { Link } from "@remix-run/react"
import React from "react"
import { LuArrowUpRight } from "react-icons/lu/index.js"
import { TitledCard } from "~/components/TitledCard"
import { Account } from "~/models/portal/sdk"
import { getPlanName } from "~/utils/planUtils"
import { DISCORD_PATH } from "~/utils/utils"

interface EnterpriseAccountOverviewCardProps {
  account: Account
}

export default function EnterpriseAccountOverviewCard({
  account,
}: EnterpriseAccountOverviewCardProps) {
  const cardItems = [
    {
      label: "Plan Type",
      value: getPlanName(account.planType),
    },
    {
      label: "Custom Limit",
      value: account.enterpriseLimit,
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
        <Group grow spacing="md">
          <Button
            component={Link}
            rightIcon={<LuArrowUpRight size={18} />}
            target="_blank"
            to={DISCORD_PATH}
          >
            Discord Support
          </Button>
        </Group>
      </Stack>
    </TitledCard>
  )
}
