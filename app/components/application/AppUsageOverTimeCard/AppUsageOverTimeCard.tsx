import { LineChart } from "@pokt-foundation/ui"
import { useMemo } from "react"
import { UserLBDailyRelaysResponse } from "@pokt-foundation/portal-types"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { formatDailyRelaysForGraphing } from "~/utils/applicationUtils"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface UsageOverTimeCardProps {
  dailyRelays: UserLBDailyRelaysResponse["daily_relays"]
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
        (highest, { daily_relays: totalRelays }) => Math.max(highest, totalRelays),
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
              renderBackground
              renderCheckpoints
              renderVerticalCheckLines
              className="pokt-app-usage-over-time-chart"
              color={() => "var(--color-secondary-main)"}
              dotColor="var(--color-primary-main)"
              dotRadius={8}
              height={300}
              label={(i: number) => labels[i]}
              lines={lines}
              scales={scales}
              threshold={displayThreshold}
            />
          )}
        </div>
      </Card>
    </div>
  )
}
