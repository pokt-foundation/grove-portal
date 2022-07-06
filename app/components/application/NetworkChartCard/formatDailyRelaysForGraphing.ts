// import { format } from "d3-format"
import { DailyRelayBucket } from "~/models/portal.server"
import { norm } from "~/utils/mathUtils"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function formatDailyRelaysForGraphing(dailyRelays: DailyRelayBucket[] = []): {
  labels: string[]
  lines: { id: number; values: number[] }[]
  scales: { label: number }[]
} {
  const labels = dailyRelays.map(
    ({ bucket }) => DAYS[new Date(bucket.split("T")[0]).getUTCDay()],
  )

  const { high, low } = dailyRelays.reduce(
    ({ high: highest, low: lowest }, { total_relays: totalRelays }) => ({
      high: Math.max(highest, totalRelays),
      low: lowest === 0 ? totalRelays : Math.min(lowest, totalRelays),
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
      values: dailyRelays.map(({ total_relays: totalRelays }) =>
        norm(totalRelays, low, high),
      ),
    },
  ]
  //   const formatSi = format(".2s")

  //   const scales = [
  //     { label: 0 },
  //     { label: formatSi((highestDailyAmount * 0.25).toFixed(0)) },
  //     { label: formatSi((highestDailyAmount * 0.5).toFixed(0)) },
  //     { label: formatSi((highestDailyAmount * 0.75).toFixed(0)) },
  //     { label: formatSi(highestDailyAmount.toFixed(0)) },
  //   ]
  const scales = [
    { label: Number(low.toFixed(0)) },
    { label: Number((low + quarter).toFixed(0)) },
    { label: Number((low + half).toFixed(0)) },
    { label: Number((low + threeQuarter).toFixed(0)) },
    { label: Number(high.toFixed(0)) },
  ]

  return {
    labels,
    lines,
    scales,
  }
}
