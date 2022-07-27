import { RelayMetric } from "~/models/relaymeter.server"
import { norm } from "~/utils/mathUtils"
import { dayjs } from "~/utils/dayjs"
import { formatNumberToSICompact } from "~/utils/formattingUtils"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function formatDailyRelaysForGraphing(dailyRelays: RelayMetric[] = []): {
  labels: string[]
  lines: { id: number; values: number[] }[]
  scales: { label: string }[]
} {
  const sortDates = dailyRelays.sort(
    (a, b) => dayjs(a.From).utc().valueOf() - dayjs(b.From).utc().valueOf(),
  )
  const labels = sortDates.map(({ From }) => DAYS[dayjs(From).utc().day()])

  const { high, low } = sortDates.reduce(
    ({ high: highest, low: lowest }, { Count }) => ({
      high: Math.max(highest, Count.Success + Count.Failure),
      low:
        lowest === 0
          ? Count.Success + Count.Failure
          : Math.min(lowest, Count.Success + Count.Failure),
    }),
    { high: 0, low: 0 },
  )

  const diff = high - low
  const quarter = diff * 0.25
  const half = diff * 0.5
  const threeQuarter = diff * 0.75

  const lines = [
    {
      id: 1,
      values: sortDates.map(({ Count }) =>
        norm(Count.Success + Count.Failure, low, high),
      ),
    },
  ]

  const scales = [
    { label: formatNumberToSICompact(Number(low.toFixed(0))) },
    { label: formatNumberToSICompact(Number((low + quarter).toFixed(0))) },
    { label: formatNumberToSICompact(Number((low + half).toFixed(0))) },
    { label: formatNumberToSICompact(Number((low + threeQuarter).toFixed(0))) },
    { label: formatNumberToSICompact(Number(high.toFixed(0))) },
  ]

  return {
    labels,
    lines,
    scales,
  }
}
