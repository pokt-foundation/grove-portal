import {
  Box,
  createStyles,
  Loader,
  SimpleGrid,
  Stack,
  Text,
} from "@pokt-foundation/pocket-blocks"
import { AnalyticsRelaysAggregated } from "~/models/dwh/sdk/models/AnalyticsRelaysAggregated"

const labels: Record<keyof AnalyticsRelaysAggregated, string> = {
  avgLatency: "Average Latency",
  countTotal: "Total Relays",
  rateSuccess: "Success Rate",
  rateError: "Error Rate",
  categoryValue: "Organization",
  date: "Date",
}

const order: (keyof AnalyticsRelaysAggregated)[] = [
  "countTotal",
  "avgLatency",
  "rateSuccess",
  "rateError",
]

const useStyles = createStyles((theme) => ({
  stat: {
    padding: "24px 20px",
    "&:not(:last-child)": {
      borderRight: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
      }`,
    },
  },
}))

type AccountAppsOverviewProps = {
  aggregate: AnalyticsRelaysAggregated | undefined
  isLoading?: boolean
}

export const AccountAppsOverview = ({
  aggregate,
  isLoading,
}: AccountAppsOverviewProps) => {
  const { classes } = useStyles()

  if (!aggregate) {
    return (
      <>
        <div>undefined</div>
      </>
    )
  }

  return (
    <>
      <SimpleGrid
        breakpoints={[
          { maxWidth: "sm", cols: 1 },
          { maxWidth: "md", cols: 2 },
        ]}
        cols={order.length}
      >
        {order.map((key) => (
          <Box key={key} className={classes.stat}>
            <Stack align="center" spacing={0}>
              <Text fw={600} fz="md">
                {isLoading ? <Loader size="sm" /> : String(aggregate[key])}
              </Text>
              <Text>{labels[key as keyof AnalyticsRelaysAggregated]}</Text>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  )
}

export default AccountAppsOverview
