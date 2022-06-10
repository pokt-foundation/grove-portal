// import dayjs from 'dayjs/esm'
// import dayJsutcPlugin from 'dayjs/esm/plugin/utc'
import { UserLBDailyRelayBucket } from "@pokt-foundation/portal-types"
import { useTheme } from "@pokt-foundation/ui"
import { norm } from "./mathUtils"
import { formatNumberToSICompact } from "./formattingUtils"

const ONE_MILLION = 1000000
const ONE_SECOND = 1 // Data for graphs come in second

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const DEFAULT_EMPTY_RELAYS = [
  {
    daily_relays: 0,
  },
  {
    daily_relays: 0,
  },
]

const DEFAULT_LATENCY_LABELS = Array(24)
  .fill("")
  .map((_) => "00")

const DEFAULT_LATENCY_SCALE = [
  { label: "0ms" },
  { label: "250ms" },
  { label: "500ms" },
  { label: "750ms" },
  { label: "1000ms", highlightColor: "#AE1515" },
  { label: "" },
]

const DEFAULT_LATENCY_VALUES = [
  {
    id: 1,
    values: Array(24).fill(0),
  },
]

type HourlyLatencyBucket = {
  latency: number
  bucket: string
}

export function useUsageColor(usage: number): [string, string] {
  const theme = useTheme()

  if (usage <= 0.25) {
    return [theme.accent, theme.accentSecondAlternative]
  }

  if (usage <= 0.75) {
    return ["#FFB82E", "#B57905"]
  }

  if (usage <= 0.75) {
    return [theme.warning, "#B57905"]
  }

  return [theme.errorStart, theme.errorEnd]
}

export function useSuccessRateColor(successRate: number): string[] {
  if (successRate >= 0.8) {
    return ["#034200", "#55b02b"]
  } else {
    return ["#881d26", "#ff0003"]
  }
}

export function formatDailyRelaysForGraphing(
  dailyRelays: UserLBDailyRelayBucket[] = [],
): {
  labels: string[]
  lines: { id: number; values: number[] }[]
  scales: { label: number | string }[]
} {
  const labels = dailyRelays
    .map(({ bucket }) => bucket.split("T")[0])
    .map((bucket) => DAYS[new Date(bucket).getUTCDay()])

  const processedDailyRelays =
    dailyRelays.length === 1
      ? [...dailyRelays, { daily_relays: 0 }]
      : dailyRelays.length === 0
      ? DEFAULT_EMPTY_RELAYS
      : dailyRelays

  const upperBound =
    dailyRelays.length > 0
      ? dailyRelays.reduce(
          (highest, { daily_relays: totalRelays }) => Math.max(highest, totalRelays),
          0,
        )
      : ONE_MILLION

  const lines = [
    {
      id: 1,
      values: processedDailyRelays.map(({ daily_relays: dailyRelays }) =>
        norm(Number(dailyRelays), 0, Number(upperBound)),
      ),
    },
  ]

  if (lines[0].values.length > 7) {
    lines[0].values.pop()
  }

  const scales = [
    { label: "0" },
    { label: formatNumberToSICompact(upperBound * 0.25) },
    { label: formatNumberToSICompact(upperBound * 0.5) },
    { label: formatNumberToSICompact(upperBound * 0.75) },
    {
      label: formatNumberToSICompact(upperBound),
      highlightColor: "#AE1515",
    },
    { label: "" },
  ]

  return {
    labels,
    lines,
    scales,
  }
}

export function formatLatencyValuesForGraphing(
  hourlyLatency: HourlyLatencyBucket[] = [],
  upperBound: number = ONE_SECOND,
): {
  labels: string[]
  barValues: { id: number; values: number[] }[]
  scales: { label: number | string }[]
} {
  if (!hourlyLatency.length) {
    return {
      barValues: DEFAULT_LATENCY_VALUES,
      labels: DEFAULT_LATENCY_LABELS,
      scales: DEFAULT_LATENCY_SCALE,
    }
  }

  // dayjs.extend(dayJsutcPlugin)

  const labels =
    hourlyLatency.length > 0
      ? hourlyLatency
          .map(({ bucket }) => {
            return bucket.split("T")[1]
          })
          .map((bucket) => bucket.substring(0, 2))
      : Array(24)
          .fill("")
          .map(() => "00")

  while (labels.length < 24) {
    labels.push("--")
  }

  const boundedLatencyValues = hourlyLatency.map(({ latency }) =>
    norm(latency, 0, upperBound),
  )

  while (boundedLatencyValues.length < 24) {
    boundedLatencyValues.push(0)
  }

  const barValues = [
    {
      id: 1,
      values: boundedLatencyValues,
    },
  ]

  const scales = DEFAULT_LATENCY_SCALE

  return {
    barValues,
    labels,
    scales,
  }
}
