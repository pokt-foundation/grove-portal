import { useMemo } from "react"
import { D2Stats } from "~/models/portal/sdk"
import { dayjs } from "~/utils/dayjs"
type ChartData = { date: string; val: number | null }

const hoursTimeFormat: { [key: string]: string } = {
  "24hr": "h:00 A",
  "3": "MMM DD h:00 A",
}

const useAggregateChartData = ({ data, period }: { data: D2Stats[]; period: string }) => {
  return useMemo(() => {
    return data.reduce(
      (acc, dayData) => {
        const format = hoursTimeFormat[period]
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
  }, [period, data])
}

export default useAggregateChartData
