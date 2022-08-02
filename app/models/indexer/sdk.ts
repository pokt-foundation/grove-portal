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
  Map: any
  Time: any
}

export type AccountsResponse = {
  __typename?: "AccountsResponse"
  accounts?: Maybe<Array<Maybe<GraphQlAccount>>>
  page: Scalars["Int"]
  pageCount: Scalars["Int"]
  totalCount: Scalars["Int"]
  totalPages: Scalars["Int"]
}

export type AppsResponse = {
  __typename?: "AppsResponse"
  apps?: Maybe<Array<Maybe<GraphQlApp>>>
  page: Scalars["Int"]
  pageCount: Scalars["Int"]
  totalCount: Scalars["Int"]
  totalPages: Scalars["Int"]
}

export type Block = {
  __typename?: "Block"
  hash: Scalars["String"]
  height: Scalars["Int"]
  proposerAddress: Scalars["String"]
  time: Scalars["Time"]
  txCount: Scalars["Int"]
}

export type BlocksResponse = {
  __typename?: "BlocksResponse"
  blocks?: Maybe<Array<Maybe<Block>>>
  page: Scalars["Int"]
  pageCount: Scalars["Int"]
  totalCount: Scalars["Int"]
  totalPages: Scalars["Int"]
}

export type Fee = {
  __typename?: "Fee"
  amount: Scalars["String"]
  denom: Scalars["String"]
}

export type GraphQlAccount = {
  __typename?: "GraphQLAccount"
  accountType: Scalars["String"]
  address: Scalars["String"]
  balance: Scalars["String"]
  balanceDenomination: Scalars["String"]
  height: Scalars["Int"]
}

export type GraphQlApp = {
  __typename?: "GraphQLApp"
  address: Scalars["String"]
  height: Scalars["Int"]
  jailed: Scalars["Boolean"]
  publicKey: Scalars["String"]
  stakedTokens: Scalars["String"]
}

export type GraphQlNode = {
  __typename?: "GraphQLNode"
  address: Scalars["String"]
  height: Scalars["Int"]
  jailed: Scalars["Boolean"]
  publicKey: Scalars["String"]
  serviceURL: Scalars["String"]
  tokens: Scalars["String"]
}

export type GraphQlTransaction = {
  __typename?: "GraphQLTransaction"
  amount: Scalars["String"]
  appPubKey: Scalars["String"]
  blockchains?: Maybe<Array<Scalars["String"]>>
  entropy: Scalars["String"]
  fee: Scalars["Int"]
  feeDenomination: Scalars["String"]
  fromAddress: Scalars["String"]
  hash: Scalars["String"]
  height: Scalars["Int"]
  index: Scalars["Int"]
  messageType: Scalars["String"]
  stdTx?: Maybe<StdTx>
  toAddress: Scalars["String"]
  tx: Scalars["String"]
  txResult?: Maybe<TxResult>
}

export type NodesResponse = {
  __typename?: "NodesResponse"
  nodes?: Maybe<Array<Maybe<GraphQlNode>>>
  page: Scalars["Int"]
  pageCount: Scalars["Int"]
  totalCount: Scalars["Int"]
  totalPages: Scalars["Int"]
}

export enum Order {
  Asc = "asc",
  Desc = "desc",
}

export type Query = {
  __typename?: "Query"
  queryAccountByAddress?: Maybe<GraphQlAccount>
  queryAccounts?: Maybe<AccountsResponse>
  queryAppByAddress?: Maybe<GraphQlApp>
  queryApps?: Maybe<AppsResponse>
  queryBlockByHash?: Maybe<Block>
  queryBlockByHeight?: Maybe<Block>
  queryBlocks?: Maybe<BlocksResponse>
  queryNodeByAddress?: Maybe<GraphQlNode>
  queryNodes?: Maybe<NodesResponse>
  queryTransactionByHash?: Maybe<GraphQlTransaction>
  queryTransactions?: Maybe<TransactionsResponse>
  queryTransactionsByAddress?: Maybe<TransactionsResponse>
  queryTransactionsByHeight?: Maybe<TransactionsResponse>
}

export type QueryQueryAccountByAddressArgs = {
  address: Scalars["String"]
  height?: InputMaybe<Scalars["Int"]>
}

export type QueryQueryAccountsArgs = {
  height?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
}

export type QueryQueryAppByAddressArgs = {
  address: Scalars["String"]
  height?: InputMaybe<Scalars["Int"]>
}

export type QueryQueryAppsArgs = {
  height?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
}

export type QueryQueryBlockByHashArgs = {
  hash: Scalars["String"]
}

export type QueryQueryBlockByHeightArgs = {
  height: Scalars["Int"]
}

export type QueryQueryBlocksArgs = {
  order?: InputMaybe<Order>
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
}

export type QueryQueryNodeByAddressArgs = {
  address: Scalars["String"]
  height?: InputMaybe<Scalars["Int"]>
}

export type QueryQueryNodesArgs = {
  height?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
}

export type QueryQueryTransactionByHashArgs = {
  hash: Scalars["String"]
}

export type QueryQueryTransactionsArgs = {
  order?: InputMaybe<Order>
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
}

export type QueryQueryTransactionsByAddressArgs = {
  address: Scalars["String"]
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
}

export type QueryQueryTransactionsByHeightArgs = {
  height: Scalars["Int"]
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
}

export type StdTx = {
  __typename?: "StdTx"
  entropy: Scalars["Int"]
  fee?: Maybe<Array<Maybe<Fee>>>
  memo: Scalars["String"]
  msg?: Maybe<TxMsg>
  signature?: Maybe<TxSignature>
}

export type TransactionsResponse = {
  __typename?: "TransactionsResponse"
  page: Scalars["Int"]
  pageCount: Scalars["Int"]
  totalCount: Scalars["Int"]
  totalPages: Scalars["Int"]
  transactions?: Maybe<Array<Maybe<GraphQlTransaction>>>
}

export type TxMsg = {
  __typename?: "TxMsg"
  type: Scalars["String"]
  value?: Maybe<Scalars["Map"]>
}

export type TxResult = {
  __typename?: "TxResult"
  code: Scalars["Int"]
  codespace: Scalars["String"]
  data: Scalars["String"]
  events: Scalars["String"]
  info: Scalars["String"]
  log: Scalars["String"]
  messageType: Scalars["String"]
  recipient: Scalars["String"]
  signer: Scalars["String"]
}

export type TxSignature = {
  __typename?: "TxSignature"
  pubKey: Scalars["String"]
  signature: Scalars["String"]
}

export type QueryBlockByHashQueryVariables = Exact<{
  hash: Scalars["String"]
}>

export type QueryBlockByHashQuery = {
  __typename?: "Query"
  queryBlockByHash?: {
    __typename: "Block"
    hash: string
    height: number
    time: any
    proposerAddress: string
    txCount: number
  } | null
}

export type QueryBlockByHeightQueryVariables = Exact<{
  height: Scalars["Int"]
}>

export type QueryBlockByHeightQuery = {
  __typename?: "Query"
  queryBlockByHeight?: {
    __typename: "Block"
    hash: string
    height: number
    time: any
    proposerAddress: string
    txCount: number
  } | null
}

export type QueryBlocksQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
  order?: InputMaybe<Order>
}>

export type QueryBlocksQuery = {
  __typename?: "Query"
  queryBlocks?: {
    __typename?: "BlocksResponse"
    pageCount: number
    page: number
    totalPages: number
    totalCount: number
    blocks?: Array<{
      __typename: "Block"
      hash: string
      height: number
      time: any
      proposerAddress: string
      txCount: number
    } | null> | null
  } | null
}

export type QueryTransactionByHashQueryVariables = Exact<{
  hash: Scalars["String"]
}>

export type QueryTransactionByHashQuery = {
  __typename?: "Query"
  queryTransactionByHash?: {
    __typename: "GraphQLTransaction"
    hash: string
    fromAddress: string
    toAddress: string
    appPubKey: string
    blockchains?: Array<string> | null
    messageType: string
    height: number
    index: number
    tx: string
    entropy: string
    fee: number
    feeDenomination: string
    stdTx?: {
      __typename?: "StdTx"
      entropy: number
      memo: string
      fee?: Array<{ __typename?: "Fee"; amount: string; denom: string } | null> | null
      msg?: { __typename?: "TxMsg"; type: string; value?: any | null } | null
      signature?: { __typename?: "TxSignature"; pubKey: string; signature: string } | null
    } | null
    txResult?: {
      __typename?: "TxResult"
      code: number
      codespace: string
      data: string
      events: string
      info: string
      log: string
      messageType: string
      recipient: string
      signer: string
    } | null
  } | null
}

export type QueryTransactionsQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
}>

export type QueryTransactionsQuery = {
  __typename?: "Query"
  queryTransactions?: {
    __typename?: "TransactionsResponse"
    pageCount: number
    page: number
    totalPages: number
    totalCount: number
    transactions?: Array<{
      __typename: "GraphQLTransaction"
      hash: string
      fromAddress: string
      toAddress: string
      appPubKey: string
      blockchains?: Array<string> | null
      messageType: string
      height: number
      index: number
      tx: string
      entropy: string
      fee: number
      feeDenomination: string
      stdTx?: {
        __typename?: "StdTx"
        entropy: number
        memo: string
        fee?: Array<{ __typename?: "Fee"; amount: string; denom: string } | null> | null
        msg?: { __typename?: "TxMsg"; type: string; value?: any | null } | null
        signature?: {
          __typename?: "TxSignature"
          pubKey: string
          signature: string
        } | null
      } | null
      txResult?: {
        __typename?: "TxResult"
        code: number
        codespace: string
        data: string
        events: string
        info: string
        log: string
        messageType: string
        recipient: string
        signer: string
      } | null
    } | null> | null
  } | null
}

export type QueryTransactionsByAddressQueryVariables = Exact<{
  address: Scalars["String"]
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
}>

export type QueryTransactionsByAddressQuery = {
  __typename?: "Query"
  queryTransactionsByAddress?: {
    __typename?: "TransactionsResponse"
    pageCount: number
    page: number
    totalPages: number
    totalCount: number
    transactions?: Array<{
      __typename: "GraphQLTransaction"
      hash: string
      fromAddress: string
      toAddress: string
      appPubKey: string
      blockchains?: Array<string> | null
      messageType: string
      height: number
      index: number
      tx: string
      entropy: string
      fee: number
      feeDenomination: string
      stdTx?: {
        __typename?: "StdTx"
        entropy: number
        memo: string
        fee?: Array<{ __typename?: "Fee"; amount: string; denom: string } | null> | null
        msg?: { __typename?: "TxMsg"; type: string; value?: any | null } | null
        signature?: {
          __typename?: "TxSignature"
          pubKey: string
          signature: string
        } | null
      } | null
      txResult?: {
        __typename?: "TxResult"
        code: number
        codespace: string
        data: string
        events: string
        info: string
        log: string
        messageType: string
        recipient: string
        signer: string
      } | null
    } | null> | null
  } | null
}

export type QueryTransactionsByHeightQueryVariables = Exact<{
  height: Scalars["Int"]
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
}>

export type QueryTransactionsByHeightQuery = {
  __typename?: "Query"
  queryTransactionsByHeight?: {
    __typename?: "TransactionsResponse"
    pageCount: number
    page: number
    totalPages: number
    totalCount: number
    transactions?: Array<{
      __typename: "GraphQLTransaction"
      hash: string
      fromAddress: string
      toAddress: string
      appPubKey: string
      blockchains?: Array<string> | null
      messageType: string
      height: number
      index: number
      tx: string
      entropy: string
      fee: number
      feeDenomination: string
      stdTx?: {
        __typename?: "StdTx"
        entropy: number
        memo: string
        fee?: Array<{ __typename?: "Fee"; amount: string; denom: string } | null> | null
        msg?: { __typename?: "TxMsg"; type: string; value?: any | null } | null
        signature?: {
          __typename?: "TxSignature"
          pubKey: string
          signature: string
        } | null
      } | null
      txResult?: {
        __typename?: "TxResult"
        code: number
        codespace: string
        data: string
        events: string
        info: string
        log: string
        messageType: string
        recipient: string
        signer: string
      } | null
    } | null> | null
  } | null
}

export type QueryAccountsQueryVariables = Exact<{
  height?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
}>

export type QueryAccountsQuery = {
  __typename?: "Query"
  queryAccounts?: {
    __typename?: "AccountsResponse"
    pageCount: number
    page: number
    totalPages: number
    totalCount: number
    accounts?: Array<{
      __typename?: "GraphQLAccount"
      address: string
      height: number
      accountType: string
      balance: string
      balanceDenomination: string
    } | null> | null
  } | null
}

export type QueryAccountByAddressQueryVariables = Exact<{
  address: Scalars["String"]
  height?: InputMaybe<Scalars["Int"]>
}>

export type QueryAccountByAddressQuery = {
  __typename?: "Query"
  queryAccountByAddress?: {
    __typename?: "GraphQLAccount"
    address: string
    height: number
    accountType: string
    balance: string
    balanceDenomination: string
  } | null
}

export type QueryNodesQueryVariables = Exact<{
  height?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
}>

export type QueryNodesQuery = {
  __typename?: "Query"
  queryNodes?: {
    __typename?: "NodesResponse"
    pageCount: number
    page: number
    totalPages: number
    totalCount: number
    nodes?: Array<{
      __typename?: "GraphQLNode"
      address: string
      height: number
      jailed: boolean
      publicKey: string
      serviceURL: string
      tokens: string
    } | null> | null
  } | null
}

export type QueryNodeByAddressQueryVariables = Exact<{
  address: Scalars["String"]
  height?: InputMaybe<Scalars["Int"]>
}>

export type QueryNodeByAddressQuery = {
  __typename?: "Query"
  queryNodeByAddress?: {
    __typename?: "GraphQLNode"
    address: string
    height: number
    jailed: boolean
    publicKey: string
    serviceURL: string
    tokens: string
  } | null
}

export type QueryAppsQueryVariables = Exact<{
  height?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  perPage?: InputMaybe<Scalars["Int"]>
}>

export type QueryAppsQuery = {
  __typename?: "Query"
  queryApps?: {
    __typename?: "AppsResponse"
    pageCount: number
    page: number
    totalPages: number
    totalCount: number
    apps?: Array<{
      __typename?: "GraphQLApp"
      address: string
      height: number
      jailed: boolean
      publicKey: string
      stakedTokens: string
    } | null> | null
  } | null
}

export type QueryAppByAddressQueryVariables = Exact<{
  address: Scalars["String"]
  height?: InputMaybe<Scalars["Int"]>
}>

export type QueryAppByAddressQuery = {
  __typename?: "Query"
  queryAppByAddress?: {
    __typename?: "GraphQLApp"
    address: string
    height: number
    jailed: boolean
    publicKey: string
    stakedTokens: string
  } | null
}

export const QueryBlockByHashDocument = gql`
  query queryBlockByHash($hash: String!) {
    queryBlockByHash(hash: $hash) {
      hash
      height
      time
      proposerAddress
      txCount
      __typename
    }
  }
`
export const QueryBlockByHeightDocument = gql`
  query queryBlockByHeight($height: Int!) {
    queryBlockByHeight(height: $height) {
      hash
      height
      time
      proposerAddress
      txCount
      __typename
    }
  }
`
export const QueryBlocksDocument = gql`
  query queryBlocks($page: Int, $perPage: Int, $order: Order) {
    queryBlocks(page: $page, perPage: $perPage, order: $order) {
      blocks {
        hash
        height
        time
        proposerAddress
        txCount
        __typename
      }
      pageCount
      page
      totalPages
      totalCount
    }
  }
`
export const QueryTransactionByHashDocument = gql`
  query queryTransactionByHash($hash: String!) {
    queryTransactionByHash(hash: $hash) {
      hash
      fromAddress
      toAddress
      appPubKey
      blockchains
      messageType
      height
      index
      stdTx {
        entropy
        fee {
          amount
          denom
        }
        memo
        msg {
          type
          value
        }
        signature {
          pubKey
          signature
        }
      }
      txResult {
        code
        codespace
        data
        events
        info
        log
        messageType
        recipient
        signer
      }
      tx
      entropy
      fee
      feeDenomination
      __typename
    }
  }
`
export const QueryTransactionsDocument = gql`
  query queryTransactions($page: Int, $perPage: Int) {
    queryTransactions(page: $page, perPage: $perPage) {
      transactions {
        hash
        fromAddress
        toAddress
        appPubKey
        blockchains
        messageType
        height
        index
        stdTx {
          entropy
          fee {
            amount
            denom
          }
          memo
          msg {
            type
            value
          }
          signature {
            pubKey
            signature
          }
        }
        txResult {
          code
          codespace
          data
          events
          info
          log
          messageType
          recipient
          signer
        }
        tx
        entropy
        fee
        feeDenomination
        __typename
      }
      pageCount
      page
      totalPages
      totalCount
    }
  }
`
export const QueryTransactionsByAddressDocument = gql`
  query queryTransactionsByAddress($address: String!, $page: Int, $perPage: Int) {
    queryTransactionsByAddress(address: $address, page: $page, perPage: $perPage) {
      transactions {
        hash
        fromAddress
        toAddress
        appPubKey
        blockchains
        messageType
        height
        index
        stdTx {
          entropy
          fee {
            amount
            denom
          }
          memo
          msg {
            type
            value
          }
          signature {
            pubKey
            signature
          }
        }
        txResult {
          code
          codespace
          data
          events
          info
          log
          messageType
          recipient
          signer
        }
        tx
        entropy
        fee
        feeDenomination
        __typename
      }
      pageCount
      page
      totalPages
      totalCount
    }
  }
`
export const QueryTransactionsByHeightDocument = gql`
  query queryTransactionsByHeight($height: Int!, $page: Int, $perPage: Int) {
    queryTransactionsByHeight(height: $height, page: $page, perPage: $perPage) {
      transactions {
        hash
        fromAddress
        toAddress
        appPubKey
        blockchains
        messageType
        height
        index
        stdTx {
          entropy
          fee {
            amount
            denom
          }
          memo
          msg {
            type
            value
          }
          signature {
            pubKey
            signature
          }
        }
        txResult {
          code
          codespace
          data
          events
          info
          log
          messageType
          recipient
          signer
        }
        tx
        entropy
        fee
        feeDenomination
        __typename
      }
      pageCount
      page
      totalPages
      totalCount
    }
  }
`
export const QueryAccountsDocument = gql`
  query queryAccounts($height: Int, $page: Int, $perPage: Int) {
    queryAccounts(height: $height, page: $page, perPage: $perPage) {
      accounts {
        address
        height
        accountType
        balance
        balanceDenomination
      }
      pageCount
      page
      totalPages
      totalCount
    }
  }
`
export const QueryAccountByAddressDocument = gql`
  query queryAccountByAddress($address: String!, $height: Int) {
    queryAccountByAddress(address: $address, height: $height) {
      address
      height
      accountType
      balance
      balanceDenomination
    }
  }
`
export const QueryNodesDocument = gql`
  query queryNodes($height: Int, $page: Int, $perPage: Int) {
    queryNodes(height: $height, page: $page, perPage: $perPage) {
      nodes {
        address
        height
        jailed
        publicKey
        serviceURL
        tokens
      }
      pageCount
      page
      totalPages
      totalCount
    }
  }
`
export const QueryNodeByAddressDocument = gql`
  query queryNodeByAddress($address: String!, $height: Int) {
    queryNodeByAddress(address: $address, height: $height) {
      address
      height
      jailed
      publicKey
      serviceURL
      tokens
    }
  }
`
export const QueryAppsDocument = gql`
  query queryApps($height: Int, $page: Int, $perPage: Int) {
    queryApps(height: $height, page: $page, perPage: $perPage) {
      apps {
        address
        height
        jailed
        publicKey
        stakedTokens
      }
      pageCount
      page
      totalPages
      totalCount
    }
  }
`
export const QueryAppByAddressDocument = gql`
  query queryAppByAddress($address: String!, $height: Int) {
    queryAppByAddress(address: $address, height: $height) {
      address
      height
      jailed
      publicKey
      stakedTokens
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
    queryBlockByHash(
      variables: QueryBlockByHashQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<QueryBlockByHashQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryBlockByHashQuery>(QueryBlockByHashDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "queryBlockByHash",
        "query",
      )
    },
    queryBlockByHeight(
      variables: QueryBlockByHeightQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<QueryBlockByHeightQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryBlockByHeightQuery>(QueryBlockByHeightDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "queryBlockByHeight",
        "query",
      )
    },
    queryBlocks(
      variables?: QueryBlocksQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<QueryBlocksQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryBlocksQuery>(QueryBlocksDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "queryBlocks",
        "query",
      )
    },
    queryTransactionByHash(
      variables: QueryTransactionByHashQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<QueryTransactionByHashQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryTransactionByHashQuery>(
            QueryTransactionByHashDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "queryTransactionByHash",
        "query",
      )
    },
    queryTransactions(
      variables?: QueryTransactionsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<QueryTransactionsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryTransactionsQuery>(QueryTransactionsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "queryTransactions",
        "query",
      )
    },
    queryTransactionsByAddress(
      variables: QueryTransactionsByAddressQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<QueryTransactionsByAddressQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryTransactionsByAddressQuery>(
            QueryTransactionsByAddressDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "queryTransactionsByAddress",
        "query",
      )
    },
    queryTransactionsByHeight(
      variables: QueryTransactionsByHeightQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<QueryTransactionsByHeightQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryTransactionsByHeightQuery>(
            QueryTransactionsByHeightDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "queryTransactionsByHeight",
        "query",
      )
    },
    queryAccounts(
      variables?: QueryAccountsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<QueryAccountsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryAccountsQuery>(QueryAccountsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "queryAccounts",
        "query",
      )
    },
    queryAccountByAddress(
      variables: QueryAccountByAddressQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<QueryAccountByAddressQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryAccountByAddressQuery>(
            QueryAccountByAddressDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "queryAccountByAddress",
        "query",
      )
    },
    queryNodes(
      variables?: QueryNodesQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<QueryNodesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryNodesQuery>(QueryNodesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "queryNodes",
        "query",
      )
    },
    queryNodeByAddress(
      variables: QueryNodeByAddressQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<QueryNodeByAddressQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryNodeByAddressQuery>(QueryNodeByAddressDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "queryNodeByAddress",
        "query",
      )
    },
    queryApps(
      variables?: QueryAppsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<QueryAppsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryAppsQuery>(QueryAppsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "queryApps",
        "query",
      )
    },
    queryAppByAddress(
      variables: QueryAppByAddressQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<QueryAppByAddressQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryAppByAddressQuery>(QueryAppByAddressDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "queryAppByAddress",
        "query",
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
