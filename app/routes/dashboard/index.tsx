import { LoaderFunction, json, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import type {
  Chain,
  LatestBlockAndPerformanceData,
  SummaryData,
} from "~/models/portal.server"
import {
  getNetworkChains,
  getNetworkLatestBlock,
  getNetworkSummary,
} from "~/models/portal.server"
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
  // chains: Chain[]
  // latestBlock: LatestBlockAndPerformanceData
  // summary: SummaryData
  dailyNetworkRelays: RelayMetric[]
  weeklyNetworkRelays: RelayMetric
}

export const loader: LoaderFunction = async ({ request }) => {
  // const chains = await getNetworkChains(request)
  // const latestBlock = await getNetworkLatestBlock(request)
  // const summary = await getNetworkSummary(request)

  const dailyNetworkRelays = await Promise.all(
    [0, 1, 2, 3, 4, 5, 6].map(async (num) => {
      const from = dayjs()
        .utc()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .subtract(num, "day")
        .format()

      const network = await getNetworkRelays(from, from)
      return network
    }),
  )

  const weeklyNetworkRelays = await getNetworkRelays()

  return json<LoaderData>(
    {
      // chains,
      // latestBlock,
      // summary,
      dailyNetworkRelays,
      weeklyNetworkRelays,
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
            {/* <Grid.Col sm={4}>
              <NetworkSummaryCard
                title="Networks"
                subtitle={String(data.chains.length)}
                imgSrc="/networkSummaryNetworks.png"
              />
            </Grid.Col> */}
          </Grid>
        </section>
        <section>
          <NetworkChartCard dailyRelays={data.dailyNetworkRelays} />
        </section>
        {/* <section>
          <Table
            label="Available Networks"
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
            columns={["Network", "Nodes", "ID", "Status"]}
            paginate
            search
          />
        </section> */}
      </Grid.Col>
      <Grid.Col md={4}>
        <section>
          <h3>Network Success Rate</h3>
          <NetworkSuccessRateCard weeklyRelays={data.weeklyNetworkRelays} />
        </section>
        {/* <section>
          <NetworkLatestBlockCard latestBlock={data.latestBlock} />
        </section>
        <section>
          <NetworkRelayPerformanceCard latestBlock={data.latestBlock} />
        </section> */}
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
