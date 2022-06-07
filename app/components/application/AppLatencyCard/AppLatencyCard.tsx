import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { BarChart } from "@pokt-foundation/ui"
import { useMemo } from "react"
import { UserLBLatencyBucket } from "@pokt-foundation/portal-types"
import { formatLatencyValuesForGraphing } from "~/utils/applicationUtils"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface LatencyCardProps {
  hourlyLatency: UserLBLatencyBucket[]
}

const LATENCY_UPPER_BOUND = 1.25 // 1.25 seconds

export default function AppEndpointCard({ hourlyLatency }: LatencyCardProps) {
  const {
    labels = [],
    barValues = [],
    scales = [],
  } = useMemo(
    () => formatLatencyValuesForGraphing(hourlyLatency, LATENCY_UPPER_BOUND),
    [hourlyLatency],
  )

  const avgLatency = useMemo(() => {
    if (!hourlyLatency?.length) {
      return 0
    }
    return (
      hourlyLatency.reduce((avg, { latency }) => {
        return avg + latency
      }, 0) / hourlyLatency.length
    )
  }, [hourlyLatency])

  return (
    <div className="pokt-app-latency">
      <Card>
        <div className="pokt-app-endpoint-header">
          <h3>Average Latency</h3>
          <div>
            <p>{(avgLatency * 1000).toFixed(0)}ms</p>
          </div>
        </div>
        <div>
          <BarChart
            lines={barValues}
            label={labels}
            height={200}
            color={() => "var(--color-secondary-main)"}
            scales={scales}
          />
        </div>
      </Card>
    </div>
  )
}
