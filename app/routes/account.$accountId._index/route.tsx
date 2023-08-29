import { Divider } from "@mantine/core"
import { Card, Group, SimpleGrid, Stack, Text } from "@pokt-foundation/pocket-blocks"
import { MetaFunction } from "@remix-run/node"
import { useRouteLoaderData } from "@remix-run/react"
import React from "react"
import AppOverview from "./components/AppOverview/AppOverview"
import TitledCard from "~/components/TitledCard"
import { EndpointsQuery, ProcessedEndpoint } from "~/models/portal/sdk"
import { RootLoaderData } from "~/root"
import { AccountAppsOverview } from "~/routes/account.$accountId._index/components/AccountAppsOverview"
import { EmptyState } from "~/routes/account.$accountId._index/components/EmptyState"
import { OverviewSparkline } from "~/routes/account.$accountId._index/components/OverviewSparkline"
import { PocketUser } from "~/routes/api.user/route"

export type DashboardLoaderData = {
  endpoints: EndpointsQuery | null
  user: PocketUser
}

export const meta: MetaFunction = () => {
  return {
    title: "Account Overview",
  }
}

export default function Account() {
  const { endpoints } = useRouteLoaderData("root") as RootLoaderData

  const sparklineData = [
    {
      date: "Jul 15",
      val: 0,
    },
    {
      date: "Jul 16",
      val: 65,
    },
    {
      date: "Jul 17",
      val: 20,
    },
    {
      date: "Jul 18",
      val: 51,
    },
    {
      date: "Jul 19",
      val: 162,
    },
    {
      date: "Jul 20",
      val: 25,
    },
    {
      date: "Jul 21",
      val: 180,
    },
  ]

  // const ownerEndpoints = (endpoints?.owner as ProcessedEndpoint[]) ?? []
  const ownerEndpoints = endpoints
    ? ([
        ...endpoints.owner,
        ...endpoints.member,
        ...endpoints.admin,
      ] as ProcessedEndpoint[])
    : []

  if (ownerEndpoints.length === 0) return <EmptyState />

  return (
    <Stack mb="xl">
      <TitledCard
        header={() => (
          <Group position="apart">
            <Text weight={600}>Organization Overview</Text>
          </Group>
        )}
      >
        <Card.Section>
          <AccountAppsOverview />
        </Card.Section>
      </TitledCard>

      {ownerEndpoints.length > 0 && (
        <TitledCard
          header={() => (
            <Group position="apart">
              <Text weight={600}>Applications</Text>
            </Group>
          )}
        >
          {ownerEndpoints.map((endpoint) => (
            <Card.Section key={endpoint.id} inheritPadding mt="md">
              <AppOverview endpoint={endpoint} />
            </Card.Section>
          ))}
        </TitledCard>
      )}

      <Divider my="xl" />

      <TitledCard
        header={() => (
          <Group position="apart">
            <Text weight={600}>Total Relays</Text>
          </Group>
        )}
      >
        <Card.Section inheritPadding>
          <OverviewSparkline sparklineData={sparklineData} title="542,499" />
        </Card.Section>
      </TitledCard>

      <SimpleGrid breakpoints={[{ maxWidth: "md", cols: 1 }]} cols={2}>
        <TitledCard
          header={() => (
            <Group position="apart">
              <Text weight={600}>Total Relays</Text>
            </Group>
          )}
        >
          <Card.Section inheritPadding>
            <OverviewSparkline sparklineData={sparklineData} title="542,499" />
          </Card.Section>
        </TitledCard>
        <TitledCard
          header={() => (
            <Group position="apart">
              <Text weight={600}>Total Relays</Text>
            </Group>
          )}
        >
          <Card.Section inheritPadding>
            <OverviewSparkline sparklineData={sparklineData} title="542,499" />
          </Card.Section>
        </TitledCard>
      </SimpleGrid>
    </Stack>
  )
}
