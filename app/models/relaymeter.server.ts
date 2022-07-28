import { fetch } from "@remix-run/node"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { dayjs } from "~/utils/dayjs"

export type RelayMetric = {
  Count: {
    Success: number
    Failure: number
  }
  From: string
  To: string
}

type RelayMetricUser = RelayMetric & {
  User: string
}

type RelayMetricApp = RelayMetric & {
  Application: string
}

// RelayMeter: NETWORK
export const getNetworkRelays = async (
  from?: string,
  to?: string,
): Promise<RelayMetric> => {
  if (!to || !from) {
    to = dayjs().utc().hour(0).minute(0).second(0).millisecond(0).format()
    from = dayjs()
      .utc()
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .subtract(6, "day")
      .format()
  }

  const res = await fetch(
    `${getRequiredClientEnvVar("RELAY_METER_API_URL")}/network?to=${to}&from=${from}`,
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return (await res.json()) as RelayMetric
}

// RelayMeter: USER
export const getUserRelays = async (
  user: string,
  from?: string,
  to?: string,
): Promise<RelayMetricUser> => {
  if (!to || !from) {
    to = dayjs().utc().hour(0).minute(0).second(0).millisecond(0).format()
    from = dayjs()
      .utc()
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .subtract(6, "day")
      .format()
  }

  const res = await fetch(
    `${getRequiredClientEnvVar(
      "RELAY_METER_API_URL",
    )}/users/${user}?to=${to}&from=${from}`,
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

// RelayMeter: APP
export const getAppRelays = async (
  app: string,
  from?: string,
  to?: string,
): Promise<RelayMetricApp> => {
  if (!to || !from) {
    to = dayjs().utc().hour(0).minute(0).second(0).millisecond(0).format()
    from = dayjs()
      .utc()
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .subtract(6, "day")
      .format()
  }

  const res = await fetch(
    `${getRequiredClientEnvVar("RELAY_METER_API_URL")}/apps/${app}?to=${to}&from=${from}`,
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}
