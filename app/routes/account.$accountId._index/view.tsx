import {
  Badge,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@pokt-foundation/pocket-blocks"
import { useNavigation } from "@remix-run/react"
import React from "react"
import TitledCard from "~/components/TitledCard"
import { AccountAppsOverview } from "~/routes/account.$accountId._index/components/AccountAppsOverview"
import { ChartPeriodSelector } from "~/routes/account.$accountId._index/components/ChartPeriodSelector"
import { OverviewSparkline } from "~/routes/account.$accountId._index/components/OverviewSparkline"
import useAggregateChartData from "~/routes/account.$accountId._index/hooks/useAggregateChartData"
import { AccountInsightsData } from "~/routes/account.$accountId._index/route"
import { commify } from "~/utils/formattingUtils"

type AccountInsightsViewProps = {
  data: Pick<AccountInsightsData, "total" | "aggregate">
}

export const AccountInsightsView = ({ data }: AccountInsightsViewProps) => {
  const navigation = useNavigation()

  const isLoading = !!(navigation.state === "loading" && navigation.formAction)

  const { total, aggregate } = data

  const {
    aggregateSuccessData,
    aggregateTotalData,
    aggregateLatencyData,
    aggregateErrorData,
  } = useAggregateChartData(aggregate)

  return (
    <Stack mb="xl" pt={22} spacing="xl">
      <TitledCard
        header={() => (
          <Group position="apart">
            <Text weight={600}>Account Overview</Text>
            <ChartPeriodSelector />
          </Group>
        )}
      >
        <Card.Section>
          <AccountAppsOverview aggregate={total} isLoading={isLoading} />
        </Card.Section>
      </TitledCard>

      <Stack spacing="xl">
        <TitledCard
          header={() => (
            <Group position="apart">
              <Text weight={600}>
                Total Relays{" "}
                <Badge ml="sm" px={6} radius="sm">
                  {commify(total?.countTotal ?? 0)}
                </Badge>
              </Text>
              <ChartPeriodSelector />
            </Group>
          )}
        >
          <Card.Section p="md">
            <OverviewSparkline
              isLoading={isLoading}
              label=" relays"
              sparklineData={aggregateTotalData}
            />
          </Card.Section>
        </TitledCard>

        <SimpleGrid breakpoints={[{ maxWidth: "md", cols: 1 }]} cols={2}>
          <TitledCard
            header={() => (
              <Group position="apart">
                <Text weight={600}>
                  Average Latency{" "}
                  <Badge ml="sm" px={6} radius="sm">
                    {commify(total?.avgLatency ?? 0)}ms
                  </Badge>
                </Text>
                <ChartPeriodSelector />
              </Group>
            )}
          >
            <Card.Section p="md">
              <OverviewSparkline
                isLoading={isLoading}
                label="ms"
                sparklineData={aggregateLatencyData}
              />
            </Card.Section>
          </TitledCard>
          <TitledCard
            header={() => (
              <Group position="apart">
                <Text weight={600}>
                  Success Rate{" "}
                  <Badge ml="sm" px={6} radius="sm">
                    {commify(total?.rateSuccess ?? 0)}%
                  </Badge>
                </Text>
                <ChartPeriodSelector />
              </Group>
            )}
          >
            <Card.Section p="md">
              <OverviewSparkline
                isLoading={isLoading}
                label="%"
                sparklineData={aggregateSuccessData}
              />
            </Card.Section>
          </TitledCard>
        </SimpleGrid>
        <TitledCard
          header={() => (
            <Group position="apart">
              <Text weight={600}>
                Error Rate{" "}
                <Badge ml="sm" px={6} radius="sm">
                  {commify(total?.rateError ?? 0)}%
                </Badge>
              </Text>
              <ChartPeriodSelector />
            </Group>
          )}
        >
          <Card.Section p="md">
            <OverviewSparkline
              isLoading={isLoading}
              label="%"
              sparklineData={aggregateErrorData}
            />
          </Card.Section>
        </TitledCard>
      </Stack>
    </Stack>
  )
}

export default AccountInsightsView
