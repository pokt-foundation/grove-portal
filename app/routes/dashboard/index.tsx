import { Grid } from "@mantine/core"
import { LoaderFunction, json, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
import ChainWithImage, {
  links as ChainWithImageLinks,
} from "~/components/application/ChainWithImage"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import NetworkChartCard, {
  links as NetworkChartCardLinks,
} from "~/components/application/NetworkChartCard"
import NetworkLatestBlockCard, {
  links as NetworkLatestBlockCardLinks,
} from "~/components/application/NetworkLatestBlockCard"
import NetworkRelayPerformanceCard, {
  links as NetworkRelayPerformanceCardLinks,
} from "~/components/application/NetworkRelayPerformanceCard"
import NetworkSuccessRateCard, {
  links as NetworkSuccessRateCardLinks,
} from "~/components/application/NetworkSuccessRateCard"
import NetworkSummaryCard, {
  links as NetworkSummaryCardLinks,
} from "~/components/application/NetworkSummaryCard"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { initIndexerClient } from "~/models/indexer/indexer.server"
import { Block, Order } from "~/models/indexer/sdk"
import {
  getNetworkChains,
  getNetworkDailyRelays,
  getNetworkSummary,
  getNetworkWeeklyStats,
} from "~/models/portal.server"
import type {
  Chain,
  DailyRelayBucket,
  NetworkRelayStats,
  SummaryData,
} from "~/models/portal.server"
import { getNetworkRelays, RelayMetric } from "~/models/relaymeter.server"
import styles from "~/styles/dashboard.index.css"
import { getServiceLevelByChain } from "~/utils/chainUtils"
import { dayjs } from "~/utils/dayjs"

export const links = () => {
  return [
    ...NetworkSummaryCardLinks(),
    ...NetworkLatestBlockCardLinks(),
    ...NetworkSuccessRateCardLinks(),
    ...NetworkChartCardLinks(),
    ...NetworkRelayPerformanceCardLinks(),
    ...AdEconomicsForDevsLinks(),
    ...TableLinks(),
    ...ChainWithImageLinks(),
    ...FeedbackCardLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export const meta: MetaFunction = () => {
  return {
    title: "Dashboard Home",
  }
}

export type LatestBlockType = Block & {
  // took: number
  total_accounts: number
  total_apps: number
  total_nodes: number
  // total_relays_completed: number
  total_txs: number
}

type LoaderData = {
  chains: Chain[]
  dailyRelays: DailyRelayBucket[]
  latestBlock: LatestBlockType | null
  summary: SummaryData
  weeklyStats: NetworkRelayStats
  dailyNetworkRelaysPerWeek: RelayMetric[]
  dailyNetworkRelays: RelayMetric
  weeklyNetworkRelays: RelayMetric
  monthlyNetworkRelays: RelayMetric
}

export const loader: LoaderFunction = async ({ request }) => {
  const chains = await getNetworkChains(request)
  const dailyRelays = await getNetworkDailyRelays(request)
  const summary = await getNetworkSummary(request)
  const weeklyStats = await getNetworkWeeklyStats(request)

  const indexer = initIndexerClient()
  const { queryBlocks } = await indexer.queryBlocks({
    page: 1,
    perPage: 1,
    order: Order.Desc,
  })
  let latestBlock = null

  if (queryBlocks?.blocks) {
    latestBlock = queryBlocks.blocks[0]
    const height = Number(latestBlock?.height)
    const { queryAccounts } = await indexer.queryAccounts({ height: height })
    const { queryApps } = await indexer.queryApps({ height: height })
    const { queryNodes } = await indexer.queryNodes({ height: height })
    const { queryTransactionsByHeight } = await indexer.queryTransactionsByHeight({
      height: height,
    })
    latestBlock = {
      ...latestBlock,
      total_accounts: Number(queryAccounts?.totalCount),
      total_apps: Number(queryApps?.totalCount),
      total_nodes: Number(queryNodes?.totalCount),
      total_txs: Number(queryTransactionsByHeight?.totalCount),
    } as LatestBlockType
  }
  const dailyNetworkRelaysPerWeek = await Promise.all(
    [0, 1, 2, 3, 4, 5, 6].map(async (num) => {
      const day = dayjs()
        .utc()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .subtract(num, "day")
        .format()

      // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one full day
      return await getNetworkRelays(day, day)
    }),
  )

  // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one full day
  const today = dayjs().utc().hour(0).minute(0).second(0).millisecond(0).format()
  const month = dayjs()
    .utc()
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .subtract(1, "month")
    .format()
  const dailyNetworkRelays = await getNetworkRelays(today, today)
  const weeklyNetworkRelays = await getNetworkRelays()
  const monthlyNetworkRelays = await getNetworkRelays(month, today)

  return json<LoaderData>(
    {
      chains,
      dailyRelays,
      latestBlock,
      summary,
      weeklyStats,
      dailyNetworkRelaysPerWeek,
      dailyNetworkRelays,
      weeklyNetworkRelays,
      monthlyNetworkRelays,
    },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

export default function Index() {
  const data = useLoaderData() as LoaderData
  return (
    <Grid gutter={32}>
      <Grid.Col md={8}>
        <section>
          <h3>Network Summary</h3>
          <Grid gutter={32}>
            <Grid.Col sm={4}>
              <NetworkSummaryCard
                imgSrc="/networkSummaryNodes.png"
                subtitle="7000+"
                title="Nodes Staked"
              />
            </Grid.Col>
            <Grid.Col sm={4}>
              <NetworkSummaryCard
                imgSrc="/networkSummaryApps.png"
                subtitle={String(data.summary.appsStaked)}
                title="Apps Staked"
              />
            </Grid.Col>
            <Grid.Col sm={4}>
              <NetworkSummaryCard
                imgSrc="/networkSummaryNetworks.png"
                subtitle={String(data.chains.length)}
                title="Networks"
              />
            </Grid.Col>
          </Grid>
        </section>
        <section>
          <NetworkChartCard relays={data.dailyNetworkRelaysPerWeek} />
        </section>
        <section>
          <Table
            paginate
            search
            columns={["Network", "Nodes", "ID", "Status"]}
            data={data.chains.map((chain) => ({
              id: chain.id,
              network: {
                value: chain.description,
                element: <ChainWithImage chain={chain.description} />,
              },
              apps: chain.appCount ? String(chain.appCount) : "0",
              chainId: chain.id,
              status: getServiceLevelByChain(chain.id),
            }))}
            label="Available Networks"
          />
        </section>
      </Grid.Col>
      <Grid.Col md={4}>
        <section>
          <h3>Network Success Rate</h3>
          <NetworkSuccessRateCard relays={data.weeklyNetworkRelays} />
        </section>
        {data.latestBlock && (
          <section>
            <NetworkLatestBlockCard latestBlock={data.latestBlock} />
          </section>
        )}
        <section>
          <NetworkRelayPerformanceCard
            month={data.monthlyNetworkRelays}
            today={data.dailyNetworkRelays}
            week={data.weeklyNetworkRelays}
          />
        </section>
        <section>
          <AdEconomicsForDevs />
        </section>
        <section>
          <FeedbackCard />
        </section>
      </Grid.Col>
    </Grid>
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h3>{error.message}</h3>
      <p>{error.stack}</p>
    </div>
  )
}
