import { useMemo } from "react"
import { AnalyticsRelaysAggregated } from "~/models/dwh/sdk"
import { dayjs } from "~/utils/dayjs"

const useAggregateChartData = (data: AnalyticsRelaysAggregated[]) => {
  const aggregateTotalData = useMemo(() => {
    return data.map((day) => ({
      date: dayjs(day.date).utc().format("MMM DD"),
      val: day.countTotal ?? null,
    }))
  }, [data])

  const aggregateLatencyData = useMemo(() => {
    return data.map((day) => ({
      date: dayjs(day.date).utc().format("MMM DD"),
      val: day.avgLatency ?? null,
    }))
  }, [data])

  const aggregateSuccessData = useMemo(() => {
    return data.map((day) => ({
      date: dayjs(day.date).utc().format("MMM DD"),
      val: day.rateSuccess ?? null,
    }))
  }, [data])

  const aggregateErrorData = useMemo(() => {
    return data.map((day) => ({
      date: dayjs(day.date).utc().format("MMM DD"),
      val: day.rateError ?? null,
    }))
  }, [data])

  return {
    aggregateTotalData,
    aggregateLatencyData,
    aggregateSuccessData,
    aggregateErrorData,
  }
}

export default useAggregateChartData
