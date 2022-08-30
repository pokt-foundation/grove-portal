import { Grid } from "@mantine/core"
import { LoaderFunction, json, MetaFunction } from "@remix-run/node"
import { useLoaderData, useTransition } from "@remix-run/react"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
import ChainWithImage, {
  links as ChainWithImageLinks,
} from "~/components/application/ChainWithImage"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
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
import UsageChartCard, {
  links as UsageChartCardLinks,
} from "~/components/application/UsageChartCard"
import Loader, { links as LoaderLinks } from "~/components/shared/Loader"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { initIndexerClient } from "~/models/indexer/indexer.server"
import { Block, Order } from "~/models/indexer/sdk"
import { initPortalClient } from "~/models/portal/portal.server"
import { Blockchain } from "~/models/portal/sdk"
import { getRelays, RelayMetric } from "~/models/relaymeter/relaymeter.server"
import styles from "~/styles/dashboard.index.css"
import { dayjs } from "~/utils/dayjs"
import { requireUser } from "~/utils/session.server"
import { getServiceLevelByChain } from "~/utils/chainUtils"

export const links = () => {
  return [
    ...NetworkSummaryCardLinks(),
    ...NetworkLatestBlockCardLinks(),
    ...NetworkSuccessRateCardLinks(),
    ...NetworkRelayPerformanceCardLinks(),
    ...UsageChartCardLinks(),
    ...AdEconomicsForDevsLinks(),
    ...TableLinks(),
    ...ChainWithImageLinks(),
    ...FeedbackCardLinks(),
    ...LoaderLinks(),
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
  blockchains: Blockchain[] | null
  latestBlock: LatestBlockType | null
  dailyNetworkRelaysPerWeek: RelayMetric[]
  dailyNetworkRelays: RelayMetric
  weeklyNetworkRelays: RelayMetric
  monthlyNetworkRelays: RelayMetric
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const blockchainResponse = await portal.blockchains().catch((e) => {
    console.log(e)
  })

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
      return await getRelays("network", day, day)
    }),
  )

  // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one full day
  const today = dayjs().utc().hour(0).minute(0).second(0).millisecond(0).format()
  const week = dayjs()
    .utc()
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .subtract(6, "day")
    .format()
  const month = dayjs()
    .utc()
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .subtract(1, "month")
    .format()
  const dailyNetworkRelays = await getRelays("network", today, today)
  const weeklyNetworkRelays = await getRelays("network", week, today)
  const monthlyNetworkRelays = await getRelays("network", month, today)

  return json<LoaderData>(
    {
      blockchains: blockchainResponse
        ? (blockchainResponse.blockchains.filter(
            (chain) => chain !== null,
          ) as Blockchain[])
        : null,
      latestBlock,
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
  const {
    blockchains,
    dailyNetworkRelaysPerWeek,
    dailyNetworkRelays,
    monthlyNetworkRelays,
    weeklyNetworkRelays,
    latestBlock,
  } = useLoaderData() as LoaderData
  const { state } = useTransition()
  return (
    <>
      {state === "loading" && <Loader />}
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
                  subtitle="2000+"
                  title="Apps Staked"
                />
              </Grid.Col>
              <Grid.Col sm={4}>
                <NetworkSummaryCard
                  imgSrc="/networkSummaryNetworks.png"
                  subtitle={String(blockchains ? blockchains.length : 0)}
                  title="Networks"
                />
              </Grid.Col>
            </Grid>
          </section>
          <section>
            <UsageChartCard relays={dailyNetworkRelaysPerWeek} />
          </section>
          {blockchains && (
            <section>
              <Table
                paginate
                search
                columns={["Network", "ID", "Status"]}
                data={blockchains.map((chain) => ({
                  id: chain.id,
                  network: {
                    value: `${chain.description}`,
                    element: <ChainWithImage chain={chain.description} />,
                  },
                  chainId: chain.id,
                  status: getServiceLevelByChain(chain.id),
                }))}
                label="Available Networks"
              />
            </section>
          )}
        </Grid.Col>
        <Grid.Col md={4}>
          <section>
            <h3>Network Success Rate</h3>
            <NetworkSuccessRateCard relays={weeklyNetworkRelays} />
          </section>
          {latestBlock && (
            <section>
              <NetworkLatestBlockCard latestBlock={latestBlock} />
            </section>
          )}
          <section>
            <NetworkRelayPerformanceCard
              month={monthlyNetworkRelays}
              today={dailyNetworkRelays}
              week={weeklyNetworkRelays}
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
    </>
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
