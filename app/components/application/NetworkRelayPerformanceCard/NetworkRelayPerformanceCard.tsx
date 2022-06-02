import { Grid } from "@mantine/core"
import { Card, links as CardLinks } from "~/components/shared/Card"
import PoweredBy, { links as PoweredByLinks } from "~/components/shared/PoweredBy"
import { LatestBlockAndPerformanceData } from "~/models/portal.server"
import styles from "./styles.css"

export const links = () => {
  return [...CardLinks(), ...PoweredByLinks(), { rel: "stylesheet", href: styles }]
}

interface NetworkSuccessRateCardProps {
  latestBlock: LatestBlockAndPerformanceData
}

const numbersFormatter = Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 2,
})

export default function NetworkSuccessRateCard({
  latestBlock,
}: NetworkSuccessRateCardProps) {
  const rows = [
    {
      description: "Today",
      data: numbersFormatter.format(latestBlock.getRelaysPerformance.today_relays),
    },
    {
      description: "Month",
      data: numbersFormatter.format(
        latestBlock.getRelaysPerformance.thirty_day_relays_avg,
      ),
    },
    {
      description: "Max",
      data: numbersFormatter.format(latestBlock.getRelaysPerformance.max_relays),
    },
  ]

  return (
    <div className="pokt-network-relay-performance">
      <Card>
        <h3>Relay Performance</h3>
        <Grid className="pokt-network-relay-performance-grid">
          {rows.map((row) => (
            <Grid.Col key={row.description} xs={4}>
              <h5>{row.description}</h5>
              <p>{row.data}</p>
            </Grid.Col>
          ))}
        </Grid>
        <PoweredBy to="https://poktscan.com/" image="/poktscanLogo.png" alt="Poktscan" />
      </Card>
    </div>
  )
}
