import dayjs from "dayjs"
import { AnalyticsRelaysAggregated } from "~/models/dwh/sdk"

export const getChartData = (data: AnalyticsRelaysAggregated[]) => {
  const totalChartData = data.map((day) => ({
    date: dayjs(day.date).format("MMM DD"),
    val: day.countTotal ?? null,
  }))
  const latencyChartData = data.map((day) => ({
    date: dayjs(day.date).format("MMM DD"),
    val: day.avgLatency ?? null,
  }))
  const successChartData = data.map((day) => ({
    date: dayjs(day.date).format("MMM DD"),
    val: day.rateSuccess ?? null,
  }))
  const errorChartData = data.map((day) => ({
    date: dayjs(day.date).format("MMM DD"),
    val: day.rateError ?? null,
  }))

  return { totalChartData, latencyChartData, successChartData, errorChartData }
}
