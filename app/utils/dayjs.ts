import dayjs from "dayjs"
import dayJsutcPlugin from "dayjs/plugin/utc"
dayjs.extend(dayJsutcPlugin)

const formatTimestampShort = (ts: number) =>
  dayjs.unix(Number(ts)).utc().format("DD MMMM YYYY")

export { dayjs, formatTimestampShort }
