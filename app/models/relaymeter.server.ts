import { fetch } from "@remix-run/node"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { dayjs } from "~/utils/dayjs"

export type RelayMetric = {
  Count: number
  //   Count: {
  //     Success: number
  //     Failure: number
  //   }
  From: string
  To: string
}

type UserRelayMetric = RelayMetric & {
  User: string
}

type AppRelayMetric = RelayMetric & {
  Application: string
}

// RelayMeter: NETWORK
export const getNetworkRelays = async (
  from?: string,
  to?: string,
): Promise<RelayMetric> => {
  if (!to || !from) {
    to = dayjs()
      .utc()
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .subtract(1, "day")
      .format()
    from = dayjs()
      .utc()
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .subtract(7, "day")
      .format()
  }

  const res = await fetch(
    `${getRequiredClientEnvVar("RELAY_METER_URL")}/network?to=${to}&from=${from}`,
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}
