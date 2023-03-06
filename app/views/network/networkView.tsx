import { Grid } from "@pokt-foundation/pocket-blocks"
import { Transition } from "@remix-run/react/dist/transition"
import styles from "./styles.css"
import ChainWithImage, {
  links as ChainWithImageLinks,
} from "~/components/application/ChainWithImage"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import NetworkPoktScanLatestBlockCard, {
  links as NetworkPoktScanLatestBlockCardLinks,
} from "~/components/application/NetworkPoktScanLatestBlockCard"
import NetworkRelayPerformanceCard, {
  links as NetworkRelayPerformanceCardLinks,
} from "~/components/application/NetworkRelayPerformanceCard"
// import NetworkSuccessRateCard, {
//   links as NetworkSuccessRateCardLinks,
// } from "~/components/application/NetworkSuccessRateCard"
import NetworkSummaryCard, {
  links as NetworkSummaryCardLinks,
} from "~/components/application/NetworkSummaryCard"
import UsageChartCard, {
  links as UsageChartCardLinks,
} from "~/components/application/UsageChartCard"
import Loader, { links as LoaderLinks } from "~/components/shared/Loader"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { NetworkLoaderData } from "~/routes/network"
import { getServiceLevelByChain } from "~/utils/chainUtils"

export const links = () => {
  return [
    ...NetworkSummaryCardLinks(),
    ...NetworkPoktScanLatestBlockCardLinks(),
    // ...NetworkSuccessRateCardLinks(),
    ...NetworkRelayPerformanceCardLinks(),
    ...UsageChartCardLinks(),
    ...TableLinks(),
    ...ChainWithImageLinks(),
    ...FeedbackCardLinks(),
    ...LoaderLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

type NetworkViewProps = NetworkLoaderData & {
  state: Transition["state"]
}

export default function NetworkView({
  blockchains,
  dailyNetworkRelays,
  dailyNetworkRelaysPerWeek,
  monthlyNetworkRelays,
  poktscanLatestBlock,
  state,
  weeklyNetworkRelays,
}: NetworkViewProps) {
  return (
    <>
      {state === "loading" && <Loader />}
      <Grid gutter={32}>
        <Grid.Col md={8}>
          <section>
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
            <NetworkRelayPerformanceCard
              month={monthlyNetworkRelays}
              today={dailyNetworkRelays}
              week={weeklyNetworkRelays}
            />
          </section>
          {poktscanLatestBlock && (
            <section>
              <NetworkPoktScanLatestBlockCard latestBlock={poktscanLatestBlock} />
            </section>
          )}
          <section>
            <FeedbackCard />
          </section>
        </Grid.Col>
      </Grid>
    </>
  )
}
