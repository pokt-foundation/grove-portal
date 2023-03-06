import { fetch } from "@remix-run/node"
import { dayjs } from "~/utils/dayjs"
import { getRequiredClientEnvVar, getRequiredServerEnvVar } from "~/utils/environment"

export type RelayMetric = {
  Count: {
    Total: number
    Success: number
    Failure: number
  }
  From: string
  To: string
}

type RelayType = "network" | "users" | "endpoints" | "apps"

// RelayMeter
export const getRelays = async (
  type: RelayType = "network",
  from: string,
  to: string,
  id?: string,
): Promise<RelayMetric> => {
  let path = `${type}`

  if (id) {
    path = `${path}/${id}`
  }

  path = `${path}?to=${to}&from=${from}`

  const res = await fetch(`${getRequiredClientEnvVar("RELAY_METER_API_URL")}/${path}`, {
    headers: {
      Authorization: `${getRequiredServerEnvVar("RELAY_METER_API_TOKEN")}`,
    },
  })

  if (!res || res.status !== 200) {
    console.log(res)
    throw new Error(res.statusText)
  }

  const body = await res.json()
  const relay = addTotalToResponse(body) as RelayMetric

  return relay
}

const addTotalToResponse = (body: RelayMetric) => {
  return {
    ...body,
    Count: {
      ...body.Count,
      Total: body.Count.Success + body.Count.Failure,
    },
  }
}

export const getRelaysPerPeriod = async (
  type: RelayType = "network",
  period: number = 7,
  id?: string,
): Promise<RelayMetric[]> => {
  const array = Array(period)
    .fill(0)
    .map((_, index) => index)
  const relays = await Promise.all(
    array.map(async (num) => {
      const day = dayjs()
        .utc()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .subtract(num, "day")
        .format()

      // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one full day
      return await getRelays(type, day, day, id)
    }),
  )
  return relays
}
