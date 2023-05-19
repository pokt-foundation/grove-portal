import {
  Box,
  LineChart,
  ParentSize,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { useMemo } from "react"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/Card"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { dayjs } from "~/utils/dayjs"

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
  height?: string
}

export default function UsageChartCard({
  relays,
  title = "Relay Count",
  detail = "last 7 Days",
  emptyLabel,
  height = "200px",
}: NetworkChardCardProps) {
  // const theme = useTheme()

  const hasRelays = useMemo(() => {
    const r = relays.reduce((prev, curr) => {
      return curr.Count.Total + prev
    }, 0)

    return r > 0
  }, [relays])

  const theme = useMantineTheme()
  const groups = [
    {
      id: 1,
      label: title,
      color: hasRelays ? theme.colors[theme.primaryColor][6] : "gray",
      dotColor: hasRelays ? theme.colors[theme.primaryColor][3] : "gray",
      data: hasRelays
        ? relays
            .sort((a, b) => dayjs(a.From).utc().valueOf() - dayjs(b.From).utc().valueOf())
            .map((relay) => ({
              x: dayjs(relay.To).format("MMM DD"),
              y: relay.Count.Total,
            }))
        : [],
    },
  ]

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
          <Box
            sx={{
              height: height,
              maxHeight: height,
              width: "100%",
              color: theme.colorScheme === "dark" ? theme.white : theme.black,
            }}
          >
            <ParentSize>
              {({ width, height }) => (
                <LineChart
                  groups={groups}
                  // lineSubject={21}
                  height={height}
                  width={width}
                />
              )}
            </ParentSize>
          </Box>
        </div>
      </Card>
    </div>
  )
}
