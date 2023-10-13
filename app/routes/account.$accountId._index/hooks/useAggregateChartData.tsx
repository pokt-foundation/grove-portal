import { useMemo } from "react"
import { AnalyticsRelaysAggregated } from "~/models/dwh/sdk"
import { getTotalErrors } from "~/utils/chartUtils"
import { dayjs } from "~/utils/dayjs"

const useAggregateChartData = (data: AnalyticsRelaysAggregated[]) => {
  const aggregatedTotalData = useMemo(() => {
    return data.map((day) => ({
      date: dayjs(day.date).utc().format("MMM DD"),
      val: day.countTotal ?? null,
    }))
  }, [data])

  const aggregatedLatencyData = useMemo(() => {
    return data.map((day) => ({
      date: dayjs(day.date).utc().format("MMM DD"),
      val: day.avgLatency ?? null,
    }))
  }, [data])

  const aggregatedSuccessData = useMemo(() => {
    return data.map((day) => ({
      date: dayjs(day.date).utc().format("MMM DD"),
      val: day.rateSuccess ?? null,
    }))
  }, [data])

  const aggregatedErrorData = useMemo(() => {
    return data.map((day) => ({
      date: dayjs(day.date).utc().format("MMM DD"),
      val: getTotalErrors(day),
    }))
  }, [data])

  return {
    aggregatedTotalData,
    aggregatedLatencyData,
    aggregatedSuccessData,
    aggregatedErrorData,
  }
}

export default useAggregateChartData
