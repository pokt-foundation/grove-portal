import { redirect } from "@remix-run/node"
import { DwhPeriod } from "~/models/portal/dwh.server"
import { D2LogType } from "~/models/portal/sdk"
import { dayjs } from "~/utils/dayjs"

export const allowedDayParams = [3, 7, 14, 30, 60]
export const byHourPeriods: DwhPeriod[] = ["24hr", 3]
export const DEFAULT_PERIOD = "24hr"
export const LOGS_PAGE_SIZE = 40
export function getDwhParams(url: URL) {
  const periodParam = url.searchParams.get("period") ?? DEFAULT_PERIOD
  const appParam = url.searchParams.get("app")
  const chainParam = url.searchParams.get("chain")

  const period: DwhPeriod = isNaN(Number(periodParam))
    ? (periodParam as DwhPeriod)
    : Number(periodParam)

  return { period, appParam, chainParam }
}

export function validatePeriod({ period, url }: { period: DwhPeriod; url: URL }) {
  if (
    period !== "24hr" &&
    period !== "weekToDate" &&
    period !== "monthToDate" &&
    !allowedDayParams.includes(period)
  ) {
    return redirect(url.pathname)
  }
}

export const getLogsTypeParam = (type: string | null) => {
  switch (type) {
    case "errors":
      return D2LogType.ErrorLogs
    case "success":
      return D2LogType.NoErrorLogs
    case "all":
    default:
      return D2LogType.AllLogs
  }
}

export function getLogsParams(url: URL) {
  const logType = getLogsTypeParam(url.searchParams.get("type"))
  const pageNumberParam = Number(url.searchParams.get("page") ?? "1")

  const tsParam = url.searchParams.get("ts")
    ? dayjs(new Date(url.searchParams.get("ts") as string))
        .utc()
        .toDate()
    : dayjs().utc().toDate()
  // Always fetch logs from selected ts to 1 hour before
  const from = dayjs(tsParam).utc().subtract(1, "hour").toDate()

  return { logType, pageNumberParam, tsParam, from }
}
