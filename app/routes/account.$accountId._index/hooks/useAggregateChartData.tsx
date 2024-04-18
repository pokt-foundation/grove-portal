import { useMemo } from "react"
import { D2Stats } from "~/models/portal/sdk"
import { dayjs } from "~/utils/dayjs"

type ChartData = { date: string; val: number | null }

const hoursTimeFormat: { [key: number]: string } = {
  1: "h:00 A",
  3: "MMM DD h:00 A",
}

const useAggregateChartData = ({ data, days }: { data: D2Stats[]; days: number }) => {
  return useMemo(() => {
    return data.reduce(
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
  }, [days, data])
}

export default useAggregateChartData
