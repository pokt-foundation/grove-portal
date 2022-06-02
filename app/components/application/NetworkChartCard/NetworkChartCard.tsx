import { LineChart, useTheme } from "@pokt-foundation/ui"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { DailyRelayBucket, NetworkRelayStats } from "~/models/portal.server"
import { formatDailyRelaysForGraphing } from "./formatDailyRelaysForGraphing"
import styles from "./styles.css"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface NetworkChardCardProps {
  weeklyStats: NetworkRelayStats
  dailyRelays: DailyRelayBucket[]
}

export default function NetworkChartCard({
  weeklyStats,
  dailyRelays,
}: NetworkChardCardProps) {
  const theme = useTheme()

  const { labels, lines, scales } = formatDailyRelaysForGraphing(dailyRelays)
  return (
    <div className="pokt-network-chart">
      <Card>
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
        <div>
          <h3>Total Relays:</h3>
          <div>
            <h4>{Intl.NumberFormat().format(weeklyStats.total_relays || 0)}</h4>
            <h5>Last 7 Days</h5>
          </div>
        </div>
      </Card>
    </div>
  )
}
