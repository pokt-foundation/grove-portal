import {
  Card,
  Group,
  Button,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import dayjs from "dayjs"
import invariant from "tiny-invariant"
import { AccountAppsOverview } from "./components/AccountAppsOverview"
import { EmptyState } from "./components/EmptyState"
import OverviewBarChart from "./components/OverviewBarChart"
import { OverviewSparkline } from "./components/OverviewSparkline"
import ErrorView from "~/components/ErrorView"
import TitledCard from "~/components/TitledCard"
import { initDwhClient } from "~/models/dwh/dwh.server"
import { AnalyticsRelaysAggregated } from "~/models/dwh/sdk/models/AnalyticsRelaysAggregated"
import { AnalyticsRelaysDaily } from "~/models/dwh/sdk/models/AnalyticsRelaysDaily"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account, PortalApp } from "~/models/portal/sdk"
import type { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { commify } from "~/utils/formattingUtils"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Account Insights ${seo_title_append}`,
  }
}

type AccountInsightsData = {
  account: Account
  aggregate: AnalyticsRelaysAggregated | undefined
  daily: AnalyticsRelaysDaily[] | undefined
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const dwh = initDwhClient()

  try {
    const { accountId } = params
    invariant(typeof accountId === "string", "AccountId must be a set url parameter")

    const account = await portal.getUserAccount({ accountID: accountId, accepted: true })

    if (!account.getUserAccount) {
      throw new Error(
        `Account ${params.accountId} not found for user ${user.user.portalUserID}`,
      )
    }

    const aggregateReponse = (await dwh.analyticsRelaysAggragatedCategoryGet({
      category: "account_id",
      categoryValue: [accountId],
      from: dayjs().subtract(1, "month").toDate(),
      to: dayjs().subtract(1, "day").toDate(),
    })) as AnalyticsRelaysAggregated

    console.log(aggregateReponse)

    const dailyReponse = (await dwh.analyticsRelaysDailyCategoryGet({
      category: "account_id",
      categoryValue: [accountId],
      from: dayjs().subtract(1, "month").toDate(),
      to: dayjs().subtract(1, "day").toDate(),
    })) as AnalyticsRelaysDaily[]

    console.log(dailyReponse)

    return json<DataStruct<AccountInsightsData>>({
      data: {
        account: account.getUserAccount as Account,
        aggregate: aggregateReponse,
        daily: dailyReponse,
      },
      error: false,
    })
  } catch (error) {
    console.log(error)
    return json<DataStruct<AccountInsightsData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

const InsightsDaysPeriodSelector = () => {
  const theme = useMantineTheme()
  // Static component for now
  return (
    <Button.Group>
      <Button bg={theme.colors.dark[7]} radius="sm" size="xs" variant="default">
        7d
      </Button>
      <Button bg={theme.colors.gray[9]} radius="sm" size="xs" variant="default">
        30d
      </Button>
      <Button bg={theme.colors.gray[9]} radius="sm" size="xs" variant="default">
        60d
      </Button>
      <Button bg={theme.colors.gray[9]} radius="sm" size="xs" variant="default">
        90d
      </Button>
    </Button.Group>
  )
}

export default function AccountInsights() {
  const { data, error, message } = useLoaderData() as DataStruct<AccountInsightsData>

  if (error) {
    return <ErrorView message={message} />
  }

  const { account, aggregate, daily } = data

  const apps = account.portalApps as PortalApp[]
  const insightsApplicationsSelectOptions = [
    { value: "all-apps", label: "All Applications" },
    ...apps.map(({ name, id }) => ({ value: id, label: name })),
  ]

  if (apps.length === 0 || !aggregate || !daily) return <EmptyState />

  const dailyTotalData = daily.map((day) => ({
    date: dayjs(day.from).format("MMM DD"),
    val: day.countTotal ?? 0,
  }))
  const dailyLatencyData = daily.map((day) => ({
    date: dayjs(day.from).format("MMM DD"),
    val: day.avgLatency ?? 0,
  }))
  const dailySuccessData = daily.map((day) => ({
    date: dayjs(day.from).format("MMM DD"),
    val: day.rateSuccess ?? 0,
  }))
  const dailyErrorData = daily.map((day) => ({
    date: dayjs(day.from).format("MMM DD"),
    val: day.rateError ?? 0,
  }))

  return (
    <Stack mb="xl" pt={22} spacing="xl">
      <TitledCard header={() => <Text weight={600}>Portal Overview</Text>}>
        <Card.Section>
          <AccountAppsOverview aggregate={aggregate} />
        </Card.Section>
      </TitledCard>

      <Stack spacing="xl">
        <Group position="apart">
          <Text fw={600}>Insights</Text>
          <Select data={insightsApplicationsSelectOptions} defaultValue="all-apps" />
        </Group>
        <TitledCard
          header={() => (
            <Group position="apart">
              <Text weight={600}>Total Relays</Text>
              <InsightsDaysPeriodSelector />
            </Group>
          )}
        >
          <Card.Section inheritPadding>
            <OverviewSparkline
              sparklineData={dailyTotalData}
              title={commify(aggregate.countTotal ?? 0)}
            />
          </Card.Section>
        </TitledCard>

        <SimpleGrid breakpoints={[{ maxWidth: "md", cols: 1 }]} cols={2}>
          <TitledCard
            header={() => (
              <Group position="apart">
                <Text weight={600}>Average Latency</Text>
                <InsightsDaysPeriodSelector />
              </Group>
            )}
          >
            <Card.Section inheritPadding>
              <OverviewSparkline
                sparklineData={dailyLatencyData}
                title={commify(aggregate.avgLatency ?? 0)}
              />
            </Card.Section>
          </TitledCard>
          <TitledCard
            header={() => (
              <Group position="apart">
                <Text weight={600}>Success Rate</Text>
                <InsightsDaysPeriodSelector />
              </Group>
            )}
          >
            <Card.Section inheritPadding>
              <OverviewSparkline
                sparklineData={dailySuccessData}
                title={commify(aggregate.rateSuccess ?? 0)}
              />
            </Card.Section>
          </TitledCard>
        </SimpleGrid>
        <TitledCard
          header={() => (
            <Group position="apart">
              <Text weight={600}>Error Rate</Text>
              <InsightsDaysPeriodSelector />
            </Group>
          )}
        >
          <Card.Section inheritPadding>
            <OverviewSparkline
              sparklineData={dailyErrorData}
              title={commify(aggregate.rateError ?? 0)}
            />
          </Card.Section>
        </TitledCard>
      </Stack>
    </Stack>
  )
}
