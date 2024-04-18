import { redirect } from "@remix-run/node"
import { DwhPeriod } from "~/models/portal/dwh.server"

export const allowedDayParams = [3, 7, 14, 30, 60]
export const byHourPeriods: DwhPeriod[] = ["24hr", 3]
export const DEFAULT_PERIOD = "24hr"
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
