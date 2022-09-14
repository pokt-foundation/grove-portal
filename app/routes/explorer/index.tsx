import { Button, Grid, Group } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, json, MetaFunction } from "@remix-run/node"
import { Link, useLoaderData, useTransition } from "@remix-run/react"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
import ChainWithImage, {
  links as ChainWithImageLinks,
} from "~/components/application/ChainWithImage"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import UsageChartCard, {
  links as UsageChartCardLinks,
} from "~/components/application/UsageChartCard"
import NetworkPoktScanLatestBlockCard, {
  links as NetworkPoktScanLatestBlockCardLinks,
} from "~/components/explorer/NetworkPoktScanLatestBlockCard"
import NetworkRelayPerformanceCard, {
  links as NetworkRelayPerformanceCardLinks,
} from "~/components/explorer/NetworkRelayPerformanceCard"
import NetworkSuccessRateCard, {
  links as NetworkSuccessRateCardLinks,
} from "~/components/explorer/NetworkSuccessRateCard"
import NetworkSummaryCard, {
  links as NetworkSummaryCardLinks,
} from "~/components/explorer/NetworkSummaryCard"
import Search, { links as SearchLinks } from "~/components/explorer/Search"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Loader, { links as LoaderLinks } from "~/components/shared/Loader"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { initIndexerClient } from "~/models/indexer/indexer.server"
import { Block, Order, QueryTransactionsQuery } from "~/models/indexer/sdk"
import { initPoktScanClient } from "~/models/poktscan/poktscan.server"
import { GetHighestBlockQuery } from "~/models/poktscan/sdk"
import { initPortalClient } from "~/models/portal/portal.server"
import { Blockchain } from "~/models/portal/sdk"
import {
  getRelays,
  getRelaysPerWeek,
  RelayMetric,
} from "~/models/relaymeter/relaymeter.server"
import styles from "~/styles/dashboard.index.css"
import { getServiceLevelByChain } from "~/utils/chainUtils"
import { dayjs } from "~/utils/dayjs"
import { requireUser } from "~/utils/session.server"

export const links = () => {
  return [
    ...NetworkSummaryCardLinks(),
    ...NetworkPoktScanLatestBlockCardLinks(),
    // ...NetworkLatestBlockCardLinks(),
    ...NetworkSuccessRateCardLinks(),
    ...NetworkRelayPerformanceCardLinks(),
    ...UsageChartCardLinks(),
    ...AdEconomicsForDevsLinks(),
    ...TableLinks(),
    ...ChainWithImageLinks(),
    ...FeedbackCardLinks(),
    ...LoaderLinks(),
    ...SearchLinks(),
    ...CardLinks(),
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
  dailyNetworkRelaysPerWeek: RelayMetric[]
  dailyNetworkRelays: RelayMetric
  weeklyNetworkRelays: RelayMetric
  monthlyNetworkRelays: RelayMetric
  poktscanLatestBlock: GetHighestBlockQuery
  transactions: QueryTransactionsQuery["queryTransactions"]
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const blockchainResponse = await portal.blockchains({ active: true }).catch((e) => {
    console.log(e)
  })

  const poktscan = initPoktScanClient()
  const poktscanLatestBlock = await poktscan.getHighestBlock()

  const dailyNetworkRelaysPerWeek = await getRelaysPerWeek("network")
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

  const indexer = initIndexerClient()
  const transactions = await indexer.queryTransactions({
    page: 1,
    perPage: 5,
  })

  return json<LoaderData>(
    {
      blockchains: blockchainResponse
        ? (blockchainResponse.blockchains.filter(
            (chain) => chain !== null,
          ) as Blockchain[])
        : null,
      // latestBlock,
      dailyNetworkRelaysPerWeek,
      dailyNetworkRelays,
      weeklyNetworkRelays,
      monthlyNetworkRelays,
      poktscanLatestBlock,
      transactions: transactions.queryTransactions,
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
    poktscanLatestBlock,
    transactions,
  } = useLoaderData() as LoaderData
  const { state } = useTransition()
  return (
    <>
      {state === "loading" && <Loader />}
      <Grid gutter={32}>
        <Grid.Col md={8}>
          {/* <section>
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
          </section> */}
          <section>
            <h3>Network Summary</h3>
            <Grid gutter={32}>
              <Grid.Col sm={6}>
                <NetworkSuccessRateCard relays={weeklyNetworkRelays} />
              </Grid.Col>
              <Grid.Col sm={6}>
                <NetworkRelayPerformanceCard
                  month={monthlyNetworkRelays}
                  today={dailyNetworkRelays}
                  week={weeklyNetworkRelays}
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
                label={`${blockchains.length} Available Networks`}
              />
            </section>
          )}
        </Grid.Col>
        <Grid.Col md={4}>
          <section>
            <h3>Explore Network</h3>
            <Search />
          </section>
          {poktscanLatestBlock && (
            <section>
              <NetworkPoktScanLatestBlockCard latestBlock={poktscanLatestBlock} />
            </section>
          )}
          <section>
            {transactions && (
              <Card>
                <div className="pokt-card-header">
                  <h3>Latest Transactions</h3>
                </div>
                <div>
                  {transactions.transactions?.map((transaction) => (
                    <Group key={transaction?.hash} align="center" position="apart">
                      <p>
                        <Link to={`transactions/${transaction?.hash}`}>
                          {transaction?.hash.slice(0, 10)}...
                        </Link>
                      </p>
                      <p>
                        <Link to={`blocks/${transaction?.height}`}>
                          {transaction?.height}
                        </Link>
                      </p>
                    </Group>
                  ))}
                </div>
                <Button component={Link} to="transactions">
                  View All
                </Button>
              </Card>
            )}
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
