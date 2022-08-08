import { SimpleGrid } from "@mantine/core"
import { useMemo } from "react"
import type { LinksFunction } from "@remix-run/node"
import CircleGraphWithGradient from "../CircleGraphWithGradient"
import styles from "./styles.css"
import Card, { links as CardLinks } from "~/components/shared/Card"
import { useUsageColor } from "~/utils/applicationUtils"
import { formatNumberToSICompact } from "~/utils/formattingUtils"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { AppIdLoaderData } from "~/routes/dashboard/apps/$appId"


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

  const graphsConfig = useMemo(
    () => [
      {
        id: "average-usage-gradient",
        config: {
          value: Math.min(totalDailyRelays / maxDailyRelays, 1),
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
          value: Math.min(highestDailyAmount / maxDailyRelays, 1),
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
          value: Math.min(lowestDailyAmount / maxDailyRelays, 1),
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
      maxDailyRelays,
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
              <CircleGraphWithGradient
                config={config}
                gradientConfig={gradientConfig}
                id={id}
              />
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
