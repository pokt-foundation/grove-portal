import {
  Card,
  Group,
  Button,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
  Badge,
} from "@pokt-foundation/pocket-blocks"
import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { Form, useLoaderData, useNavigation, useSearchParams } from "@remix-run/react"
import dayjs from "dayjs"
import invariant from "tiny-invariant"
import ErrorView from "~/components/ErrorView"
import TitledCard from "~/components/TitledCard"
import { getAggregateRelays, getTotalRelays } from "~/models/dwh/dwh.server"
import { AnalyticsRelaysAggregated } from "~/models/dwh/sdk/models/AnalyticsRelaysAggregated"
import { AnalyticsRelaysDaily } from "~/models/dwh/sdk/models/AnalyticsRelaysDaily"
import { AccountAppsOverview } from "~/routes/account.$accountId._index/components/AccountAppsOverview"
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
  total: AnalyticsRelaysDaily
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
        total: (total as AnalyticsRelaysDaily) ?? undefined,
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

const InsightsDaysPeriodSelector = () => {
  const theme = useMantineTheme()
  const navigation = useNavigation()
  const [searchParams] = useSearchParams()
  const daysParam = searchParams.get("days") ?? "7"
  // Static component for now
  return (
    <Form>
      <Button.Group>
        <Button
          bg={daysParam === "7" ? theme.colors.dark[7] : theme.colors.dark[9]}
          loading={!!(daysParam === "7" && navigation.state === "loading")}
          name="days"
          radius="sm"
          size="xs"
          type="submit"
          value={7}
          variant="default"
        >
          7d
        </Button>
        <Button
          bg={daysParam === "30" ? theme.colors.dark[7] : theme.colors.dark[9]}
          loading={!!(daysParam === "30" && navigation.state === "loading")}
          name="days"
          radius="sm"
          size="xs"
          type="submit"
          value={30}
          variant="default"
        >
          30d
        </Button>
        <Button
          bg={daysParam === "60" ? theme.colors.dark[7] : theme.colors.dark[9]}
          loading={!!(daysParam === "60" && navigation.state === "loading")}
          name="days"
          radius="sm"
          size="xs"
          type="submit"
          value={60}
          variant="default"
        >
          60d
        </Button>
        <Button
          bg={daysParam === "90" ? theme.colors.dark[7] : theme.colors.dark[9]}
          loading={!!(daysParam === "90" && navigation.state === "loading")}
          name="days"
          radius="sm"
          size="xs"
          type="submit"
          value={90}
          variant="default"
        >
          90d
        </Button>
      </Button.Group>
    </Form>
  )
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
            <InsightsDaysPeriodSelector />
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
              <InsightsDaysPeriodSelector />
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
                <InsightsDaysPeriodSelector />
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
                <InsightsDaysPeriodSelector />
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
              <InsightsDaysPeriodSelector />
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
