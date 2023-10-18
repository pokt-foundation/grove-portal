import { AnalyticsRelaysAggregated, AnalyticsRelaysTotal } from "~/models/dwh/sdk"

export const getTotalErrors = (
  aggregatedData: AnalyticsRelaysAggregated | AnalyticsRelaysTotal,
) => {
  if (
    !aggregatedData ||
    !aggregatedData.countTotal ||
    (!aggregatedData.rateError && aggregatedData?.rateError !== 0)
  ) {
    return null
  }

  const { rateError, countTotal } = aggregatedData

  return Math.round(Number(countTotal) * Number(rateError / 100))
}
