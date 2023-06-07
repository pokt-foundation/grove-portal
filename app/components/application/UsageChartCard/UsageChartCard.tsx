import {
  Box,
  LineChart,
  ParentSize,
  Select,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { useEffect, useMemo, useState } from "react"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/Card"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { dayjs } from "~/utils/dayjs"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface RelayMetricObject {
  period: string
  data: RelayMetric[]
}

interface NetworkChardCardProps {
  relays: RelayMetricObject[]
  title?: string
  detail?: string
  emptyLabel?: string
}

export default function UsageChartCard({
  relays,
  title = "Relay Count",
  emptyLabel,
}: NetworkChardCardProps) {
  const [chartPeriod, setChartPeriod] = useState<string | null>("last7")
  const [currentChartData, setCurrentChartData] = useState<RelayMetricObject>(relays[0])
  console.log(relays)

  useEffect(() => {
    if (chartPeriod) {
      setCurrentChartData(relays.find((r) => r.period === chartPeriod) || relays[0])
    }
  }, [chartPeriod])

  const hasRelays = useMemo(() => {
    if (!currentChartData.data || !currentChartData.data?.length) return false

    const r = currentChartData.data.reduce((prev, curr) => {
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
        ? currentChartData.data
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
          <p>
            <Select
              data={[
                { label: "Last 7 Days", value: "last7" },
                { label: "Last 2 Weeks", value: "last14" },
                { label: "Last 30 Days", value: "last30" },
              ]}
              defaultValue={"last7"}
              value={chartPeriod}
              onChange={(value) => setChartPeriod(value)}
            />
          </p>
        </div>
        <div className="pokt-chart-wrapper">
          {!hasRelays && emptyLabel && (
            <div className="pokt-chart-overlay">
              <p>{emptyLabel}</p>
            </div>
          )}
          <Box
            sx={{
              height: "200px",
              maxHeight: "200px",
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
