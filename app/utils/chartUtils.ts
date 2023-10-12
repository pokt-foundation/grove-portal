import { AnalyticsRelaysAggregated, AnalyticsRelaysTotal } from "~/models/dwh/sdk"

export const getTotalErrors = (
  aggregatedData: AnalyticsRelaysAggregated | AnalyticsRelaysTotal,
) => {
  if (!aggregatedData || !aggregatedData.rateError || !aggregatedData.countTotal) {
    return null
  }

  const { rateError, countTotal } = aggregatedData

  return Math.round(Number(countTotal) * Number(rateError / 100))
}
