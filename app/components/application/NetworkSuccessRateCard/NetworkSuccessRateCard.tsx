import { CircleGraph, useTheme } from "@pokt-foundation/ui"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { RelayMetric } from "~/models/relaymeter.server"

/* c8 ignore next */
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
          color="url(#network-success-gradient)"
          size={80}
          strokeWidth={12}
          value={relays.Count.Success / (relays.Count.Success + relays.Count.Failure)}
        >
          <defs>
            <linearGradient id="network-success-gradient">
              <stop
                offset="10%"
                stopColor={theme.accentSecondAlternative}
                stopOpacity="100%"
              />
              <stop offset="90%" stopColor={theme.accent} stopOpacity="100%" />
            </linearGradient>
          </defs>
        </CircleGraph>

        <div className="pokt-network-success-rate-content">
          <h5>{Intl.NumberFormat().format(relays.Count.Success)}</h5>
          <p>
            <span />
            <svg
              height="10"
              viewBox="0 0 10 10"
              width="10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="5" cy="5" fill={theme.accent} r="5" />
            </svg>
            Successful relays
          </p>
          <p>Last 7 Days</p>
        </div>
      </Card>
    </div>
  )
}
