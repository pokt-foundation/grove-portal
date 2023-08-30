import { Divider } from "@mantine/core"
import { Box, Card, Chip, Group, Text } from "@pokt-foundation/pocket-blocks"
import React, { useMemo } from "react"
import UptimeChart from "~/components/UptimeChart"
import { useUser } from "~/context/UserContext"
import { ProcessedEndpoint } from "~/models/portal/sdk"

const barData = [
  { date: "2023-07-01", uptime: 0.95, maxUptime: 1 },
  { date: "2023-07-02", uptime: 0.97, maxUptime: 1 },
  { date: "2023-07-03", uptime: 0.99, maxUptime: 1 },
  { date: "2023-07-04", uptime: 0.96, maxUptime: 1 },
  { date: "2023-07-05", uptime: 0.87, maxUptime: 1 },
  { date: "2023-07-06", uptime: 0.98, maxUptime: 1 },
  { date: "2023-07-07", uptime: 0.94, maxUptime: 1 },
  { date: "2023-07-08", uptime: 0.96, maxUptime: 1 },
  { date: "2023-07-09", uptime: 0.99, maxUptime: 1 },
  { date: "2023-07-10", uptime: 0.83, maxUptime: 1 },
  { date: "2023-07-11", uptime: 0.97, maxUptime: 1 },
  { date: "2023-07-12", uptime: 0.96, maxUptime: 1 },
  { date: "2023-07-13", uptime: 0.85, maxUptime: 1 },
  { date: "2023-07-14", uptime: 0.95, maxUptime: 1 },
  { date: "2023-07-15", uptime: 0.98, maxUptime: 1 },
  { date: "2023-07-16", uptime: 0.79, maxUptime: 1 },
  { date: "2023-07-17", uptime: 0.96, maxUptime: 1 },
  { date: "2023-07-18", uptime: 0.99, maxUptime: 1 },
  { date: "2023-07-19", uptime: 0.9, maxUptime: 1 },
  { date: "2023-07-20", uptime: 0.98, maxUptime: 1 },
  { date: "2023-07-21", uptime: 0.84, maxUptime: 1 },
  { date: "2023-07-22", uptime: 0.95, maxUptime: 1 },
  { date: "2023-07-23", uptime: 0.99, maxUptime: 1 },
  { date: "2023-07-24", uptime: 0.998, maxUptime: 1 },
  { date: "2023-07-25", uptime: 0.98, maxUptime: 1 },
  { date: "2023-07-26", uptime: 0.74, maxUptime: 1 },
  { date: "2023-07-27", uptime: 0.98, maxUptime: 1 },
  { date: "2023-07-28", uptime: 0.954, maxUptime: 1 },
  { date: "2023-07-29", uptime: 0.97, maxUptime: 1 },
  { date: "2023-07-30", uptime: 0.98, maxUptime: 1 },
]

export const AppOverview = ({ endpoint }: { endpoint: ProcessedEndpoint }) => {
  const user = useUser()
  // @ts-ignore
  const chains = useMemo(
    () =>
      user.data?.preferences?.endpoints
        ? user.data?.preferences?.endpoints[endpoint.id]
        : null,
    [endpoint.id, user],
  )

  if (chains) {
    console.log(chains)
  }

  return (
    <>
      <Text c="#0079E8" fw="600" fz="md">
        {endpoint.name}
      </Text>
      <Text fw="400">
        This is our test environment for our wallet application. This is our test
        environment for our wallet application.This is our test environment for our wallet
        application.
      </Text>
      <Chip.Group mt="sm">
        <Group>
          <Chip size="xs">eth-mainnet</Chip>
          <Chip size="xs">avax-mainnet</Chip>
          <Chip size="xs">arbitrum-mainnet</Chip>
          <Chip size="xs">arbitrum-mainnet</Chip>
        </Group>
      </Chip.Group>
      <Box h="50px" mt="lg">
        <UptimeChart data={barData} />
      </Box>
      <Divider label="99.70 % uptime" labelPosition="center" my="xs" />
    </>
  )
}

export default AppOverview
