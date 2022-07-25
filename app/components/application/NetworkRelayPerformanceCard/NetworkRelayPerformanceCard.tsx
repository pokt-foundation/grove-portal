import { Grid } from "@mantine/core"
import { Card, links as CardLinks } from "~/components/shared/Card"
import PoweredBy, { links as PoweredByLinks } from "~/components/shared/PoweredBy"
import { LatestBlockAndPerformanceData } from "~/models/portal.server"
import { RelayMetric } from "~/models/relaymeter.server"
import styles from "./styles.css"

export const links = () => {
  return [...CardLinks(), ...PoweredByLinks(), { rel: "stylesheet", href: styles }]
}

interface NetworkSuccessRateCardProps {
  today: RelayMetric
  week: RelayMetric
  month: RelayMetric
}

const numbersFormatter = Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 2,
})

export default function NetworkSuccessRateCard({
  today,
  week,
  month,
}: NetworkSuccessRateCardProps) {
  const rows = [
    {
      description: "Today",
      data: numbersFormatter.format(today.Count),
    },
    {
      description: "Week",
      data: numbersFormatter.format(week.Count),
    },
    {
      description: "Month",
      data: numbersFormatter.format(month.Count),
    },
  ]

  return (
    <div className="pokt-network-relay-performance">
      <Card>
        <div className="pokt-card-header">
          <h3>Relay Performance</h3>
        </div>
        <Grid className="pokt-network-relay-performance-grid">
          {rows.map((row) => (
            <Grid.Col key={row.description} xs={4}>
              <h5>{row.description}</h5>
              <p>{row.data}</p>
            </Grid.Col>
          ))}
        </Grid>
      </Card>
    </div>
  )
}
