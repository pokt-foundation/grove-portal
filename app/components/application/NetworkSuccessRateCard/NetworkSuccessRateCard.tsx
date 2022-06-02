import { CircleGraph, useTheme } from "@pokt-foundation/ui"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { NetworkRelayStats } from "~/models/portal.server"
import styles from "./styles.css"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface NetworkSuccessRateCardProps {
  weeklyStats: NetworkRelayStats
}

export default function NetworkSuccessRateCard({
  weeklyStats,
}: NetworkSuccessRateCardProps) {
  const theme = useTheme()
  return (
    <div className="pokt-network-success-rate">
      <Card>
        <CircleGraph
          size={80}
          strokeWidth={12}
          value={weeklyStats.successful_relays / weeklyStats.total_relays}
          color="url(#network-success-gradient)"
        >
          <defs>
            <linearGradient id="network-success-gradient">
              <stop
                offset="10%"
                stopOpacity="100%"
                stopColor={theme.accentSecondAlternative}
              />
              <stop offset="90%" stopOpacity="100%" stopColor={theme.accent} />
            </linearGradient>
          </defs>
        </CircleGraph>

        <div className="pokt-network-success-rate-content">
          <h5>{Intl.NumberFormat().format(weeklyStats.successful_relays)}</h5>
          <p>
            <span />
            <svg
              viewBox="0 0 10 10"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
            >
              <circle cx="5" cy="5" r="5" fill={theme.accent} />
            </svg>
            Successful relays
          </p>
          <p>Last 7 Days</p>
        </div>
      </Card>
    </div>
  )
}
