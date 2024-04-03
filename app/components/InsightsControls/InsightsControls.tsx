import { Divider, Box, Group, Text, useMantineTheme } from "@mantine/core"
import { useSearchParams } from "@remix-run/react"
import React, { useState } from "react"
import ChainSelectItem from "~/components/ChainSelectItem"
import FluidSelect from "~/components/FluidSelect"
import { Blockchain, PortalApp } from "~/models/portal/sdk"
import { DEFAULT_APPMOJI } from "~/routes/account_.$accountId.create/components/AppmojiPicker"

type InsightsControlsProps = {
  apps: PortalApp[]
  chains: Blockchain[]
}

const InsightsControls = ({ apps, chains }: InsightsControlsProps) => {
  const theme = useMantineTheme()

  const appsSelect = [
    { value: "all", label: "All Applications" },
    ...(apps && apps.length > 0
      ? apps.map((app) => ({
          value: app?.id ?? "",
          label: `${String.fromCodePoint(
            parseInt(app?.appEmoji ? app.appEmoji : DEFAULT_APPMOJI, 16),
          )} ${app?.name}`,
        }))
      : []),
  ]

  const chainsSelect = [
    { value: "all", label: "All Endpoints" },
    ...(chains?.map((chain) => ({
      value: chain.blockchain,
      label: chain.description ?? chain.blockchain,
      chain,
    })) ?? []),
  ]

  const [searchParams, setSearchParams] = useSearchParams()
  const daysParam = searchParams.get("days") ?? "7"

  const handlePeriodChange = (period: string | null) => {
    setSearchParams({ days: period ?? "7" })
  }

  const [selectedChain, setSelectedChain] = useState("all")
  const [selectedApp, setSelectedApp] = useState("all")

  return (
    <Group justify="space-between">
      <Group>
        <Group
          gap={0}
          pos="relative"
          style={{
            border: `1px solid ${theme.colors.gray[8]}`,
            borderRadius: 4,
          }}
        >
          <FluidSelect
            withSearch
            items={appsSelect}
            styles={{ label: { marginLeft: 12, marginRight: 12 } }}
            value={selectedApp}
            onSelect={(app) => setSelectedApp(app)}
          />
          <Divider orientation="vertical" />
          <FluidSelect
            withSearch
            itemComponent={ChainSelectItem}
            items={chainsSelect}
            value={selectedChain}
            onSelect={(chain) => setSelectedChain(chain)}
          />
        </Group>
        <Text>filtered over the past</Text>
        <Box
          style={{
            border: `1px solid ${theme.colors.gray[8]}`,
            borderRadius: 4,
          }}
        >
          <FluidSelect
            items={[
              { value: "7", label: "7 Days" },
              { value: "30", label: "30 Days" },
              { value: "60", label: "60 Days" },
            ]}
            value={daysParam}
            onSelect={(period) => handlePeriodChange(period)}
          />
        </Box>
      </Group>
    </Group>
  )
}

export default InsightsControls
