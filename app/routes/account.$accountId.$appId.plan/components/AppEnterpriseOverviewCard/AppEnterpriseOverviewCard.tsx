import { Divider } from "@mantine/core"
import { Button, Group, Text, Stack } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import React from "react"
import { LuArrowUpRight } from "react-icons/lu"
import { TitledCard } from "~/components/TitledCard"
import { PortalApp } from "~/models/portal/sdk"
import { getPlanName } from "~/utils/planUtils"
import { DISCORD_PATH } from "~/utils/utils"

interface AppEnterpriseOverviewCardProps {
  app: PortalApp
}

export default function AppEnterpriseOverviewCard({
  app,
}: AppEnterpriseOverviewCardProps) {
  const cardItems = [
    {
      label: "Plan Type",
      value: getPlanName(app.legacyFields.planType),
    },
    {
      label: "Custom Limit",
      value: app.legacyFields.customLimit,
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
