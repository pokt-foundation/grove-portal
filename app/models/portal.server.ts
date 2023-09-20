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
import { fetch } from "@remix-run/node"
import invariant from "tiny-invariant"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { requireUser } from "~/utils/user.server"

// LB: DAILY RELAYS
export const getLBDailyRelays = async (
  id: string,
  request: Request,
): Promise<UserLBDailyRelaysResponse> => {
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
): Promise<UserLBHistoricalLatencyResponse> => {
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

// LB: ERROR METRICS
export interface EndpointRpcError {
  applicationpublickey: string
  blockchain: string
  bytes: number
  code: string
  elapsedtime: number
  message: string
  method: string
  nodepublickey: string
  timestamp: string
}

export const getLBErrorMetrics = async (
  id: string,
  request: Request,
): Promise<EndpointRpcError[]> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/lb/error-metrics/${id}`,
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
): Promise<{ origin_classification: UserLBOriginBucket[] }> => {
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
): Promise<UserLBPreviousTotalSuccessfulRelaysResponse> => {
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
): Promise<UserLBPreviousTotalRelaysResponse> => {
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
export const getLBSessionRelays = async (
  id: string,
  request: Request,
): Promise<UserLBSessionRelaysResponse> => {
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
export const getLBSuccessfulRelays = async (
  id: string,
  request: Request,
): Promise<UserLBTotalSuccessfulRelaysResponse> => {
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
): Promise<UserLBOnChainDataResponse> => {
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
): Promise<UserLBTotalRelaysResponse> => {
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
export type UserLB = PortalUserLB & {
  gigastake: boolean
}

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

// LB: POST NEW USER APPLICATION
export type UserApplication = {
  name: string
  chain: string
  whitelistOrigins: string[]
  whitelistUserAgents: string[]
  whitelistContracts: string[]
  whitelistMethods: string[]
  secretKeyRequired: boolean
}
export const postLBUserApplication = async (
  userApp: UserApplication,
  request: Request,
): Promise<{ id: string }> => {
  const user = await requireUser(request)

  // TODO: passing chain here seems to have no affect. The API should take this into account.
  const res = await fetch(`${getRequiredClientEnvVar("BACKEND_URL")}/api/lb`, {
    method: "POST",
    body: JSON.stringify({
      name: userApp.name,
      // chain: userApp.chain,
      gatewaySettings: {
        whitelistOrigins: userApp.whitelistOrigins,
        whitelistUserAgents: userApp.whitelistUserAgents,
        whitelistContracts: userApp.whitelistContracts,
        whitelistMethods: userApp.whitelistMethods,
        secretKeyRequired: userApp.secretKeyRequired,
      },
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
    },
  })

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  const { id } = await res.json()

  if (getRequiredClientEnvVar("NODE_ENV") === "production") {
    // TODO: LOG AMPLITUDE EVENT
    //
    //
    // amplitude.getInstance().logEvent(AmplitudeEvents.EndpointCreation, {
    //   creationDate: new Date().toISOString(),
    //   endpointId: id,
    //   endpointName: data.name,
    //   chainId: appConfigData.appChain,
    //   publicKeys: [data.apps[0].publicKey],
    // })
  }

  return { id }
}

// LB: POST REMOVE USER APPLICATION
export const postLBRemoveUserApplication = async (
  appId: string,
  request: Request,
): Promise<{ success: boolean }> => {
  const user = await requireUser(request)

  // TODO:  why is the chain not passed to this call?
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/lb/remove/${appId}`,
    {
      method: "POST",
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
    },
  )

  if (!res || (res.status !== 200 && res.status !== 204)) {
    throw new Error(res.statusText)
  }

  if (getRequiredClientEnvVar("NODE_ENV") === "production") {
    // TODO: LOG AMPLITUDE EVENT
    //
    //
    // amplitude.getInstance().logEvent(AmplitudeEvents.EndpointRemoval, {
    //   endpointId: appId,
    // })
  }

  return { success: true }
}

// NETWORK: CHAINS
export type Chain = {
  id: string
  ticker: string
  network: string
  description: string
  appCount?: number
  isAvailableForStaking: boolean
}

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

//LB: NOTIFICATIONS
type Notifications = {
  quarter: boolean
  half: boolean
  threeQuarters: boolean
  full: boolean
}

export const putNotifications = async (
  request: Request,
  appID: string,
  { quarter, half, threeQuarters, full }: Notifications,
): Promise<boolean> => {
  const user = await requireUser(request)
  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/lb/notifications/${appID}`,
    {
      method: "put",
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quarter,
        half,
        threeQuarters,
        full,
      }),
    },
  )

  if (!res || (res.status !== 200 && res.status !== 204)) {
    throw new Error(res.statusText)
  }

  return true
}

// FEEDBACK FORM
export type FeedbackFormProps = {
  feedback: string
  location: string
  pageTitle: string
}

export type FeedbackFormResponse =
  | {
      error: boolean
    }
  | {
      error: boolean
      error_message: string
    }

export const postFeedback = async (
  formData: FeedbackFormProps,
  request: Request,
): Promise<FeedbackFormResponse> => {
  const user = await requireUser(request)
  invariant(user.user.email, "user not found")
  const body = {
    ...formData,
    user: user.user.email,
  }

  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/users/feedback`,
    {
      method: "POST",
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
      body: JSON.stringify(body),
    },
  )

  // server sends 204 no content on successful post
  if (!res || (res.status !== 200 && res.status !== 204)) {
    return {
      error: true,
      error_message: res.statusText,
    }
  }

  return {
    error: false,
  }
}

// APP SECURITY Put Security Settings
export type AppSecurityProps = {
  appID: string
  secretKeyRequired: boolean
  whitelistOrigins: string[]
  whitelistUserAgents: string[]
  whitelistBlockchains: string[]
  whitelistContracts: { blockchainID: string; contracts: string[] }[]
  whitelistMethods: { blockchainID: string; methods: string[] }[]
}

export type AppSecurityResponse =
  | {
      error: false
    }
  | {
      error: true
      error_message: string
    }

export const putAppSecurity = async (
  formData: AppSecurityProps,
  request: Request,
): Promise<AppSecurityResponse> => {
  const user = await requireUser(request)
  const { appID, ...data } = formData
  const res = await fetch(`${getRequiredClientEnvVar("BACKEND_URL")}/api/lb/${appID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
    },
    body: JSON.stringify({ gatewaySettings: data }),
  })

  // server sends 204 on successful put
  if (!res || (res.status !== 200 && res.status !== 204)) {
    return {
      error: true,
      error_message: res.statusText,
    }
  }

  return { error: false }
}
