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
import { useRouteLoaderData } from "@remix-run/react"
import dayjs from "dayjs"
import invariant from "tiny-invariant"
import { AccountIdLoaderData } from "../account.$accountId/route"
import { AccountAppsOverview } from "./components/AccountAppsOverview"
import { EmptyState } from "./components/EmptyState"
import OverviewBarChart from "./components/OverviewBarChart"
import { OverviewSparkline } from "./components/OverviewSparkline"
import ErrorView from "~/components/ErrorView"
import TitledCard from "~/components/TitledCard"
import { initDwhClient } from "~/models/dwh/dwh.server"
import { AnalyticsRelaysTransactions, JSONApiResponse } from "~/models/dwh/sdk"
import { initPortalClient } from "~/models/portal/portal.server"
import { PortalApp } from "~/models/portal/sdk"
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
  relays: AnalyticsRelaysTransactions[] | undefined
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const dwh = initDwhClient()

  try {
    const { accountId } = params
    invariant(typeof accountId === "string", "AccountId must be a set url parameter")

    const account = await portal.getUserAccount({ accountID: accountId })

    if (!account.getUserAccount) {
      throw new Error(
        `Account ${params.accountId} not found for user ${user.user.portalUserID}`,
      )
    }

    const apps = (account.getUserAccount.portalApps
      ?.filter((app) => !app?.deleted)
      .map((app) => app?.id) as string[]) ?? [""]

    const relays = (await dwh.analyticsRelaysCategoryGetRaw({
      accountId: [accountId],
      category: "transactions",
      from: dayjs().subtract(1, "month").toDate(),
      to: dayjs().subtract(1, "day").toDate(),
      chainId: ["0003", "0009"],
      chainMethod: ["eth_getBlockByNumber", "eth_blockNumber", "eth_getLogs"],
      portalApplicationId: apps,
    })) as JSONApiResponse<AnalyticsRelaysTransactions>

    console.log({ relays })
    const body = await relays.raw.json()
    console.log(body.Data)

    return json<DataStruct<AccountInsightsData>>({
      data: {
        relays: body.Data,
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

export default function Account() {
  const { data, error, message } = useRouteLoaderData(
    "routes/account.$accountId",
  ) as DataStruct<AccountIdLoaderData>

  if (error) {
    return <ErrorView message={message} />
  }

  const { account } = data

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
          <AccountAppsOverview />
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
