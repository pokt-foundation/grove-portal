import { fetch } from "@remix-run/node"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { dayjs } from "~/utils/dayjs"

export type RelayMetric = {
  Count: {
    Total: number
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

  const body = (await res.json()) as RelayMetric
  const relay = {
    ...body,
    Count: {
      ...body.Count,
      Total: body.Count.Success + body.Count.Failure,
    },
  }

  return relay
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

  const body = (await res.json()) as RelayMetricUser
  const relay = {
    ...body,
    Count: {
      ...body.Count,
      Total: body.Count.Success + body.Count.Failure,
    },
  }

  return relay
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

  const body = (await res.json()) as RelayMetricApp
  const relay = {
    ...body,
    Count: {
      ...body.Count,
      Total: body.Count.Success + body.Count.Failure,
    },
  }

  return relay
}
