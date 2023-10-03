import {
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Badge,
} from "@pokt-foundation/pocket-blocks"
import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import dayjs from "dayjs"
import invariant from "tiny-invariant"
import ErrorView from "~/components/ErrorView"
import TitledCard from "~/components/TitledCard"
import { getAggregateRelays, getTotalRelays } from "~/models/dwh/dwh.server"
import { AnalyticsRelaysAggregated } from "~/models/dwh/sdk/models/AnalyticsRelaysAggregated"
import { AnalyticsRelaysTotal } from "~/models/dwh/sdk/models/AnalyticsRelaysTotal"
import { AccountAppsOverview } from "~/routes/account.$accountId._index/components/AccountAppsOverview"
import { ChartPeriodSelector } from "~/routes/account.$accountId._index/components/ChartPeriodSelector"
import { OverviewSparkline } from "~/routes/account.$accountId._index/components/OverviewSparkline"
import type { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { commify } from "~/utils/formattingUtils"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Application Insights ${seo_title_append}`,
  }
}

type AppInsightsData = {
  total: AnalyticsRelaysTotal
  aggregate: AnalyticsRelaysAggregated[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request)
  const url = new URL(request.url)
  const daysParam = Number(url.searchParams.get("days") ?? "7")

  try {
    const { appId } = params
    invariant(typeof appId === "string", "AppId must be a set url parameter")

    const aggregate = await getAggregateRelays({
      category: "application_id",
      categoryValue: [appId],
      days: daysParam,
    })
    const total = await getTotalRelays({
      category: "application_id",
      categoryValue: [appId],
      days: daysParam,
    })

    return json<DataStruct<AppInsightsData>>({
      data: {
        total: (total as AnalyticsRelaysTotal) ?? undefined,
        aggregate: (aggregate as AnalyticsRelaysAggregated[]) ?? undefined, //dailyReponse.data as AnalyticsRelaysDaily[],
      },
      error: false,
    })
  } catch (error) {
    return json<DataStruct<AppInsightsData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function ApplicationInsights() {
  const { data, error, message } = useLoaderData() as DataStruct<AppInsightsData>

  if (error) {
    return <ErrorView message={message} />
  }

  const { total, aggregate } = data

  const aggregateTotalData = aggregate?.map((day) => ({
    date: dayjs(day.date).format("MMM DD"),
    val: day.countTotal ?? null,
  }))
  const aggregateLatencyData = aggregate?.map((day) => ({
    date: dayjs(day.date).format("MMM DD"),
    val: day.avgLatency ?? null,
  }))
  const aggregateSuccessData = aggregate?.map((day) => ({
    date: dayjs(day.date).format("MMM DD"),
    val: day.rateSuccess ?? null,
  }))
  const aggregateErrorData = aggregate?.map((day) => ({
    date: dayjs(day.date).format("MMM DD"),
    val: day.rateError ?? null,
  }))

  return (
    <Stack mb="xl" pt={22} spacing="xl">
      <TitledCard
        header={() => (
          <Group position="apart">
            <Text weight={600}>Application Overview</Text>
            <ChartPeriodSelector />
          </Group>
        )}
      >
        <Card.Section>
          <AccountAppsOverview aggregate={total} />
        </Card.Section>
      </TitledCard>

      <Stack spacing="xl">
        <TitledCard
          header={() => (
            <Group position="apart">
              <Text weight={600}>
                Total Relays
                <Badge ml="sm" px={6} radius="sm">
                  {commify(total?.countTotal ?? 0)}
                </Badge>
              </Text>
              <ChartPeriodSelector />
            </Group>
          )}
        >
          <Card.Section p="md">
            <OverviewSparkline label=" relays" sparklineData={aggregateTotalData} />
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
              <OverviewSparkline label="ms" sparklineData={aggregateLatencyData} />
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
              <OverviewSparkline label="%" sparklineData={aggregateSuccessData} />
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
            <OverviewSparkline label="%" sparklineData={aggregateErrorData} />
          </Card.Section>
        </TitledCard>
      </Stack>
    </Stack>
  )
}
