import { AnalyticsRelaysAggregated, AnalyticsRelaysTotal } from "~/models/dwh/sdk"

export const getTotalErrors = (
  aggregatedData: AnalyticsRelaysAggregated | AnalyticsRelaysTotal,
) => {
  if (!aggregatedData || !aggregatedData.rateSuccess || !aggregatedData.countTotal) {
    return null
  }

  const { rateSuccess, countTotal: countTotalSuccess } = aggregatedData

  const totalCount = Number(countTotalSuccess) / Number(rateSuccess / 100)
  return Math.round(totalCount - Number(countTotalSuccess))
}
