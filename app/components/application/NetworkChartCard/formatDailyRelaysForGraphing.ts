// import { format } from "d3-format"
import { DailyRelayBucket } from "~/models/portal.server"
import { norm } from "~/utils/mathUtils"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function formatDailyRelaysForGraphing(dailyRelays: DailyRelayBucket[] = []): {
  labels: string[]
  lines: { id: number; values: number[] }[]
  scales: { label: number }[]
} {
  dailyRelays.pop()
  const labels = dailyRelays
    .map(({ bucket }) => bucket.split("T")[0])
    .map((bucket) => DAYS[new Date(bucket).getUTCDay()])

  const highestDailyAmount = dailyRelays.reduce(
    (highest, { total_relays: totalRelays }) => Math.max(highest, totalRelays),
    0,
  )

  const lines = [
    {
      id: 1,
      values: dailyRelays.map(({ total_relays: totalRelays }) =>
        norm(totalRelays, 0, highestDailyAmount),
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
    { label: 0 },
    { label: highestDailyAmount.toFixed(0) },
    { label: highestDailyAmount.toFixed(0) },
    { label: highestDailyAmount.toFixed(0) },
    { label: highestDailyAmount.toFixed(0) },
  ]

  return {
    labels,
    lines,
    scales,
  }
}
