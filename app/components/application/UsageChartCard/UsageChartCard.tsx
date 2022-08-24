import { LineChart, useTheme } from "@pokt-foundation/ui"
import { formatDailyRelaysForGraphing } from "./formatDailyRelaysForGraphing"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"

/* c8 ignore next */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface NetworkChardCardProps {
  relays: RelayMetric[]
  title?: string
  detail?: string
}

export default function UsageChartCard({
  relays,
  title = "Relay Count",
  detail = "last 7 Days",
}: NetworkChardCardProps) {
  const theme = useTheme()

  const { labels, lines, scales } = formatDailyRelaysForGraphing(relays)
  return (
    <div className="pokt-network-chart">
      <Card>
        <div className="pokt-card-header">
          <h3>{title}</h3>
          <p>{detail}</p>
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
          dotRadius={8}
          height={240}
          label={(index: number) => labels[index]}
          lines={lines}
          scales={scales}
        />
      </Card>
    </div>
  )
}
