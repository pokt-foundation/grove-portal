import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { LineChart } from "@pokt-foundation/ui"
import { useMemo } from "react"
import { formatDailyRelaysForGraphing } from "~/components/application/NetworkChartCard/formatDailyRelaysForGraphing"
import { RelayMetric } from "~/models/relaymeter.server"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface UsageOverTimeCardProps {
  dailyRelays: RelayMetric[]
  maxDailyRelays: number
}

export default function AppUsageOverTimeCard({
  dailyRelays,
  maxDailyRelays,
}: UsageOverTimeCardProps) {
  const {
    labels = [],
    lines = [],
    scales,
  } = useMemo(() => formatDailyRelaysForGraphing(dailyRelays), [dailyRelays])

  const highestDailyRelay = useMemo(
    () =>
      dailyRelays.reduce(
        (highest, { Count }) => Math.max(highest, Count.Success + Count.Failure),
        0,
      ),
    [dailyRelays],
  )

  const displayThreshold = useMemo(
    () => maxDailyRelays <= highestDailyRelay,
    [highestDailyRelay, maxDailyRelays],
  )

  return (
    <div className="pokt-app-usage-over-time">
      <Card>
        <div className="pokt-card-header">
          <h3>Usage Over Time</h3>
        </div>
        <div>
          {labels && lines && scales && (
            <LineChart
              className="pokt-app-usage-over-time-chart"
              lines={lines}
              label={(i: number) => labels[i]}
              height={300}
              color={() => "var(--color-secondary-main)"}
              renderCheckpoints
              dotRadius={8}
              threshold={displayThreshold}
              scales={scales}
              dotColor="var(--color-primary-main)"
              renderVerticalCheckLines
              renderBackground
            />
          )}
        </div>
      </Card>
    </div>
  )
}
