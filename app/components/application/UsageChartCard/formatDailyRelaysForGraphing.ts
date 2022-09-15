// import { format } from "d3-format"
import { count } from "console"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { dayjs } from "~/utils/dayjs"
import { formatNumberToSICompact } from "~/utils/formattingUtils"
import { norm } from "~/utils/mathUtils"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function formatDailyRelaysForGraphing(relays: RelayMetric[] = []): {
  labels: string[]
  lines: { id: number; values: number[] }[]
  scales: { label: string }[]
} {
  const sortRelaysByDate = relays.sort(
    (a, b) => dayjs(a.From).utc().valueOf() - dayjs(b.From).utc().valueOf(),
  )
  const labels = sortRelaysByDate.map(
    ({ From }) => DAYS[new Date(From.split("T")[0]).getUTCDay()],
  )

  const findHighandLow = () => {
    let high = 0
    let low: number[] = []
    sortRelaysByDate.map((item) => {
      if (item.Count.Total >= high) {
        high = item.Count.Total
      }
      if (low[0] === undefined) {
        low[0] = item.Count.Total
      } else if (item.Count.Total < low[0]) {
        low[0] = item.Count.Total
      } else if (item.Count.Total === 0) {
        low.push(item.Count.Total)
      }
    })
    return { high: high, low: low[0] }
  }

  const highest = findHighandLow().high
  const lowest = findHighandLow().low
  const diff = highest - lowest
  const quarter = diff * 0.25
  const half = diff * 0.5
  const threeQuarter = diff * 0.75

  const lines = [
    {
      id: 1,
      values: sortRelaysByDate.map(({ Count }) => norm(Count.Total, lowest, highest)),
    },
  ]

  const scales = [
    { label: formatNumberToSICompact(Number(lowest.toFixed(0))) },
    { label: formatNumberToSICompact(Number((lowest + quarter).toFixed(0))) },
    { label: formatNumberToSICompact(Number((lowest + half).toFixed(0))) },
    { label: formatNumberToSICompact(Number((lowest + threeQuarter).toFixed(0))) },
    { label: formatNumberToSICompact(Number(highest.toFixed(0))) },
  ]

  return {
    labels,
    lines,
    scales,
  }
}
