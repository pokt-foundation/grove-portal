import { useMemo } from "react"
import { D2Stats } from "~/models/portal/sdk"
import { dayjs } from "~/utils/dayjs"

type ChartData = { date: string; val: number | null }

const hoursTimeFormat: { [key: number]: string } = {
  1: "h:00 A",
  3: "MMM DD h:00 A",
}

const useAggregateChartData = ({ data, days }: { data: D2Stats[]; days: number }) => {
  let relaysData

  if (days === 1) {
    // For now, data for each day is sent individually, so we need to slice the last 24 hours from the 2 days data we're fetching
    relaysData = data.slice(-24)
  } else {
    relaysData = data
  }

  return useMemo(() => {
    return relaysData.reduce(
      (acc, dayData) => {
        const format = hoursTimeFormat[days]
        const date = dayjs(dayData.dateTime).format(format ?? "MMM DD")
        acc.aggregatedTotalData.push({ date, val: dayData.totalCount ?? null })
        acc.aggregatedLatencyData.push({ date, val: dayData.avgLatency ?? null })
        acc.aggregatedSuccessData.push({ date, val: dayData.successRate ?? null })
        acc.aggregatedErrorData.push({ date, val: dayData.errorCount ?? null })

        return acc
      },
      {
        aggregatedTotalData: [] as ChartData[],
        aggregatedLatencyData: [] as ChartData[],
        aggregatedSuccessData: [] as ChartData[],
        aggregatedErrorData: [] as ChartData[],
      },
    )
  }, [days, relaysData])
}

export default useAggregateChartData
