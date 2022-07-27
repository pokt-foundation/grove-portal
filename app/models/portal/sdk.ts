import { GraphQLClient } from "graphql-request"
import * as Dom from "graphql-request/dist/types.dom"
import gql from "graphql-tag"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type AppInfo = {
  __typename?: "AppInfo"
  address: Scalars["String"]
  appId: Scalars["String"]
  publicKey: Scalars["String"]
}

export type Blockchain = {
  __typename?: "Blockchain"
  active: Scalars["Boolean"]
  blockchain: Scalars["String"]
  blockchainAliases: Array<Maybe<Scalars["String"]>>
  chainIDCheck: Scalars["String"]
  description: Scalars["String"]
  enforceResult: Scalars["String"]
  id: Scalars["String"]
  index: Scalars["Int"]
  logLimitBlocks: Scalars["Int"]
  network: Scalars["String"]
  path: Scalars["String"]
  syncAllowance: Scalars["Int"]
  syncCheck: Scalars["String"]
  ticker: Scalars["String"]
}

export type CreateNewEndpointInput = {
  gatewaySettings?: InputMaybe<GatewaySettingsInput>
  name: Scalars["String"]
}

export type EndpointGatewaySettings = {
  __typename?: "EndpointGatewaySettings"
  secretKey?: Maybe<Scalars["String"]>
  secretKeyRequired?: Maybe<Scalars["Boolean"]>
  whitelistOrigins?: Maybe<Array<Maybe<Scalars["String"]>>>
  whitelistUserAgents?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type EndpointNotificationSettings = {
  __typename?: "EndpointNotificationSettings"
  full?: Maybe<Scalars["Boolean"]>
  half?: Maybe<Scalars["Boolean"]>
  quarter?: Maybe<Scalars["Boolean"]>
  signedUp?: Maybe<Scalars["Boolean"]>
  threeQuarters?: Maybe<Scalars["Boolean"]>
}

export type EndpointNotificationSettingsInput = {
  full?: InputMaybe<Scalars["Boolean"]>
  fullLastSent?: InputMaybe<Scalars["String"]>
  half?: InputMaybe<Scalars["Boolean"]>
  halfLastSent?: InputMaybe<Scalars["String"]>
  quarter?: InputMaybe<Scalars["Boolean"]>
  quarterLastSent?: InputMaybe<Scalars["String"]>
  signedUp?: InputMaybe<Scalars["Boolean"]>
  threeQuarters?: InputMaybe<Scalars["Boolean"]>
  threeQuartersLastSent?: InputMaybe<Scalars["String"]>
}

export type GatewaySettingsInput = {
  secretKeyRequired: Scalars["Boolean"]
  whitelistOrigins: Array<InputMaybe<Scalars["String"]>>
  whitelistUserAgents: Array<InputMaybe<Scalars["String"]>>
}

export type Mutation = {
  __typename?: "Mutation"
  createNewEndpoint?: Maybe<ProcessedEndpoint>
  removeEndpoint?: Maybe<ProcessedEndpoint>
  updateEndpoint?: Maybe<ProcessedEndpoint>
}

export type MutationCreateNewEndpointArgs = {
  input?: InputMaybe<CreateNewEndpointInput>
}

export type MutationRemoveEndpointArgs = {
  input?: InputMaybe<RemoveEndpointInput>
}

export type MutationUpdateEndpointArgs = {
  input?: InputMaybe<UpdateEndpointInput>
}

export type ProcessedEndpoint = {
  __typename?: "ProcessedEndpoint"
  apps: Array<Maybe<AppInfo>>
  chain: Scalars["String"]
  createdAt?: Maybe<Scalars["String"]>
  freeTier: Scalars["Boolean"]
  gatewaySettings: EndpointGatewaySettings
  gigastake: Scalars["Boolean"]
  id: Scalars["ID"]
  name: Scalars["String"]
  notificationSettings: EndpointNotificationSettings
  status: Scalars["String"]
  updatedAt?: Maybe<Scalars["String"]>
  user: Scalars["String"]
}

export type Query = {
  __typename?: "Query"
  blockchains: Array<Maybe<Blockchain>>
  endpoint: ProcessedEndpoint
  endpoints: Array<Maybe<ProcessedEndpoint>>
}

export type QueryBlockchainsArgs = {
  active: Scalars["Boolean"]
}

export type QueryEndpointArgs = {
  endpointID: Scalars["ID"]
}

export type RemoveEndpointInput = {
  id: Scalars["ID"]
}

export type StickinessOptionsInput = {
  duration: Scalars["Int"]
  id: Scalars["ID"]
  relaysLimit: Scalars["Int"]
  stickiness: Scalars["Boolean"]
  stickinessTemp: Scalars["Boolean"]
  stickyOrigins: Array<InputMaybe<Scalars["String"]>>
  useRPCID: Scalars["Boolean"]
}

export type UpdateEndpointInput = {
  gatewaySettings: GatewaySettingsInput
  id: Scalars["ID"]
  name: Scalars["String"]
}

export type EndpointsQueryVariables = Exact<{ [key: string]: never }>

export type EndpointsQuery = {
  __typename?: "Query"
  endpoints: Array<{
    __typename?: "ProcessedEndpoint"
    id: string
    user: string
    name: string
    status: string
    chain: string
    freeTier: boolean
    gigastake: boolean
    createdAt?: string | null
    updatedAt?: string | null
    apps: Array<{
      __typename?: "AppInfo"
      address: string
      appId: string
      publicKey: string
    } | null>
    gatewaySettings: {
      __typename?: "EndpointGatewaySettings"
      secretKey?: string | null
      secretKeyRequired?: boolean | null
      whitelistOrigins?: Array<string | null> | null
      whitelistUserAgents?: Array<string | null> | null
    }
    notificationSettings: {
      __typename?: "EndpointNotificationSettings"
      signedUp?: boolean | null
      quarter?: boolean | null
      half?: boolean | null
      threeQuarters?: boolean | null
      full?: boolean | null
    }
  } | null>
}

export type EndpointQueryVariables = Exact<{
  endpointID: Scalars["ID"]
}>

export type EndpointQuery = {
  __typename?: "Query"
  endpoint: {
    __typename?: "ProcessedEndpoint"
    id: string
    user: string
    name: string
    status: string
    chain: string
    freeTier: boolean
    gigastake: boolean
    createdAt?: string | null
    updatedAt?: string | null
    apps: Array<{
      __typename?: "AppInfo"
      address: string
      appId: string
      publicKey: string
    } | null>
    gatewaySettings: {
      __typename?: "EndpointGatewaySettings"
      secretKey?: string | null
      secretKeyRequired?: boolean | null
      whitelistOrigins?: Array<string | null> | null
      whitelistUserAgents?: Array<string | null> | null
    }
    notificationSettings: {
      __typename?: "EndpointNotificationSettings"
      signedUp?: boolean | null
      quarter?: boolean | null
      half?: boolean | null
      threeQuarters?: boolean | null
      full?: boolean | null
    }
  }
}

export type BlockchainsQueryVariables = Exact<{
  active: Scalars["Boolean"]
}>

export type BlockchainsQuery = {
  __typename?: "Query"
  blockchains: Array<{
    __typename?: "Blockchain"
    id: string
    ticker: string
    network: string
    description: string
    index: number
    blockchain: string
    active: boolean
    enforceResult: string
    chainIDCheck: string
    syncCheck: string
    syncAllowance: number
    logLimitBlocks: number
    path: string
    blockchainAliases: Array<string | null>
  } | null>
}

export const EndpointsDocument = gql`
  query endpoints {
    endpoints {
      id
      user
      name
      status
      apps {
        address
        appId
        publicKey
      }
      chain
      freeTier
      gigastake
      gatewaySettings {
        secretKey
        secretKeyRequired
        whitelistOrigins
        whitelistUserAgents
      }
      notificationSettings {
        signedUp
        quarter
        half
        threeQuarters
        full
      }
      createdAt
      updatedAt
    }
  }
`
export const EndpointDocument = gql`
  query endpoint($endpointID: ID!) {
    endpoint(endpointID: $endpointID) {
      id
      user
      name
      status
      apps {
        address
        appId
        publicKey
      }
      chain
      freeTier
      gigastake
      gatewaySettings {
        secretKey
        secretKeyRequired
        whitelistOrigins
        whitelistUserAgents
      }
      notificationSettings {
        signedUp
        quarter
        half
        threeQuarters
        full
      }
      createdAt
      updatedAt
    }
  }
`
export const BlockchainsDocument = gql`
  query blockchains($active: Boolean!) {
    blockchains(active: $active) {
      id
      ticker
      network
      description
      index
      blockchain
      active
      enforceResult
      chainIDCheck
      syncCheck
      syncAllowance
      logLimitBlocks
      path
      blockchainAliases
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) =>
  action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    endpoints(
      variables?: EndpointsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<EndpointsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EndpointsQuery>(EndpointsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "endpoints",
        "query",
      )
    },
    endpoint(
      variables: EndpointQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<EndpointQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EndpointQuery>(EndpointDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "endpoint",
        "query",
      )
    },
    blockchains(
      variables: BlockchainsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<BlockchainsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BlockchainsQuery>(BlockchainsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "blockchains",
        "query",
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
