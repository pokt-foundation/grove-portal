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
import { AnalyticsRelaysTransactions, JSONApiResponse } from "~/models/dwh/sdk"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account, PortalApp } from "~/models/portal/sdk"
import type { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Account Insights ${seo_title_append}`,
  }
}

type AccountInsightsData = {
  account: Account
  aggregate: AnalyticsRelaysTransactions[] | undefined
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

    const dwhReponse = await dwh.analyticsRelaysCategoryQueryTypeGroupByGet({
      accountId: [accountId],
      category: "transactions",
      queryType: "full",
      groupBy: "none",
      from: dayjs().subtract(1, "month").toDate(),
      to: dayjs().subtract(1, "day").toDate(),
    })

    console.log(dwhReponse)

    // console.log({ relays })
    // const body = await dwhReponse.json()
    // console.log(body.Data)

    // const aggregatedRelays = body.Data.reduce(
    //   (prev: any, curr: any) => {
    //     let avg_latency = prev.avg_latency + curr.avg_roundtrip_time
    //     let count_total = prev.count_total + curr.cnt
    //     let curr_count_error = (curr.cnt * curr.error_rate) / 100
    //     let count_error = prev.count_error + curr_count_error

    //     return {
    //       from: curr.from,
    //       to: curr.to,
    //       avg_latency,
    //       count_total,
    //       count_error,
    //     }
    //   },
    //   {
    //     from: "",
    //     to: "",
    //     avg_latency: 0,
    //     count_total: 0,
    //     count_error: 0,
    //   },
    // )

    return json<DataStruct<AccountInsightsData>>({
      data: {
        account: account.getUserAccount as Account,
        // aggregate: {
        //   ...aggregatedRelays,
        //   count_error: Number(aggregatedRelays.count_error).toFixed(0),
        //   avg_latency: `${Number(aggregatedRelays.avg_latency / body.Data.length).toFixed(
        //     2,
        //   )} ms`,
        //   rate_success: `${Number(
        //     ((aggregatedRelays.count_total - aggregatedRelays.count_error) /
        //       aggregatedRelays.count_total) *
        //       100,
        //   ).toFixed(2)}%`,
        //   rate_error: `${Number(
        //     (aggregatedRelays.count_error / aggregatedRelays.count_total) * 100,
        //   ).toFixed(2)}%`,
        // },
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

  const { account, aggregate } = data

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

  const apps = account.portalApps as PortalApp[]

  const insightsApplicationsSelectOptions = [
    { value: "all-apps", label: "All Applications" },
    ...apps.map(({ name, id }) => ({ value: id, label: name })),
  ]

  if (apps.length === 0) return <EmptyState />

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
            <OverviewSparkline sparklineData={sparklineData} title="542,499" />
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
              <OverviewSparkline sparklineData={sparklineData} title="542,499" />
            </Card.Section>
          </TitledCard>
          <TitledCard
            header={() => (
              <Group position="apart">
                <Text weight={600}>Success %</Text>
                <InsightsDaysPeriodSelector />
              </Group>
            )}
          >
            <Card.Section inheritPadding>
              <OverviewSparkline sparklineData={sparklineData} title="542,499" />
            </Card.Section>
          </TitledCard>
        </SimpleGrid>
        <TitledCard
          header={() => (
            <Group position="apart">
              <Text weight={600}>Total Errors</Text>
              <InsightsDaysPeriodSelector />
            </Group>
          )}
        >
          <Card.Section inheritPadding>
            <OverviewBarChart title="542,499" />
          </Card.Section>
        </TitledCard>
      </Stack>
    </Stack>
  )
}
