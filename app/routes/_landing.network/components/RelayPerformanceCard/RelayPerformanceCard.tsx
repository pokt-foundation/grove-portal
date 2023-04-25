import { Grid } from "@pokt-foundation/pocket-blocks"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/Card"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface NetworkSuccessRateCardProps {
  today: RelayMetric
  week: RelayMetric
  month: RelayMetric
}

export const numbersFormatter = Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 2,
})

export default function RelayPerformanceCard({
  today,
  week,
  month,
}: NetworkSuccessRateCardProps) {
  const rows = [
    {
      description: "Today",
      data: numbersFormatter.format(today.Count.Success + today.Count.Failure),
    },
    {
      description: "Week",
      data: numbersFormatter.format(week.Count.Success + week.Count.Failure),
    },
    {
      description: "Month",
      data: numbersFormatter.format(month.Count.Success + month.Count.Failure),
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
