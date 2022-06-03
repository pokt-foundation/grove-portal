import { LoaderFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useTheme } from "@pokt-foundation/ui"
import type {
  Chain,
  DailyRelayBucket,
  LatestBlockAndPerformanceData,
  NetworkRelayStats,
  SummaryData,
} from "~/models/portal.server"
import {
  getNetworkChains,
  getNetworkDailyRelays,
  getNetworkLatestBlock,
  getNetworkSummary,
  getNetworkWeeklyStats,
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
import {
  Advertisement,
  links as AdvertisementLinks,
} from "~/components/shared/Advertisement"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { getServiceLevelByChain } from "~/utils/chainUtils"
import React from "react"
import { getImageForChain } from "~/utils/known-chains/known-chains"
import styles from "~/styles/dashboard.index.css"

export const links = () => {
  return [
    ...NetworkSummaryCardLinks(),
    ...NetworkLatestBlockCardLinks(),
    ...NetworkSuccessRateCardLinks(),
    ...NetworkChartCardLinks(),
    ...NetworkRelayPerformanceCardLinks(),
    ...AdvertisementLinks(),
    ...TableLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

type LoaderData = {
  chains: Chain[]
  dailyRelays: DailyRelayBucket[]
  latestBlock: LatestBlockAndPerformanceData
  summary: SummaryData
  weeklyStats: NetworkRelayStats
}

export const loader: LoaderFunction = async ({ request }) => {
  const chains = await getNetworkChains(request)
  const dailyRelays = await getNetworkDailyRelays(request)
  const latestBlock = await getNetworkLatestBlock(request)
  const summary = await getNetworkSummary(request)
  const weeklyStats = await getNetworkWeeklyStats(request)

  return json<LoaderData>(
    {
      chains,
      dailyRelays,
      latestBlock,
      summary,
      weeklyStats,
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
  const theme = useTheme()
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
            <Grid.Col sm={4}>
              <NetworkSummaryCard
                title="Apps Staked"
                subtitle={String(data.summary.appsStaked)}
                imgSrc="/networkSummaryApps.png"
              />
            </Grid.Col>
            <Grid.Col sm={4}>
              <NetworkSummaryCard
                title="Networks"
                subtitle={String(data.chains.length)}
                imgSrc="/networkSummaryNetworks.png"
              />
            </Grid.Col>
          </Grid>
        </section>
        <section>
          <NetworkChartCard
            dailyRelays={data.dailyRelays}
            weeklyStats={data.weeklyStats}
          />
        </section>
        <section>
          <Table
            label="Available Networks"
            data={data.chains.map((chain) => ({
              id: chain.id,
              network: {
                value: chain.description,
                element: (
                  <span className="pokt-chain-with-image">
                    {getImageForChain(chain.description) && (
                      <img
                        src={getImageForChain(chain.description)}
                        alt={chain.description}
                      />
                    )}
                    <p>{chain.description}</p>
                  </span>
                ),
              },
              apps: chain.appCount ? String(chain.appCount) : "0",
              chainId: chain.id,
              status: getServiceLevelByChain(chain.id),
            }))}
            columns={["Network", "Nodes", "ID", "Status"]}
            paginate
            search
          />
        </section>
      </Grid.Col>
      <Grid.Col md={4}>
        <section>
          <h3>Network Success Rate</h3>
          <NetworkSuccessRateCard weeklyStats={data.weeklyStats} />
        </section>
        <section>
          <NetworkLatestBlockCard latestBlock={data.latestBlock} />
        </section>
        <section>
          <NetworkRelayPerformanceCard latestBlock={data.latestBlock} />
        </section>
        <section>
          <Advertisement
            styles={{
              backgroundImage: `url('/economicsDevs.png'), linear-gradient(180deg, ${theme.surfaceGradient1} 0%, ${theme.surfaceGradient2} 100%)`,
            }}
            content={
              <h3>
                Pocket Economics for <span>App Developers</span>
              </h3>
            }
            action={
              <a
                href="https://medium.com/pocket-network/pocket-economics-for-app-developers-487a6ce290c2"
                className="pokt-ad-action"
              >
                Read More
              </a>
            }
          />
        </section>
        {/* <section>
            <FeedbackBox />
          </section> */}
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
