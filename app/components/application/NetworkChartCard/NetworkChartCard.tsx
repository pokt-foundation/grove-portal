import { LineChart, useTheme } from "@pokt-foundation/ui"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { DailyRelayBucket, NetworkRelayStats } from "~/models/portal.server"
import { RelayMetric } from "~/models/relaymeter.server"
import { formatDailyRelaysForGraphing } from "./formatDailyRelaysForGraphing"
import styles from "./styles.css"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface NetworkChardCardProps {
  dailyRelays: RelayMetric[]
}

export default function NetworkChartCard({ dailyRelays }: NetworkChardCardProps) {
  const theme = useTheme()

  const { labels, lines, scales } = formatDailyRelaysForGraphing(dailyRelays)
  return (
    <div className="pokt-network-chart">
      <Card>
        <div className="pokt-card-header">
          <h3>Relay Count</h3>
          <p>Last 7 Days</p>
        </div>
        <LineChart
          backgroundFill="#1B2331"
          borderColor={`rgba(0,0,0,0)`}
          color={() => theme.accentAlternative}
          dotRadius={12}
          height={240}
          label={(index: number) => labels[index]}
          lines={lines}
          renderCheckpoints
          scales={scales}
          dotColor={theme.accent}
          renderVerticalCheckLines
          renderHorizontalCheckLines
          renderBackground
        />
      </Card>
    </div>
  )
}
