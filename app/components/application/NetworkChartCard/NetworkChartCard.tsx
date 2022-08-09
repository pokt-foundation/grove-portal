import { LineChart, useTheme } from "@pokt-foundation/ui"
import { formatDailyRelaysForGraphing } from "./formatDailyRelaysForGraphing"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { RelayMetric } from "~/models/relaymeter.server"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface NetworkChardCardProps {
  relays: RelayMetric[]
}

export default function NetworkChartCard({ relays }: NetworkChardCardProps) {
  const theme = useTheme()

  const { labels, lines, scales } = formatDailyRelaysForGraphing(relays)
  return (
    <div className="pokt-network-chart">
      <Card>
        <div className="pokt-card-header">
          <h3>Relay Count</h3>
          <p>Last 7 Days</p>
        </div>
        <LineChart
          renderBackground
          renderCheckpoints
          renderHorizontalCheckLines
          renderVerticalCheckLines
          backgroundFill="#1B2331"
          borderColor={`rgba(0,0,0,0)`}
          color={() => theme.accentAlternative}
          dotColor={theme.accent}
          dotRadius={12}
          height={240}
          label={(index: number) => labels[index]}
          lines={lines}
          scales={scales}
        />
      </Card>
    </div>
  )
}
