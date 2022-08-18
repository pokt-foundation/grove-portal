import { fetch } from "@remix-run/node"
import { dayjs } from "~/utils/dayjs"
import { getRequiredClientEnvVar } from "~/utils/environment"

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

  const res = await fetch(`${getRequiredClientEnvVar("RELAY_METER_API_URL")}/${path}`)

  if (!res || res.status !== 200) {
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
