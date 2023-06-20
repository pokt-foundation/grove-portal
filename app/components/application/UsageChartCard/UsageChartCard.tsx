import {
  Box,
  LineChart,
  ParentSize,
  Select,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { useSearchParams } from "@remix-run/react"
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
}

export default function UsageChartCard({
  relays,
  title = "Relay Count",
  emptyLabel,
}: NetworkChardCardProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const days = searchParams.get("days")

  const hasRelays = useMemo(
    () => relays?.reduce((prev, curr) => prev + curr.Count.Total, 0) > 0,
    [relays],
  )

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
          <p>
            <Select
              data={[
                { label: "Last 7 Days", value: "7" },
                { label: "Last 14 Days", value: "14" },
                { label: "Last 30 Days", value: "30" },
              ]}
              defaultValue={days ? String(days) : "7"}
              onChange={(value) => {
                searchParams.set("days", String(value))
                setSearchParams(searchParams)
              }}
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
