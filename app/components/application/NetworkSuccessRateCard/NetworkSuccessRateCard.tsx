import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"
import {
  Box,
  ParentSize,
  PieChart,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface NetworkSuccessRateCardProps {
  relays: RelayMetric
}

export default function NetworkSuccessRateCard({ relays }: NetworkSuccessRateCardProps) {
  const theme = useMantineTheme()
  const data = [
    {
      label: "error",
      usage: relays.Count.Failure,
      color: theme.colors.dark[6],
    },
    { label: "success", usage: relays.Count.Success, color: theme.colors.green[6] },
  ]
  return (
    <div className="pokt-network-success-rate">
      <Card>
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
              <circle cx="5" cy="5" fill={theme.colors.green[6]} r="5" />
            </svg>
            Successful relays
          </p>
          <p>Last 7 Days</p>
        </div>
      </Card>
    </div>
  )
}
