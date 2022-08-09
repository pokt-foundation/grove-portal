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
  appId: Scalars["ID"]
  /** WILL BE BLANK IF GIGASTAKE IS TRUE */
  jailed?: Maybe<Scalars["Boolean"]>
  /** WILL BE BLANK IF GIGASTAKE IS TRUE */
  maxRelays?: Maybe<Scalars["Int"]>
  publicKey: Scalars["String"]
  /** WILL BE BLANK IF GIGASTAKE IS TRUE */
  stakedTokens?: Maybe<Scalars["Int"]>
  /** WILL BE BLANK IF GIGASTAKE IS TRUE */
  status?: Maybe<Scalars["Int"]>
  /** WILL BE BLANK IF GIGASTAKE IS TRUE */
  unstakingTime?: Maybe<Scalars["String"]>
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
  gatewaySettings: GatewaySettingsInput
  name: Scalars["String"]
  notificationSettings: NotificationSettingsInput
}

export type EndpointGatewaySettings = {
  __typename?: "EndpointGatewaySettings"
  secretKey: Scalars["String"]
  secretKeyRequired: Scalars["Boolean"]
  whitelistBlockchains: Array<Scalars["String"]>
  whitelistContracts: Array<WhitelistContracts>
  whitelistMethods: Array<WhitelistMethods>
  whitelistOrigins: Array<Scalars["String"]>
  whitelistUserAgents: Array<Scalars["String"]>
}

export type EndpointNotificationSettings = {
  __typename?: "EndpointNotificationSettings"
  full: Scalars["Boolean"]
  half: Scalars["Boolean"]
  quarter: Scalars["Boolean"]
  signedUp: Scalars["Boolean"]
  threeQuarters: Scalars["Boolean"]
}

export type GatewaySettingsInput = {
  secretKeyRequired: Scalars["Boolean"]
  whitelistBlockchains: Array<Scalars["String"]>
  whitelistContracts: Array<WhitelistContractInput>
  whitelistMethods: Array<WhitelistMethodInput>
  whitelistOrigins: Array<Scalars["String"]>
  whitelistUserAgents: Array<Scalars["String"]>
}

export type Mutation = {
  __typename?: "Mutation"
  createNewEndpoint?: Maybe<ProcessedEndpoint>
  removeEndpoint?: Maybe<ProcessedEndpoint>
  updateEndpoint?: Maybe<ProcessedEndpoint>
}

export type MutationCreateNewEndpointArgs = {
  input: CreateNewEndpointInput
}

export type MutationRemoveEndpointArgs = {
  endpointID: Scalars["ID"]
}

export type MutationUpdateEndpointArgs = {
  input: UpdateEndpointInput
}

export type NotificationSettingsInput = {
  full: Scalars["Boolean"]
  half: Scalars["Boolean"]
  quarter: Scalars["Boolean"]
  signedUp: Scalars["Boolean"]
  threeQuarters: Scalars["Boolean"]
}

/** Contains an Endpoint as well as info about all of its Applications */
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
  stakeRelayStatus?: Maybe<StakeRelayStatus>
  status: Scalars["String"]
  updatedAt?: Maybe<Scalars["String"]>
  userId: Scalars["String"]
}

export type Query = {
  __typename?: "Query"
  blockchains: Array<Maybe<Blockchain>>
  endpoint: ProcessedEndpoint
  endpoints: Array<Maybe<ProcessedEndpoint>>
}

export type QueryEndpointArgs = {
  endpointID: Scalars["ID"]
}

export type StakeRelayStatus = {
  __typename?: "StakeRelayStatus"
  relays: Scalars["Int"]
  stake: Scalars["Int"]
}

export type UpdateEndpointInput = {
  gatewaySettings?: InputMaybe<GatewaySettingsInput>
  id: Scalars["ID"]
  name?: InputMaybe<Scalars["String"]>
  notificationSettings?: InputMaybe<NotificationSettingsInput>
}

export type WhitelistContractInput = {
  blockchainId: Scalars["String"]
  contracts: Array<Scalars["String"]>
}

export type WhitelistContracts = {
  __typename?: "WhitelistContracts"
  blockchainId: Scalars["String"]
  contracts: Array<Scalars["String"]>
}

export type WhitelistMethodInput = {
  blockchainId: Scalars["String"]
  methods: Array<Scalars["String"]>
}

export type WhitelistMethods = {
  __typename?: "WhitelistMethods"
  blockchainId: Scalars["String"]
  methods: Array<Scalars["String"]>
}

export type CreateEndpointMutationVariables = Exact<{
  input: CreateNewEndpointInput
}>

export type CreateEndpointMutation = {
  __typename?: "Mutation"
  createNewEndpoint?: { __typename?: "ProcessedEndpoint"; id: string } | null
}

export type UpdateEndpointMutationVariables = Exact<{
  input: UpdateEndpointInput
}>

export type UpdateEndpointMutation = {
  __typename?: "Mutation"
  updateEndpoint?: { __typename?: "ProcessedEndpoint"; id: string } | null
}

export type RemoveEndpointMutationVariables = Exact<{
  endpointID: Scalars["ID"]
}>

export type RemoveEndpointMutation = {
  __typename?: "Mutation"
  removeEndpoint?: { __typename?: "ProcessedEndpoint"; id: string } | null
}

export type EndpointsQueryVariables = Exact<{ [key: string]: never }>

export type EndpointsQuery = {
  __typename?: "Query"
  endpoints: Array<{
    __typename?: "ProcessedEndpoint"
    id: string
    userId: string
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
      unstakingTime?: string | null
      maxRelays?: number | null
      stakedTokens?: number | null
      status?: number | null
      jailed?: boolean | null
    } | null>
    gatewaySettings: {
      __typename?: "EndpointGatewaySettings"
      secretKey: string
      secretKeyRequired: boolean
      whitelistOrigins: Array<string>
      whitelistUserAgents: Array<string>
    }
    notificationSettings: {
      __typename?: "EndpointNotificationSettings"
      signedUp: boolean
      quarter: boolean
      half: boolean
      threeQuarters: boolean
      full: boolean
    }
    stakeRelayStatus?: {
      __typename?: "StakeRelayStatus"
      stake: number
      relays: number
    } | null
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
    userId: string
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
      unstakingTime?: string | null
      maxRelays?: number | null
      stakedTokens?: number | null
      status?: number | null
      jailed?: boolean | null
    } | null>
    gatewaySettings: {
      __typename?: "EndpointGatewaySettings"
      secretKey: string
      secretKeyRequired: boolean
      whitelistBlockchains: Array<string>
      whitelistOrigins: Array<string>
      whitelistUserAgents: Array<string>
      whitelistContracts: Array<{
        __typename?: "WhitelistContracts"
        blockchainId: string
        contracts: Array<string>
      }>
      whitelistMethods: Array<{
        __typename?: "WhitelistMethods"
        blockchainId: string
        methods: Array<string>
      }>
    }
    notificationSettings: {
      __typename?: "EndpointNotificationSettings"
      signedUp: boolean
      quarter: boolean
      half: boolean
      threeQuarters: boolean
      full: boolean
    }
    stakeRelayStatus?: {
      __typename?: "StakeRelayStatus"
      stake: number
      relays: number
    } | null
  }
}

export type BlockchainsQueryVariables = Exact<{ [key: string]: never }>

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

export const CreateEndpointDocument = gql`
  mutation createEndpoint($input: CreateNewEndpointInput!) {
    createNewEndpoint(input: $input) {
      id
    }
  }
`
export const UpdateEndpointDocument = gql`
  mutation updateEndpoint($input: UpdateEndpointInput!) {
    updateEndpoint(input: $input) {
      id
    }
  }
`
export const RemoveEndpointDocument = gql`
  mutation removeEndpoint($endpointID: ID!) {
    removeEndpoint(endpointID: $endpointID) {
      id
    }
  }
`
export const EndpointsDocument = gql`
  query endpoints {
    endpoints {
      id
      userId
      name
      status
      apps {
        address
        appId
        publicKey
        unstakingTime
        maxRelays
        stakedTokens
        status
        jailed
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
      stakeRelayStatus {
        stake
        relays
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
      userId
      name
      status
      apps {
        address
        appId
        publicKey
        unstakingTime
        maxRelays
        stakedTokens
        status
        jailed
      }
      chain
      freeTier
      gigastake
      gatewaySettings {
        secretKey
        secretKeyRequired
        whitelistBlockchains
        whitelistOrigins
        whitelistUserAgents
        whitelistContracts {
          blockchainId
          contracts
        }
        whitelistMethods {
          blockchainId
          methods
        }
      }
      notificationSettings {
        signedUp
        quarter
        half
        threeQuarters
        full
      }
      stakeRelayStatus {
        stake
        relays
      }
      createdAt
      updatedAt
    }
  }
`
export const BlockchainsDocument = gql`
  query blockchains {
    blockchains {
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
    createEndpoint(
      variables: CreateEndpointMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<CreateEndpointMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateEndpointMutation>(CreateEndpointDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "createEndpoint",
        "mutation",
      )
    },
    updateEndpoint(
      variables: UpdateEndpointMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<UpdateEndpointMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateEndpointMutation>(UpdateEndpointDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "updateEndpoint",
        "mutation",
      )
    },
    removeEndpoint(
      variables: RemoveEndpointMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<RemoveEndpointMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RemoveEndpointMutation>(RemoveEndpointDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "removeEndpoint",
        "mutation",
      )
    },
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
      variables?: BlockchainsQueryVariables,
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
