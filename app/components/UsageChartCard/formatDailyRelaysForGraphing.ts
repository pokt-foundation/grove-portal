// import { format } from "d3-format"
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

  const { high, low } = sortRelaysByDate.reduce(
    ({ high: highest, low: lowest }, { Count }) => ({
      high: Math.max(highest, Count.Total),
      low: Math.min(lowest, Count.Total),
    }),
    { high: 0, low: relays[0].Count.Total },
  )

  const diff = high - low
  const quarter = diff * 0.25
  const half = diff * 0.5
  const threeQuarter = diff * 0.75

  const lines = [
    {
      id: 1,
      values: sortRelaysByDate.map(({ Count }) => norm(Count.Total, low, high)),
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
