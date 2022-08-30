import { LineChart, useTheme } from "@pokt-foundation/ui"
import clsx from "clsx"
import { useMemo } from "react"
import { formatDailyRelaysForGraphing } from "./formatDailyRelaysForGraphing"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface NetworkChardCardProps {
  relays: RelayMetric[]
  title?: string
  detail?: string
  emptyLabel?: string
}

export default function UsageChartCard({
  relays,
  title = "Relay Count",
  detail = "last 7 Days",
  emptyLabel,
}: NetworkChardCardProps) {
  const theme = useTheme()

  const hasRelays = useMemo(() => {
    const r = relays.reduce((prev, curr) => {
      return curr.Count.Total + prev
    }, 0)

    return r > 0
  }, [relays])

  const { labels, lines, scales } = formatDailyRelaysForGraphing(relays)
  return (
    <div className="pokt-network-chart">
      <Card>
        <div className="pokt-card-header">
          <h3>{title}</h3>
          <p>{detail}</p>
        </div>
        <div className="pokt-chart-wrapper">
          {!hasRelays && emptyLabel && (
            <div className="pokt-chart-overlay">
              <p>{emptyLabel}</p>
            </div>
          )}
          <LineChart
            renderBackground
            renderCheckpoints
            renderHorizontalCheckLines
            renderVerticalCheckLines
            backgroundFill="#1B2331"
            borderColor={`rgba(0,0,0,0)`}
            className={clsx(["pokt-chart-relays", { empty: !hasRelays }])}
            color={() => theme.accentAlternative}
            dotColor={hasRelays ? theme.accent : theme.disabled}
            dotRadius={8}
            height={180}
            label={(index: number) => labels[index]}
            lines={lines}
            scales={scales}
          />
        </div>
      </Card>
    </div>
  )
}
