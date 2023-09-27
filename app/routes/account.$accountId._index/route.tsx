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
import { MetaFunction } from "@remix-run/node"
import { useRouteLoaderData } from "@remix-run/react"
import { AccountIdLoaderData } from "../account.$accountId/route"
import { AccountAppsOverview } from "./components/AccountAppsOverview"
import { EmptyState } from "./components/EmptyState"
import OverviewBarChart from "./components/OverviewBarChart"
import { OverviewSparkline } from "./components/OverviewSparkline"
import ErrorView from "~/components/ErrorView"
import TitledCard from "~/components/TitledCard"
import { PortalApp } from "~/models/portal/sdk"
import type { DataStruct } from "~/types/global"
import { seo_title_append } from "~/utils/seo"

export const meta: MetaFunction = () => {
  return {
    title: `Account Insights ${seo_title_append}`,
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
