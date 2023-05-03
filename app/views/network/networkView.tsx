import { Card, Grid, Text } from "@pokt-foundation/pocket-blocks"
import { Transition } from "@remix-run/react/dist/transition"
import styles from "./styles.css"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import NetworkPoktScanLatestBlockCard, {
  links as NetworkPoktScanLatestBlockCardLinks,
} from "~/components/application/NetworkPoktScanLatestBlockCard"
import NetworkRelayPerformanceCard, {
  links as NetworkRelayPerformanceCardLinks,
  numbersFormatter,
} from "~/components/application/NetworkRelayPerformanceCard"
import NetworkSummaryCard, {
  links as NetworkSummaryCardLinks,
} from "~/components/application/NetworkSummaryCard"
import UsageChartCard, {
  links as UsageChartCardLinks,
} from "~/components/application/UsageChartCard"
import Loader, { links as LoaderLinks } from "~/components/shared/Loader"
import MaintenanceNotification, {
  links as MaintenanceNotificationLinks,
} from "~/components/shared/MaintenanceNotification/MaintenanceNotification"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { NetworkLoaderData } from "~/routes/network"
import { getRequiredClientEnvVar } from "~/utils/environment"

export const links = () => {
  return [
    ...NetworkSummaryCardLinks(),
    ...NetworkPoktScanLatestBlockCardLinks(),
    ...NetworkRelayPerformanceCardLinks(),
    ...UsageChartCardLinks(),
    ...TableLinks(),
    ...FeedbackCardLinks(),
    ...LoaderLinks(),
    ...MaintenanceNotificationLinks(),
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
  poktscanChains,
  state,
  weeklyNetworkRelays,
}: NetworkViewProps) {
  return (
    <>
      {state === "loading" && <Loader />}
      <Grid gutter={32}>
        <Grid.Col>
          <MaintenanceNotification
            maintenanceMode={getRequiredClientEnvVar("FLAG_MAINTENANCE_MODE")}
          />
        </Grid.Col>
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
              <Card>
                <Table
                  paginate
                  search
                  columns={["Network", "ID", "Avg. Daily Relays"]}
                  data={blockchains.map((chain) => ({
                    id: chain.id,
                    network: {
                      value: `${chain.description}`,
                      element: <Text m={0}>{chain.description}</Text>,
                    },
                    chainId: chain.id,
                    traffic: numbersFormatter.format(
                      poktscanChains?.getChainsTotals.chains?.find(
                        (c) => c && c.chain === chain.id,
                      )?.total_relays / 30,
                    ),
                  }))}
                  label="Available Networks"
                />
              </Card>
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
