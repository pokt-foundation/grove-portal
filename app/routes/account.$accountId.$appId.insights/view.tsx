import { Badge, Card, Group, SimpleGrid, Stack, Text } from "@mantine/core"
import { useNavigation, useSearchParams } from "@remix-run/react"
import TitledCard from "~/components/TitledCard"
import { AppInsightsData } from "~/routes/account.$accountId.$appId.insights/route"
import { AccountAppsOverview } from "~/routes/account.$accountId._index/components/AccountAppsOverview"
import { ChartPeriodSelector } from "~/routes/account.$accountId._index/components/ChartPeriodSelector"
import { OverviewSparkline } from "~/routes/account.$accountId._index/components/OverviewSparkline"
import useAggregateChartData from "~/routes/account.$accountId._index/hooks/useAggregateChartData"
import { commify } from "~/utils/formattingUtils"

export default function ApplicationInsightsView({ total, aggregate }: AppInsightsData) {
  const navigation = useNavigation()
  const isLoading = !!(navigation.state === "loading" && navigation.formAction)
  const [searchParams] = useSearchParams()
  const daysParam: number = Number(searchParams.get("days") ?? "7")

  const {
    aggregatedSuccessData,
    aggregatedTotalData,
    aggregatedLatencyData,
    aggregatedErrorData,
  } = useAggregateChartData({ data: aggregate, days: daysParam })

  // TODO: Update view to match latest insights changes
  return (
    <Stack gap="xl" mb="xl" pt={22}>
      <TitledCard
        header={() => (
          <Group justify="space-between">
            <Text fw={600}>Application Overview</Text>
            <ChartPeriodSelector />
          </Group>
        )}
      >
        <Card.Section>
          <AccountAppsOverview isLoading={isLoading} total={total} />
        </Card.Section>
      </TitledCard>

      <Stack gap="xl">
        <TitledCard
          header={() => (
            <Group justify="space-between">
              <Group>
                <Text fw={600}>Total Relays</Text>
                <Badge px={6} radius="sm">
                  {commify(total?.totalCount ?? 0)}
                </Badge>
              </Group>
              <ChartPeriodSelector />
            </Group>
          )}
        >
          <Card.Section p="md">
            <OverviewSparkline
              isLoading={isLoading}
              label=" relays"
              sparklineData={aggregatedTotalData}
            />
          </Card.Section>
        </TitledCard>

        <SimpleGrid cols={{ base: 1, lg: 2 }}>
          <TitledCard
            header={() => (
              <Group justify="space-between">
                <Group>
                  <Text fw={600}>Average Latency </Text>
                  <Badge px={6} radius="sm" tt="lowercase">
                    {commify(total?.avgLatency ?? 0)}ms
                  </Badge>
                </Group>
                <ChartPeriodSelector />
              </Group>
            )}
          >
            <Card.Section p="md">
              <OverviewSparkline
                isLoading={isLoading}
                label="ms"
                sparklineData={aggregatedLatencyData}
              />
            </Card.Section>
          </TitledCard>
          <TitledCard
            header={() => (
              <Group justify="space-between">
                <Group>
                  <Text fw={600}>Success Rate </Text>
                  <Badge px={6} radius="sm">
                    {commify(total?.successRate ?? 0)}%
                  </Badge>
                </Group>
                <ChartPeriodSelector />
              </Group>
            )}
          >
            <Card.Section p="md">
              <OverviewSparkline
                isLoading={isLoading}
                label="%"
                sparklineData={aggregatedSuccessData}
              />
            </Card.Section>
          </TitledCard>
        </SimpleGrid>
        <TitledCard
          header={() => (
            <Group justify="space-between">
              <Group>
                <Text fw={600}>Total Errors </Text>
                <Badge px={6} radius="sm">
                  {total?.errorCount ? commify(total.errorCount) : 0}
                </Badge>
              </Group>
              <ChartPeriodSelector />
            </Group>
          )}
        >
          <Card.Section p="md">
            <OverviewSparkline
              isLoading={isLoading}
              sparklineData={aggregatedErrorData}
            />
          </Card.Section>
        </TitledCard>
      </Stack>
    </Stack>
  )
}
