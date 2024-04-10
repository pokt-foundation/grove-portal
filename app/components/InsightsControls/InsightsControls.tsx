import { Divider, Box, Group, Text, useMantineTheme } from "@mantine/core"
import { useSearchParams } from "@remix-run/react"
import React from "react"
import ChainSelectItem from "~/components/ChainSelectItem"
import FluidSelect from "~/components/FluidSelect"
import { Blockchain, D2Chain, PortalApp } from "~/models/portal/sdk"
import { DEFAULT_APPMOJI } from "~/routes/account_.$accountId.create/components/AppmojiPicker"

type InsightsControlsProps = {
  apps: PortalApp[]
  chains: Blockchain[]
  availableChains: D2Chain[]
}

const InsightsControls = ({ apps, chains, availableChains }: InsightsControlsProps) => {
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

  const chainsSelectItems = React.useMemo(() => {
    const realtimeDataChainsIds = availableChains.map((d2Chain) => d2Chain.chainID)
    return realtimeDataChainsIds.length > 0
      ? [
          { value: "all", label: "All Endpoints" },
          ...(chains.length > 0
            ? chains
                .filter(({ id }) => realtimeDataChainsIds.includes(id))
                .map((chain) => ({
                  value: chain.id,
                  label: chain.description ?? chain.blockchain,
                  chain,
                }))
            : []),
        ]
      : []
  }, [chains, availableChains])

  const [searchParams, setSearchParams] = useSearchParams()
  const daysParam = searchParams.get("days") ?? "7"
  const appParam = searchParams.get("app") ?? "all"
  const chainParam = searchParams.get("chain")
    ? (searchParams.get("chain") as string)
    : availableChains.length > 0
    ? "all"
    : undefined

  const handleParamChange = ({
    param,
    paramKey,
  }: {
    param: string
    paramKey: string
  }) => {
    setSearchParams((searchParams) => {
      searchParams.set(paramKey, param)
      return searchParams
    })
  }

  const handleAppChange = (app: string) => {
    setSearchParams((searchParams) => {
      searchParams.delete("chain")
      searchParams.set("app", app)
      return searchParams
    })
  }

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
            items={appsSelect}
            styles={{ label: { marginLeft: 12, marginRight: 12 } }}
            value={appParam}
            withSearch={chainsSelectItems.length > 7}
            onSelect={handleAppChange}
          />
          <Divider orientation="vertical" />
          <FluidSelect
            disabled={chainsSelectItems.length === 0}
            itemComponent={ChainSelectItem}
            items={chainsSelectItems}
            value={chainParam}
            withSearch={chainsSelectItems.length > 7}
            onSelect={(chain: string) =>
              handleParamChange({ param: chain, paramKey: "chain" })
            }
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
              { value: "1", label: "Last 24 Hours" },
              { value: "3", label: "3 Days" },
              { value: "7", label: "7 Days" },
              { value: "14", label: "2 Weeks" },
              { value: "30", label: "30 Days" },
              { value: "60", label: "60 Days" },
            ]}
            value={daysParam}
            onSelect={(period: string) =>
              handleParamChange({ param: period, paramKey: "days" })
            }
          />
        </Box>
      </Group>
    </Group>
  )
}

export default InsightsControls
