import dayjs from "dayjs"
import dayAdvancedFormat from "dayjs/plugin/advancedFormat"
import dayJsutcPlugin from "dayjs/plugin/utc.js"
dayjs.extend(dayJsutcPlugin)
dayjs.extend(dayAdvancedFormat)

const formatTimestampShort = (ts: number) =>
  dayjs.unix(Number(ts)).utc().format("DD MMMM YYYY")

export { dayjs, formatTimestampShort }
