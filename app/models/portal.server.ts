import { fetch } from "@remix-run/node"
import { requireUser } from "~/utils/session.server"
import { getRequiredClientEnvVar } from "~/utils/environment"
import {
  UserLB as PortalUserLB,
  UserLBDailyRelaysResponse,
  UserLBHistoricalLatencyResponse,
  UserLBOnChainDataResponse,
  UserLBOriginBucket,
  UserLBPreviousTotalRelaysResponse,
  UserLBPreviousTotalSuccessfulRelaysResponse,
  UserLBSessionRelaysResponse,
  UserLBTotalRelaysResponse,
  UserLBTotalSuccessfulRelaysResponse,
} from "@pokt-foundation/portal-types"

// LB: DAILY RELAYS
export const getLBDailyRelays = async (
  id: string,
  request: Request,
): Promise<UserLBDailyRelaysResponse[]> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/lb/daily-relays/${id}`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

// LB: HOURLY LATENCY
export const getLBHourlyLatency = async (
  id: string,
  request: Request,
): Promise<UserLBHistoricalLatencyResponse[]> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/lb/hourly-latency/${id}`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

// LB: ORIGIN CLASSIFICATION
export const getLBOriginClassification = async (
  id: string,
  request: Request,
): Promise<UserLBOriginBucket[]> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/lb/origin-classification/${id}`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

// LB: PREVIOUS SUCCESSFUL RELAYS
export const getLBPreviousSuccessfulRelays = async (
  id: string,
  request: Request,
): Promise<UserLBPreviousTotalSuccessfulRelaysResponse[]> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/lb/previous-successful-relays/${id}`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

// LB: PREVIOUS TOTAL RELAYS
export const getLBPreviousTotalRelays = async (
  id: string,
  request: Request,
): Promise<UserLBPreviousTotalRelaysResponse[]> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/lb/previous-total-relays/${id}`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

// LB: SESSION RELAYS
export const getLBPSessionRelays = async (
  id: string,
  request: Request,
): Promise<UserLBSessionRelaysResponse[]> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/lb/session-relays/${id}`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

// LB: SUCCESSFUL RELAYS
export const getLBPSuccessfulRelays = async (
  id: string,
  request: Request,
): Promise<UserLBTotalSuccessfulRelaysResponse[]> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/lb/successful-relays/${id}`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

// LB: STATUS
export const getLBStatus = async (
  id: string,
  request: Request,
): Promise<UserLBOnChainDataResponse[]> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/lb/status/${id}`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

// LB: TOTAL RELAYS
export const getLBTotalRelays = async (
  id: string,
  request: Request,
): Promise<UserLBTotalRelaysResponse[]> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/lb/total-relays/${id}`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

// LB: USER APPLICATIONS
export type UserLB = PortalUserLB

export const getLBUserApplications = async (request: Request): Promise<UserLB[]> => {
  const user = await requireUser(request)
  const res = await fetch(`${getRequiredClientEnvVar("BACKEND_URL")}/api/lb`, {
    headers: {
      Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
    },
  })

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

export type Chain = {
  id: string
  ticker: string
  network: string
  description: string
  appCount?: number
  isAvailableForStaking: boolean
}

// NETWORK: CHAINS
export const getNetworkChains = async (request: Request): Promise<Chain[]> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/network/usable-chains`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

// NETWORK: DAILY RELAYS
export type DailyRelayBucket = {
  total_relays: number
  bucket: string
}

export const getNetworkDailyRelays = async (
  request: Request,
): Promise<DailyRelayBucket[]> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/network/daily-relays`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

// NETWORK: LATEST BLOCK AND PERFORMANCE
export type LatestBlockAndPerformanceData = {
  highestBlock: {
    validatorThreshold: number
    item: {
      height: number
      producer: string
      time: string
      took: number
      total_accounts: number
      total_apps: number
      total_nodes: number
      total_relays_completed: number
      total_txs: number
    }
  }
  getRelaysPerformance: {
    max_pokt: number
    max_relays: number
    thirty_day_pokt_avg: number
    thirty_day_relays_avg: number
    today_pokt: number
    today_relays: number
  }
}

export const getNetworkLatestBlock = async (
  request: Request,
): Promise<LatestBlockAndPerformanceData> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/network/latest-block-and-performance`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  console.log(res)

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  const data = (await res.json()) as { data: LatestBlockAndPerformanceData }
  return data.data
}

// NETWORK: SUMMARY
export type SummaryData = {
  appsStaked: number
  nodesStaked: number
  poktStaked: number
}

export const getNetworkSummary = async (request: Request): Promise<SummaryData> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/network/summary`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

// NETWORK: WEEKLY AGGREGATE STATS
export type NetworkRelayStats = {
  successful_relays: number
  total_relays: number
}

export const getNetworkWeeklyStats = async (
  request: Request,
): Promise<NetworkRelayStats> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/network/weekly-aggregate-stats`,
    {
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}
