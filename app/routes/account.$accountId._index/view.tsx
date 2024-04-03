import { Card, SimpleGrid, Skeleton, Stack, Text, Title } from "@mantine/core"
import { useLocation, useNavigation } from "@remix-run/react"
import React from "react"
import InsightsControls from "app/components/InsightsControls"
import TitledCard from "~/components/TitledCard"
import { Account, Blockchain, PortalApp } from "~/models/portal/sdk"
import { AccountAppsOverview } from "~/routes/account.$accountId._index/components/AccountAppsOverview"
import { OverviewSparkline } from "~/routes/account.$accountId._index/components/OverviewSparkline"
import useAggregateChartData from "~/routes/account.$accountId._index/hooks/useAggregateChartData"
import { AccountInsightsData } from "~/routes/account.$accountId._index/route"
import { getTotalErrors } from "~/utils/chartUtils"
import { commify } from "~/utils/formattingUtils"

type AccountInsightsViewProps = Pick<AccountInsightsData, "total" | "aggregate"> & {
  account: Account
  blockchains: Blockchain[]
}

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
  total,
  aggregate,
  blockchains,
}: AccountInsightsViewProps) => {
  const navigation = useNavigation()
  const location = useLocation()
  const portalApps = account.portalApps as PortalApp[]
  const isLoading =
    navigation.state === "loading" && navigation.location.pathname === location.pathname

  const totalErrors = getTotalErrors(total)

  const {
    aggregatedSuccessData,
    aggregatedTotalData,
    aggregatedLatencyData,
    aggregatedErrorData,
  } = useAggregateChartData(aggregate)

  return (
    <Stack gap="xl" mb="xl" pt={22}>
      <Title order={2}>Insights</Title>
      <InsightsControls apps={portalApps} chains={blockchains} />
      <TitledCard>
        <Card.Section>
          <AccountAppsOverview aggregate={total} isLoading={isLoading} />
        </Card.Section>
      </TitledCard>

      <Stack gap="xl">
        <TitledCard>
          <ChartHeader
            isLoading={isLoading}
            title="Total Relays"
            value={commify(total?.countTotal ?? 0)}
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
              value={`${commify(total?.rateSuccess ?? 0)}%`}
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
            value={totalErrors ? commify(totalErrors) : "0"}
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
