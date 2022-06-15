import { useMemo } from "react"
import { CircleGraph } from "@pokt-foundation/ui"
import { SimpleGrid } from "@mantine/core"
import type { LinksFunction } from "@remix-run/node"
import Card, { links as CardLinks } from "~/components/shared/Card"
import { useUsageColor } from "~/utils/applicationUtils"
import { formatNumberToSICompact } from "~/utils/formattingUtils"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { AppIdLoaderData } from "~/routes/dashboard/apps/$appId"

import styles from "./styles.css"

export const links: LinksFunction = () => [
  ...CardLinks(),
  {
    rel: "stylesheet",
    href: styles,
  },
]

export default function NotificationsWeeklyBandwidthUsageCard() {
  const appIdRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  const appIdData = appIdRoute?.data as AppIdLoaderData
  const {
    dailyRelays: { daily_relays: dailyRelays },
    maxDailyRelays,
  } = appIdData

  const highestDailyAmount = useMemo(
    () =>
      dailyRelays.reduce(
        (highest, { daily_relays: dailyRelays }) => Math.max(highest, dailyRelays),
        0,
      ),
    [dailyRelays],
  )

  const lowestDailyAmount = useMemo(
    () =>
      dailyRelays.length === 0
        ? 0
        : dailyRelays.reduce(
            (lowest, { daily_relays: dailyRelays }) => Math.min(lowest, dailyRelays),
            Number.POSITIVE_INFINITY,
          ),
    [dailyRelays],
  )

  const totalDailyRelays = useMemo(() => {
    return dailyRelays.length === 0
      ? 0
      : dailyRelays.reduce(
          (sum, { daily_relays: dailyRelays = 0 }) => sum + dailyRelays,
          0,
        ) / dailyRelays.length
  }, [dailyRelays])

  const [primaryAverageUsageColor, secondaryAverageUsageColor] = useUsageColor(
    totalDailyRelays / maxDailyRelays,
  )
  const [primaryMaxUsageColor, secondaryMaxUsageColor] = useUsageColor(
    highestDailyAmount / maxDailyRelays,
  )
  const [primaryMinUsageColor, secondaryMinUsageColor] = useUsageColor(
    lowestDailyAmount / maxDailyRelays,
  )

  const maxRelays = formatNumberToSICompact(maxDailyRelays)

  return (
    <section className="pokt-network-notifications-weekly-bandwidth-usage">
      <Card>
        <div className="pokt-network-notifications-weekly-bandwidth-usage-title-container">
          <h4>Weekly Bandwidth Usage</h4>
          <p>Max Relays Per Day: {maxRelays}</p>
        </div>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          <div>
            <CircleGraph
              value={Math.min(totalDailyRelays / maxDailyRelays, 1)}
              size={130}
              color="url(#average-usage-gradient)"
              strokeWidth={20}
            >
              <defs>
                <linearGradient id="average-usage-gradient">
                  <stop
                    offset="10%"
                    stop-opacity="100%"
                    stop-color={secondaryAverageUsageColor}
                  />
                  <stop
                    offset="90%"
                    stop-opacity="100%"
                    stop-color={primaryAverageUsageColor}
                  />
                </linearGradient>
              </defs>
            </CircleGraph>
            <h5>AVG Usage</h5>
            <p>
              {" "}
              {Intl.NumberFormat().format(Number(totalDailyRelays.toFixed(0)))} Relays
            </p>
          </div>

          <div>
            <CircleGraph
              value={Math.min(highestDailyAmount / maxDailyRelays, 1)}
              size={130}
              color="url(#max-usage-gradient)"
              strokeWidth={20}
            >
              <defs>
                <linearGradient id="max-usage-gradient">
                  <stop
                    offset="10%"
                    stop-opacity="100%"
                    stop-color={secondaryMaxUsageColor}
                  />
                  <stop
                    offset="90%"
                    stop-opacity="100%"
                    stop-color={primaryMaxUsageColor}
                  />
                </linearGradient>
              </defs>
            </CircleGraph>
            <h5>Max Usage</h5>
            <p>{Intl.NumberFormat().format(highestDailyAmount)} Relays</p>
          </div>

          <div>
            <CircleGraph
              value={lowestDailyAmount / maxDailyRelays}
              size={130}
              color="url(#min-usage-gradient)"
              strokeWidth={20}
            >
              <defs>
                <linearGradient id="min-usage-gradient">
                  <stop
                    offset="10%"
                    stop-opacity="100%"
                    stop-color={secondaryMinUsageColor}
                  />
                  <stop
                    offset="90%"
                    stop-opacity="100%"
                    stop-color={primaryMinUsageColor}
                  />
                </linearGradient>
              </defs>
            </CircleGraph>
            <h5>Min Usage</h5>
            <p> {Intl.NumberFormat().format(lowestDailyAmount)} Relays</p>
          </div>
        </SimpleGrid>

        <p className="pokt-network-notifications-weekly-bandwidth-usage-values-period">
          These values are calculated on a period of 7 days.
        </p>
      </Card>
    </section>
  )
}
