import dayjs from "dayjs"
import { useMemo } from "react"
import { AnalyticsRelaysAggregated } from "~/models/dwh/sdk"

const useAggregateChartData = (data: AnalyticsRelaysAggregated[]) => {
  const aggregatedTotalData = useMemo(() => {
    return data.map((day) => ({
      date: dayjs(day.date).format("MMM DD"),
      val: day.countTotal ?? null,
    }))
  }, [data])

  const aggregatedLatencyData = useMemo(() => {
    return data.map((day) => ({
      date: dayjs(day.date).format("MMM DD"),
      val: day.avgLatency ?? null,
    }))
  }, [data])

  const aggregatedSuccessData = useMemo(() => {
    return data.map((day) => ({
      date: dayjs(day.date).format("MMM DD"),
      val: day.rateSuccess ?? null,
    }))
  }, [data])

  const aggregatedErrorData = useMemo(() => {
    return data.map((day) => ({
      date: dayjs(day.date).format("MMM DD"),
      val: day.rateError ?? null,
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
