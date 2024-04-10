import { Card, SimpleGrid, Skeleton, Stack, Text, Title } from "@mantine/core"
import { useLocation, useNavigation, useSearchParams } from "@remix-run/react"
import React from "react"
import InsightsControls from "~/components/InsightsControls"
import TitledCard from "~/components/TitledCard"
import { PortalApp } from "~/models/portal/sdk"
import { AccountAppsOverview } from "~/routes/account.$accountId._index/components/AccountAppsOverview"
import { OverviewSparkline } from "~/routes/account.$accountId._index/components/OverviewSparkline"
import useAggregateChartData from "~/routes/account.$accountId._index/hooks/useAggregateChartData"
import { AccountInsightsData } from "~/routes/account.$accountId._index/route"
import { commify } from "~/utils/formattingUtils"

const ChartHeader = ({
  title,
  value,
  isLoading,
}: {
  title: string
  value: string
  isLoading?: boolean
}) => (
  <Stack gap={4}>
    {isLoading ? (
      <Skeleton height={8} mb={16} radius="xl" top={8} width={70} />
    ) : (
      <Title order={5}>{value}</Title>
    )}
    <Text fw={400} fz="xs">
      {title}
    </Text>
  </Stack>
)

export const AccountInsightsView = ({
  account,
  blockchains,
  aggregate,
  total,
  realtimeDataChains,
}: AccountInsightsData) => {
  const navigation = useNavigation()
  const location = useLocation()
  const portalApps = account.portalApps as PortalApp[]
  const isLoading =
    navigation.state === "loading" && navigation.location.pathname === location.pathname

  const [searchParams] = useSearchParams()
  const daysParam: number = Number(searchParams.get("days") ?? "7")

  const {
    aggregatedSuccessData,
    aggregatedTotalData,
    aggregatedLatencyData,
    aggregatedErrorData,
  } = useAggregateChartData({ data: aggregate, days: daysParam })

  return (
    <Stack gap="xl">
      <Title order={2}>Insights</Title>
      <InsightsControls
        apps={portalApps}
        availableChains={realtimeDataChains}
        chains={blockchains}
      />
      <TitledCard>
        <Card.Section>
          <AccountAppsOverview isLoading={isLoading} total={total} />
        </Card.Section>
      </TitledCard>

      <Stack gap="xl">
        <TitledCard>
          <ChartHeader
            isLoading={isLoading}
            title="Total Relays"
            value={commify(total?.totalCount ?? 0)}
          />
          <Card.Section p="md">
            <OverviewSparkline
              commifyLabelValue={true}
              isLoading={isLoading}
              sparklineData={aggregatedTotalData}
            />
          </Card.Section>
        </TitledCard>

        <SimpleGrid cols={{ base: 1, lg: 2 }}>
          <TitledCard>
            <ChartHeader
              isLoading={isLoading}
              title="Average Latency"
              value={`${commify(total?.avgLatency ?? 0)}ms`}
            />
            <Card.Section p="md">
              <OverviewSparkline
                isLoading={isLoading}
                label="ms"
                sparklineData={aggregatedLatencyData}
              />
            </Card.Section>
          </TitledCard>
          <TitledCard>
            <ChartHeader
              isLoading={isLoading}
              title="Success Rate"
              value={`${commify(total?.successRate ?? 0)}%`}
            />
            <Card.Section p="md">
              <OverviewSparkline
                customYAxisDomain={["dataMin - 10", 100]}
                isLoading={isLoading}
                label="%"
                sparklineData={aggregatedSuccessData}
              />
            </Card.Section>
          </TitledCard>
        </SimpleGrid>
        <TitledCard>
          <ChartHeader
            isLoading={isLoading}
            title="Total Errors"
            value={total?.errorCount ? commify(total.errorCount) : "0"}
          />
          <Card.Section p="md">
            <OverviewSparkline
              commifyLabelValue={true}
              isLoading={isLoading}
              sparklineData={aggregatedErrorData}
            />
          </Card.Section>
        </TitledCard>
      </Stack>
    </Stack>
  )
}

export default AccountInsightsView
