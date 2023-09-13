import { SimpleGrid } from "@pokt-foundation/pocket-blocks"
import type { LinksFunction } from "@remix-run/node"
import { useMemo } from "react"
import styles from "./styles.css"
import Card, { links as CardLinks } from "~/components/Card"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { AppIdLoaderData } from "~/routes/account.$accountId.$appId/route_old"
import { useUsageColor } from "~/utils/applicationUtils"
import { formatNumberToSICompact } from "~/utils/formattingUtils"
import { FREE_TIER_MAX_RELAYS } from "~/utils/pocketUtils"

/* c8 ignore start */
export const links: LinksFunction = () => [
  ...CardLinks(),
  {
    rel: "stylesheet",
    href: styles,
  },
]
/* c8 ignore stop */

export default function NotificationsWeeklyBandwidthUsageCard() {
  const appIdRoute = useMatchesRoute("routes/account.$accountId.$appId")
  const appIdData = appIdRoute?.data as AppIdLoaderData
  const { dailyNetworkRelaysPerWeek } = appIdData

  const highestDailyAmount = useMemo(
    () =>
      dailyNetworkRelaysPerWeek.reduce(
        (highest, { Count }) => Math.max(highest, Count.Total),
        0,
      ),
    [dailyNetworkRelaysPerWeek],
  )

  const lowestDailyAmount = useMemo(
    () =>
      dailyNetworkRelaysPerWeek.length === 0
        ? 0
        : dailyNetworkRelaysPerWeek.reduce(
            (lowest, { Count }) => Math.min(lowest, Count.Total),
            Number.POSITIVE_INFINITY,
          ),
    [dailyNetworkRelaysPerWeek],
  )

  const totalDailyRelays = useMemo(() => {
    return dailyNetworkRelaysPerWeek.length === 0
      ? 0
      : dailyNetworkRelaysPerWeek.reduce((sum, { Count }) => sum + Count.Total, 0) /
          dailyNetworkRelaysPerWeek.length
  }, [dailyNetworkRelaysPerWeek])

  const [primaryAverageUsageColor, secondaryAverageUsageColor] = useUsageColor(
    totalDailyRelays / FREE_TIER_MAX_RELAYS,
  )
  const [primaryMaxUsageColor, secondaryMaxUsageColor] = useUsageColor(
    highestDailyAmount / FREE_TIER_MAX_RELAYS,
  )
  const [primaryMinUsageColor, secondaryMinUsageColor] = useUsageColor(
    lowestDailyAmount / FREE_TIER_MAX_RELAYS,
  )

  const maxRelays = formatNumberToSICompact(FREE_TIER_MAX_RELAYS)

  const graphsConfig = useMemo(
    () => [
      {
        id: "average-usage-gradient",
        config: {
          value: Math.min(totalDailyRelays / FREE_TIER_MAX_RELAYS, 1),
        },
        gradientConfig: [
          {
            color: secondaryAverageUsageColor,
            offset: "10%",
            opacity: "100%",
          },
          {
            color: primaryAverageUsageColor,
            offset: "90%",
            opacity: "100%",
          },
        ],
        title: "AVG Usage",
        subtitle: `${Intl.NumberFormat().format(
          Number(totalDailyRelays.toFixed(0)),
        )} Relays`,
      },
      {
        id: "max-usage-gradient",
        config: {
          value: Math.min(highestDailyAmount / FREE_TIER_MAX_RELAYS, 1),
        },
        gradientConfig: [
          {
            color: secondaryMaxUsageColor,
            offset: "10%",
            opacity: "100%",
          },
          {
            color: primaryMaxUsageColor,
            offset: "90%",
            opacity: "100%",
          },
        ],
        title: "Max Usage",
        subtitle: `${Intl.NumberFormat().format(highestDailyAmount)} Relays`,
      },
      {
        id: "min-usage-gradient",
        config: {
          value: Math.min(lowestDailyAmount / FREE_TIER_MAX_RELAYS, 1),
        },
        gradientConfig: [
          {
            color: secondaryMinUsageColor,
            offset: "10%",
            opacity: "100%",
          },
          {
            color: primaryMinUsageColor,
            offset: "90%",
            opacity: "100%",
          },
        ],
        title: "Min Usage",
        subtitle: `${Intl.NumberFormat().format(lowestDailyAmount)} Relays`,
      },
    ],
    [
      highestDailyAmount,
      lowestDailyAmount,
      primaryAverageUsageColor,
      primaryMaxUsageColor,
      primaryMinUsageColor,
      secondaryAverageUsageColor,
      secondaryMaxUsageColor,
      secondaryMinUsageColor,
      totalDailyRelays,
    ],
  )

  return (
    <section className="pokt-network-notifications-weekly-bandwidth-usage">
      <Card>
        <div className="pokt-card-header">
          <h3>Weekly Bandwidth Usage</h3>
          <p>Max Relays Per Day: {maxRelays}</p>
        </div>
        <SimpleGrid
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
          cols={3}
        >
          {graphsConfig.map(({ config, gradientConfig, id, subtitle, title }) => (
            <div
              key={id}
              className="pokt-network-notifications-weekly-bandwidth-usage-item"
            >
              <h5>{title}</h5>
              <p>{subtitle}</p>
            </div>
          ))}
        </SimpleGrid>

        <p className="pokt-network-notifications-weekly-bandwidth-usage-values-period">
          These values are calculated on a period of 7 days.
        </p>
      </Card>
    </section>
  )
}
