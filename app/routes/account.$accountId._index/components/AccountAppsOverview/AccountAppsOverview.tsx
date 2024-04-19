import { Box, SimpleGrid, Stack, Text, Skeleton } from "@mantine/core"
import classes from "./AccountAppsOverview.module.css"
import { D2Stats } from "~/models/portal/sdk"
import { commify } from "~/utils/formattingUtils"

type TotalsOverviewKeys = Pick<
  D2Stats,
  "errorCount" | "totalCount" | "avgLatency" | "successRate"
>

const labels: Record<keyof TotalsOverviewKeys, string> = {
  avgLatency: "Average Latency",
  totalCount: "Total Relays",
  successRate: "Success Rate",
  errorCount: "Total Errors",
}

const getFormattedValue = (aggregate: D2Stats, key: keyof TotalsOverviewKeys) => {
  if (!aggregate) return "-"

  switch (key) {
    case "avgLatency":
      return aggregate[key] ? `${aggregate[key]}ms` : "-"
    case "successRate":
      return aggregate[key] ? `${aggregate[key]}%` : "-"
    case "errorCount":
      return typeof aggregate[key] !== "undefined"
        ? commify(aggregate[key] as number)
        : "-"
    default:
      return aggregate[key] ? commify(String(aggregate[key])) : "-"
  }
}

const order: (keyof TotalsOverviewKeys)[] = [
  "totalCount",
  "avgLatency",
  "successRate",
  "errorCount",
]

type AccountAppsOverviewProps = {
  total: D2Stats
  isLoading?: boolean
}

export const AccountAppsOverview = ({ total, isLoading }: AccountAppsOverviewProps) => {
  return (
    <SimpleGrid className={classes.statGrid} cols={{ base: 1, sm: 2, md: 4 }}>
      {order.map((key) => (
        <Box key={key} className={classes.stat}>
          <Stack align="center" gap={0}>
            {isLoading ? (
              <Skeleton height={8} mb={16} radius="xl" top={8} width={70} />
            ) : (
              <Text fw={600} fz="md">
                {getFormattedValue(total, key)}
              </Text>
            )}
            <Text>{labels[key as keyof TotalsOverviewKeys]}</Text>
          </Stack>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default AccountAppsOverview
