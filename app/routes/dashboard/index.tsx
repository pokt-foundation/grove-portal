import { LoaderFunction, json, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import NetworkSummaryCard, {
  links as NetworkSummaryCardLinks,
} from "~/components/application/NetworkSummaryCard"
import { Grid } from "@mantine/core"
import NetworkSuccessRateCard, {
  links as NetworkSuccessRateCardLinks,
} from "~/components/application/NetworkSuccessRateCard"
import NetworkLatestBlockCard, {
  links as NetworkLatestBlockCardLinks,
} from "~/components/application/NetworkLatestBlockCard"
import NetworkChartCard, {
  links as NetworkChartCardLinks,
} from "~/components/application/NetworkChartCard"
import NetworkRelayPerformanceCard, {
  links as NetworkRelayPerformanceCardLinks,
} from "~/components/application/NetworkRelayPerformanceCard"
import ChainWithImage, {
  links as ChainWithImageLinks,
} from "~/components/application/ChainWithImage"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { getServiceLevelByChain } from "~/utils/chainUtils"
import styles from "~/styles/dashboard.index.css"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
import { getNetworkRelays, RelayMetric } from "~/models/relaymeter.server"
import { dayjs } from "~/utils/dayjs"
import { initPortalClient } from "~/models/portal/portal.server"
import { BlockchainsQuery } from "~/models/portal/sdk"
import { initIndexerClient } from "~/models/indexer/indexer.server"
import { Order, QueryBlocksQuery } from "~/models/indexer/sdk"

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

type LoaderData = {
  blockchains: BlockchainsQuery["blockchains"]
  latestBlock: QueryBlocksQuery["queryBlocks"]
  // summary: SummaryData
  dailyNetworkRelaysPerWeek: RelayMetric[]
  dailyNetworkRelays: RelayMetric
  weeklyNetworkRelays: RelayMetric
  monthlyNetworkRelays: RelayMetric
}

export const loader: LoaderFunction = async ({ request }) => {
  const portal = initPortalClient()
  const { blockchains } = await portal.blockchains({ active: true })

  const indexer = initIndexerClient()
  const { queryBlocks } = await indexer.queryBlocks({
    page: 1,
    perPage: 1,
    order: Order.Desc,
  })

  const dailyNetworkRelaysPerWeek = await Promise.all(
    [0, 1, 2, 3, 4, 5, 6].map(async (num) => {
      const from = dayjs()
        .utc()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .subtract(num, "day")
        .format()

      // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one day
      const network = await getNetworkRelays(from, from)
      return network
    }),
  )

  // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one day
  const fromToday = dayjs().utc().hour(0).minute(0).second(0).millisecond(0).format()
  const dailyNetworkRelays = await getNetworkRelays(fromToday, fromToday)

  const weeklyNetworkRelays = await getNetworkRelays()

  const fromMonth = dayjs()
    .utc()
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .subtract(1, "month")
    .format()
  const toMonth = dayjs().utc().hour(0).minute(0).second(0).millisecond(0).format()
  const monthlyNetworkRelays = await getNetworkRelays(fromMonth, toMonth)

  return json<LoaderData>(
    {
      blockchains,
      latestBlock: queryBlocks,
      // summary,
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
  const latestBlock = data.latestBlock?.blocks![0]
  return (
    <Grid gutter={32}>
      <Grid.Col md={8}>
        <section>
          <h3>Network Summary</h3>
          <Grid gutter={32}>
            <Grid.Col sm={4}>
              <NetworkSummaryCard
                title="Nodes Staked"
                subtitle="7000+"
                imgSrc="/networkSummaryNodes.png"
              />
            </Grid.Col>
            {/* <Grid.Col sm={4}>
              <NetworkSummaryCard
                title="Apps Staked"
                subtitle={String(data.summary.appsStaked)}
                imgSrc="/networkSummaryApps.png"
              />
            </Grid.Col> */}
            <Grid.Col sm={4}>
              <NetworkSummaryCard
                title="Networks"
                subtitle={String(data.blockchains.length)}
                imgSrc="/networkSummaryNetworks.png"
              />
            </Grid.Col>
          </Grid>
        </section>
        <section>
          <NetworkChartCard dailyRelays={data.dailyNetworkRelaysPerWeek} />
        </section>
        <section>
          <Table
            label="Available Networks"
            data={data.blockchains.map((chain) => {
              if (!chain) {
                return {
                  id: 1,
                  network: "",
                  chainId: "",
                  status: "",
                }
              }
              return {
                id: chain.id,
                network: {
                  value: chain.description,
                  element: <ChainWithImage chain={chain.description} />,
                },
                chainId: chain.id,
                status: getServiceLevelByChain(chain.id),
              }
            })}
            columns={["Network", "ID", "Status"]}
            paginate
            search
          />
        </section>
      </Grid.Col>
      <Grid.Col md={4}>
        <section>
          <h3>Network Success Rate</h3>
          <NetworkSuccessRateCard weeklyRelays={data.weeklyNetworkRelays} />
        </section>
        <section>
          <NetworkLatestBlockCard latestBlock={latestBlock} />
        </section>
        <section>
          <NetworkRelayPerformanceCard
            today={data.dailyNetworkRelays}
            week={data.weeklyNetworkRelays}
            month={data.monthlyNetworkRelays}
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
