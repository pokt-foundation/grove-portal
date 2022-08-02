import { CircleGraph, useTheme } from "@pokt-foundation/ui"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { RelayMetric } from "~/models/relaymeter.server"
import styles from "./styles.css"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface NetworkSuccessRateCardProps {
  relays: RelayMetric
}

export default function NetworkSuccessRateCard({ relays }: NetworkSuccessRateCardProps) {
  const theme = useTheme()
  return (
    <div className="pokt-network-success-rate">
      <Card>
        <CircleGraph
          size={80}
          strokeWidth={12}
          value={relays.Count.Success / (relays.Count.Success + relays.Count.Failure)}
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
          <h5>{Intl.NumberFormat().format(relays.Count.Success)}</h5>
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
