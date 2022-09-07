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
  BigInt: any
}

export type Account = {
  __typename?: "Account"
  _id: Scalars["ID"]
  address: Scalars["ID"]
  amount: Scalars["Float"]
  block_time: Scalars["String"]
  height: Scalars["Int"]
  parse_time: Scalars["String"]
  public_key: Scalars["ID"]
}

export type AccountList = {
  __typename?: "AccountList"
  items?: Maybe<Array<Maybe<Account>>>
  pageInfo: PageInfo
}

export type AccountSearch = {
  __typename?: "AccountSearch"
  address?: Maybe<Scalars["String"]>
  public_key?: Maybe<Scalars["String"]>
}

export type App = {
  __typename?: "App"
  address: Scalars["ID"]
  balance: Scalars["Float"]
  block_time: Scalars["String"]
  chains: Array<Scalars["String"]>
  height: Scalars["Int"]
  max_relays: Scalars["BigInt"]
  parse_time: Scalars["String"]
  public_key: Scalars["ID"]
  status: Scalars["Int"]
  tokens: Scalars["BigInt"]
  unstaking_time: Scalars["String"]
}

export type AppByStatusTimeSeriesUnit = {
  __typename?: "AppByStatusTimeSeriesUnit"
  apps_staked?: Maybe<Scalars["Float"]>
  apps_staked_tokens?: Maybe<Scalars["Float"]>
  apps_unstaked?: Maybe<Scalars["Float"]>
  apps_unstaking?: Maybe<Scalars["Float"]>
  last_height?: Maybe<Scalars["Int"]>
  point?: Maybe<Scalars["String"]>
  point_id?: Maybe<Scalars["String"]>
}

export type AppList = {
  __typename?: "AppList"
  items?: Maybe<Array<Maybe<App>>>
  pageInfo: PageInfo
}

export type AppSearch = {
  __typename?: "AppSearch"
  address?: Maybe<Scalars["String"]>
  public_key?: Maybe<Scalars["String"]>
}

export type Block = {
  __typename?: "Block"
  _id: Scalars["ID"]
  apps_stake_by_chain: Array<Maybe<StakeByChain>>
  apps_staked?: Maybe<Scalars["Int"]>
  apps_staked_tokens?: Maybe<Scalars["BigInt"]>
  apps_unstaked?: Maybe<Scalars["Int"]>
  apps_unstaked_tokens?: Maybe<Scalars["BigInt"]>
  apps_unstaking?: Maybe<Scalars["Int"]>
  apps_unstaking_tokens?: Maybe<Scalars["BigInt"]>
  bad_txs_count_by_error?: Maybe<Scalars["String"]>
  block_per_session: Scalars["Int"]
  block_size?: Maybe<Scalars["Float"]>
  /**  Multiplier to know how many POKT the DAO will receive for relays  */
  dao_earning_multiplier: Scalars["Float"]
  /**  Rewards (uPOKT) given to DAO  */
  dao_rewards?: Maybe<Scalars["Float"]>
  fee_multiplier: Scalars["String"]
  height: Scalars["Int"]
  monetary?: Maybe<BlockCirculating>
  /**  Multiplier to know how many POKT a node will receive for relays  */
  node_earning_multiplier: Scalars["Float"]
  /**  Rewards (uPOKT) given to nodes for serving relays  */
  node_rewards?: Maybe<Scalars["Float"]>
  nodes_jailed_staked?: Maybe<Scalars["Int"]>
  nodes_jailed_staked_tokens?: Maybe<Scalars["BigInt"]>
  nodes_jailed_unstaked?: Maybe<Scalars["Int"]>
  nodes_jailed_unstaked_tokens?: Maybe<Scalars["Int"]>
  nodes_jailed_unstaking?: Maybe<Scalars["Int"]>
  nodes_jailed_unstaking_tokens?: Maybe<Scalars["BigInt"]>
  nodes_stake_by_chain: Array<Maybe<StakeByChain>>
  nodes_unjailed_staked?: Maybe<Scalars["Int"]>
  nodes_unjailed_staked_tokens?: Maybe<Scalars["BigInt"]>
  nodes_unjailed_unstaked: Scalars["Int"]
  nodes_unjailed_unstaked_tokens?: Maybe<Scalars["BigInt"]>
  nodes_unjailed_unstaking?: Maybe<Scalars["Int"]>
  nodes_unjailed_unstaking_tokens?: Maybe<Scalars["BigInt"]>
  parse_time: Scalars["String"]
  producer: Scalars["String"]
  /**  Rewards (uPOKT) given to block producer for producing the block  */
  producer_rewards?: Maybe<Scalars["Float"]>
  proof_msgs?: Maybe<Scalars["Int"]>
  /**  Multiplier to know how many POKT the block producer will receive for relays  */
  proposer_earning_multiplier: Scalars["Float"]
  stake_weight_summary?: Maybe<Array<Maybe<StakeWeightSummary>>>
  state_size?: Maybe<Scalars["Float"]>
  supply: BlockSupply
  supported_block_chains: Array<Scalars["String"]>
  time: Scalars["String"]
  token_multiplier: Scalars["Int"]
  took: Scalars["Float"]
  total_accounts: Scalars["Int"]
  total_apps: Scalars["Int"]
  total_bad_txs?: Maybe<Scalars["BigInt"]>
  total_challenges_completed?: Maybe<Scalars["Int"]>
  total_good_txs?: Maybe<Scalars["BigInt"]>
  total_minted?: Maybe<Scalars["BigInt"]>
  total_nodes: Scalars["Int"]
  total_relays_completed?: Maybe<Scalars["Int"]>
  total_size?: Maybe<Scalars["Float"]>
  total_txs: Scalars["Int"]
  verified?: Maybe<Scalars["Boolean"]>
}

export type BlockCirculating = {
  __typename?: "BlockCirculating"
  m0?: Maybe<Scalars["Float"]>
  mb?: Maybe<Scalars["Float"]>
  ms?: Maybe<Scalars["Float"]>
  mu?: Maybe<Scalars["Float"]>
}

export type BlockItem = {
  __typename?: "BlockItem"
  avgValidatorTokensStaked?: Maybe<Scalars["Float"]>
  item?: Maybe<Block>
  maxValidatorTokensStaked?: Maybe<Scalars["Float"]>
  validatorThreshold?: Maybe<Scalars["Float"]>
  validatorThresholdWithJailed?: Maybe<Scalars["Float"]>
}

export type BlockList = {
  __typename?: "BlockList"
  items?: Maybe<Array<Maybe<Block>>>
  pageInfo: PageInfo
}

export type BlockSearch = {
  __typename?: "BlockSearch"
  height?: Maybe<Scalars["Int"]>
}

export type BlockSupply = {
  __typename?: "BlockSupply"
  app_staked: Scalars["BigInt"]
  dao: Scalars["Float"]
  node_staked: Scalars["BigInt"]
  total: Scalars["Float"]
  total_staked: Scalars["Float"]
  total_unstaked: Scalars["Float"]
}

export enum CacheControlScope {
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export type ChainRelays = {
  __typename?: "ChainRelays"
  chain: Scalars["ID"]
  power: Scalars["Float"]
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
}

export type ChainRewardUnit = {
  __typename?: "ChainRewardUnit"
  chain: Scalars["String"]
  earn_avg: Scalars["Float"]
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
  validators_avg: Scalars["Float"]
}

export type ChainsRelays = {
  __typename?: "ChainsRelays"
  chains?: Maybe<Array<Maybe<ChainRelays>>>
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
}

export type ChainsRewards = {
  __typename?: "ChainsRewards"
  first: Scalars["BigInt"]
  first_time: Scalars["String"]
  last: Scalars["BigInt"]
  last_time: Scalars["String"]
  total_by_chain: Array<ChainsRewardsTotalsByChain>
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
  units: Array<ChainsRewardsUnit>
}

export type ChainsRewardsTotalsByChain = {
  __typename?: "ChainsRewardsTotalsByChain"
  chain: Scalars["String"]
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
}

export type ChainsRewardsUnit = {
  __typename?: "ChainsRewardsUnit"
  chains: Array<ChainRewardUnit>
  first: Scalars["BigInt"]
  last: Scalars["BigInt"]
  point: Scalars["String"]
  point_id: Scalars["String"]
}

export type ChainsSummary = {
  __typename?: "ChainsSummary"
  chain: Scalars["String"]
  total_tokens: Scalars["Float"]
}

export type ClientSummary = {
  __typename?: "ClientSummary"
  avg_last_24_hours: Scalars["Float"]
  avg_last_48_hours: Scalars["Float"]
  chains_count: Scalars["Int"]
  chains_summary?: Maybe<Array<Maybe<ChainsSummary>>>
  client_name?: Maybe<Scalars["String"]>
  current_balance: Scalars["Float"]
  month_summary?: Maybe<Array<Maybe<MonthSummary>>>
  nodes_count: Scalars["Int"]
  nodes_summary?: Maybe<Array<Maybe<NodesSummary>>>
  total_last_24_hours: Scalars["Float"]
  total_last_48_hours: Scalars["Float"]
}

export type History = {
  __typename?: "History"
  from_value: Scalars["String"]
  height: Scalars["BigInt"]
  key: Scalars["String"]
  last_update: Scalars["String"]
  property: Scalars["String"]
  to_value: Scalars["String"]
}

export type HistoryList = {
  __typename?: "HistoryList"
  items?: Maybe<Array<Maybe<History>>>
  pageInfo: PageInfo
}

export type LargestNodeRunner = {
  __typename?: "LargestNodeRunner"
  jailed: Scalars["BigInt"]
  power: Scalars["Float"]
  service_domain: Scalars["String"]
  staked: Scalars["BigInt"]
  tokens: Scalars["Float"]
  validators: Scalars["BigInt"]
  validators_power: Scalars["Float"]
  validators_tokens?: Maybe<Scalars["BigInt"]>
}

export type LargestNodeRunnersList = {
  __typename?: "LargestNodeRunnersList"
  block?: Maybe<Scalars["BigInt"]>
  items: Array<Maybe<LargestNodeRunner>>
  total_tokens: Scalars["BigInt"]
}

export type MonthSummary = {
  __typename?: "MonthSummary"
  avg_by_day_by_nodes: Scalars["Float"]
  date: Scalars["String"]
  month: Scalars["String"]
  new_nodes_staked?: Maybe<Scalars["Int"]>
  nodes_staked: Scalars["Int"]
  total_net_tokens: Scalars["Float"]
}

export type Mutation = {
  __typename?: "Mutation"
  noop?: Maybe<Scalars["Boolean"]>
}

export type NetworkPerformance = {
  __typename?: "NetworkPerformance"
  avg_block_time: Scalars["Float"]
  avg_block_time_performance: Scalars["Float"]
  jailed_nodes: Scalars["Float"]
  jailed_nodes_performance: Scalars["Float"]
  minted: Scalars["Float"]
  minted_performance: Scalars["Float"]
  new_apps: Scalars["BigInt"]
  new_apps_performance: Scalars["Float"]
  new_nodes: Scalars["BigInt"]
  new_nodes_performance: Scalars["Float"]
  relays: Scalars["BigInt"]
  relays_performance: Scalars["Float"]
  staked_apps: Scalars["BigInt"]
  staked_apps_performance: Scalars["Float"]
  staked_nodes: Scalars["BigInt"]
  staked_nodes_performance: Scalars["Float"]
  unstaking_nodes: Scalars["Float"]
  unstaking_nodes_performance: Scalars["Float"]
}

export type NetworkStatus = {
  __typename?: "NetworkStatus"
  height: Scalars["BigInt"]
  is_latest: Scalars["Boolean"]
  is_sync: Scalars["Boolean"]
  network_height: Scalars["BigInt"]
  time: Scalars["String"]
}

export type Node = {
  __typename?: "Node"
  _id: Scalars["ID"]
  address: Scalars["ID"]
  balance: Scalars["Float"]
  block_time: Scalars["String"]
  chain_relays?: Maybe<Array<Maybe<NodeChainRelays>>>
  chains: Array<Scalars["String"]>
  chains_history?: Maybe<Array<Maybe<NodeChainRelays>>>
  country: Scalars["String"]
  custodial?: Maybe<Scalars["Boolean"]>
  height: Scalars["Int"]
  index_offset: Scalars["Int"]
  jailed: Scalars["Boolean"]
  jailed_blocks_counter: Scalars["Int"]
  jailed_until: Scalars["String"]
  missed_signing_blocks_counter: Scalars["Int"]
  missing_blocks?: Maybe<Scalars["Int"]>
  output_address: Scalars["ID"]
  output_balance?: Maybe<Scalars["Float"]>
  parse_time: Scalars["String"]
  pending_claims?: Maybe<Array<Maybe<PendingClaims>>>
  producer: Scalars["Boolean"]
  public_key: Scalars["ID"]
  service_domain: Scalars["String"]
  service_url: Scalars["String"]
  stake_amount?: Maybe<Scalars["BigInt"]>
  stake_weight?: Maybe<Scalars["Float"]>
  start_height: Scalars["Int"]
  status: Scalars["Int"]
  tokens: Scalars["String"]
  total_pending_claim_relays?: Maybe<Scalars["BigInt"]>
  total_pending_claim_tokens?: Maybe<Scalars["BigInt"]>
  unstaking_time: Scalars["String"]
  validator?: Maybe<Scalars["Boolean"]>
  version: Scalars["String"]
}

export type NodeByStatusTimeSeriesUnit = {
  __typename?: "NodeByStatusTimeSeriesUnit"
  last_height?: Maybe<Scalars["Int"]>
  nodes_jailed_staked?: Maybe<Scalars["Float"]>
  nodes_jailed_staked_tokens?: Maybe<Scalars["Float"]>
  nodes_jailed_unstaked?: Maybe<Scalars["Float"]>
  nodes_jailed_unstaked_tokens?: Maybe<Scalars["Float"]>
  nodes_jailed_unstaking?: Maybe<Scalars["Float"]>
  nodes_jailed_unstaking_tokens?: Maybe<Scalars["Float"]>
  nodes_unjailed_staked?: Maybe<Scalars["Float"]>
  nodes_unjailed_staked_tokens?: Maybe<Scalars["Float"]>
  nodes_unjailed_unstaked?: Maybe<Scalars["Float"]>
  nodes_unjailed_unstaked_tokens?: Maybe<Scalars["Float"]>
  nodes_unjailed_unstaking?: Maybe<Scalars["Float"]>
  nodes_unjailed_unstaking_tokens?: Maybe<Scalars["Float"]>
  point?: Maybe<Scalars["String"]>
  point_id?: Maybe<Scalars["String"]>
}

export type NodeChainRelays = {
  __typename?: "NodeChainRelays"
  chain: Scalars["String"]
  relays: Scalars["BigInt"]
}

export type NodeConsensus = {
  __typename?: "NodeConsensus"
  validators: Scalars["BigInt"]
  version: Scalars["ID"]
  version_power: Scalars["Float"]
  version_tokens: Scalars["Float"]
}

export type NodeConsensusList = {
  __typename?: "NodeConsensusList"
  block?: Maybe<Scalars["Int"]>
  items?: Maybe<Array<Maybe<NodeConsensus>>>
  total_power: Scalars["Float"]
}

export type NodeError = {
  __typename?: "NodeError"
  address?: Maybe<Scalars["String"]>
  applicationpublickey?: Maybe<Scalars["String"]>
  blockchain?: Maybe<Scalars["String"]>
  bytes?: Maybe<Scalars["Int"]>
  code?: Maybe<Scalars["String"]>
  elapsedtime?: Maybe<Scalars["Float"]>
  message?: Maybe<Scalars["String"]>
  method?: Maybe<Scalars["String"]>
  nodepublickey?: Maybe<Scalars["String"]>
  service_domain?: Maybe<Scalars["String"]>
  service_url?: Maybe<Scalars["String"]>
  timestamp?: Maybe<Scalars["String"]>
}

export type NodeErrorList = {
  __typename?: "NodeErrorList"
  items?: Maybe<Array<Maybe<NodeError>>>
  pageInfo: PageInfo
}

export type NodeGeo = {
  __typename?: "NodeGeo"
  country: Scalars["ID"]
  staked: Scalars["Int"]
  tokens: Scalars["BigInt"]
  total_jailed: Scalars["Int"]
  total_not_jailed?: Maybe<Scalars["Int"]>
  unstaked?: Maybe<Scalars["Int"]>
  unstaking?: Maybe<Scalars["Int"]>
  validators?: Maybe<Scalars["Int"]>
}

export type NodeGeoList = {
  __typename?: "NodeGeoList"
  block?: Maybe<Scalars["Int"]>
  items?: Maybe<Array<Maybe<NodeGeo>>>
}

export type NodeList = {
  __typename?: "NodeList"
  items?: Maybe<Array<Maybe<Node>>>
  pageInfo: PageInfo
}

export type NodeRelays = {
  __typename?: "NodeRelays"
  address: Scalars["String"]
  amount: Scalars["Float"]
  block_time: Scalars["String"]
  chain: Scalars["String"]
  height: Scalars["Int"]
  serviced: Array<ServicedNodeRelays>
  token_multiplier: Scalars["Int"]
  total_relays: Scalars["BigInt"]
}

export type NodeRelaysInput = {
  addresses?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  fromHeight?: InputMaybe<Scalars["Int"]>
  height?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>
  page?: InputMaybe<Scalars["Int"]>
  pageSize?: InputMaybe<Scalars["Int"]>
  sortBy?: InputMaybe<SortPropertyNodeRelays>
  sortDirection?: InputMaybe<SortDirectionNodeRelays>
  toHeight?: InputMaybe<Scalars["Int"]>
}

export type NodeRelaysList = {
  __typename?: "NodeRelaysList"
  items?: Maybe<Array<Maybe<NodeRelays>>>
  pageInfo?: Maybe<PageInfo>
}

export type NodeRewardPerformanceResult = {
  __typename?: "NodeRewardPerformanceResult"
  total_chains: Scalars["BigInt"]
  total_jailed_now: Scalars["BigInt"]
  total_last_6hs: Scalars["Float"]
  total_last_24hs: Scalars["Float"]
  total_nodes: Scalars["BigInt"]
  total_today: Scalars["Float"]
  total_tokens: Scalars["Float"]
  units: Array<NodeRewardPerformanceResultUnit>
}

export type NodeRewardPerformanceResultUnit = {
  __typename?: "NodeRewardPerformanceResultUnit"
  address: Scalars["String"]
  block_producer_rewards?: Maybe<Scalars["Float"]>
  block_producer_times?: Maybe<Scalars["Int"]>
  chains: Array<Scalars["String"]>
  current_amount: Scalars["Float"]
  jailed: Scalars["Boolean"]
  service_domain: Scalars["String"]
  service_url: Scalars["String"]
  today: Scalars["Float"]
  total_last_6hs: Scalars["Float"]
  total_last_24hs: Scalars["Float"]
  total_last_48hs: Scalars["Float"]
  total_tokens: Scalars["Float"]
}

export type NodeRunnerSummary = {
  __typename?: "NodeRunnerSummary"
  /**  Average by node of the base POKTs by serving relays in the last 6 hours.   */
  avg_base_last_6_hours: Scalars["Float"]
  /**  Average by node of the base POKTs by serving relays in the last 24 hours.   */
  avg_base_last_24_hours: Scalars["Float"]
  /**  Average by node of the base POKTs by serving relays in the last 48 hours.   */
  avg_base_last_48_hours: Scalars["Float"]
  /**  Average by node of the POKTs generated by serving relays in the last 6 hours.   */
  avg_last_6_hours: Scalars["Float"]
  /**  Average by node of the POKTs generated by serving relays in the last 24 hours.   */
  avg_last_24_hours: Scalars["Float"]
  /**  Average by node of the POKTs generated by serving relays in the last 48 hours.   */
  avg_last_48_hours: Scalars["Float"]
  /**  Average by node of the POKTs generated by validating blocks in the last 6 hours.  */
  avg_producer_last_6_hours?: Maybe<Scalars["Float"]>
  /**  Average by node of the POKTs generated by validating blocks in the last 24 hours.  */
  avg_producer_last_24_hours?: Maybe<Scalars["Float"]>
  /**  Average by node of the POKTs generated by validating blocks in the last 48 hours.  */
  avg_producer_last_48_hours?: Maybe<Scalars["Float"]>
  /**  Average by node of the Relays generated in the last 6 hours.  */
  avg_relays_last_6_hours: Scalars["Float"]
  /**  Average by node of the Relays generated in the last 24 hours.  */
  avg_relays_last_24_hours: Scalars["Float"]
  /**  Average by node of the Relays generated in the last 48 hours.  */
  avg_relays_last_48_hours: Scalars["Float"]
  /**  Average by node of the POKTs generated by validating blocks and serving relays in the last 6 hours.   */
  avg_total_last_6_hours: Scalars["Float"]
  /**  Average by node of the POKTs generated by validating blocks and serving relays in the last 24 hours.   */
  avg_total_last_24_hours: Scalars["Float"]
  /**  Average by node of the POKTs generated by validating blocks and serving relays in the last 48 hours.   */
  avg_total_last_48_hours: Scalars["Float"]
  jailed_now?: Maybe<Scalars["Int"]>
  last_height?: Maybe<Scalars["BigInt"]>
  nodes_staked?: Maybe<Scalars["Int"]>
  nodes_unstaked?: Maybe<Scalars["Int"]>
  nodes_unstaking?: Maybe<Scalars["Int"]>
  /**  POKTs generated by validating blocks in the last 6 hours.   */
  producer_rewards_last_6_hours: Scalars["Float"]
  /**  POKTs generated by validating blocks in the last 24 hours.   */
  producer_rewards_last_24_hours: Scalars["Float"]
  /**  POKTs generated by validating blocks in the last 48 hours.   */
  producer_rewards_last_48_hours: Scalars["Float"]
  /**  Times as block validator in the last 6 hours.   */
  producer_times_last_6_hours: Scalars["Float"]
  /**  Times as block validator in the last 24 hours.   */
  producer_times_last_24_hours: Scalars["Float"]
  /**  Times as block validator in the last 48 hours.   */
  producer_times_last_48_hours: Scalars["Float"]
  /**  Relays generated in the last 6 hours.  */
  relays_last_6_hours: Scalars["BigInt"]
  /**  Relays generated in the last 24 hours.  */
  relays_last_24_hours: Scalars["BigInt"]
  /**  Relays generated in the last 48 hours.  */
  relays_last_48_hours: Scalars["BigInt"]
  /**  POKTs generated by serving relays in the last 6 hours.   */
  serviced_last_6_hours: Scalars["Float"]
  /**  POKTs generated by serving relays in the last 24 hours.   */
  serviced_last_24_hours: Scalars["Float"]
  /**  POKTs generated by serving relays in the last 48 hours.   */
  serviced_last_48_hours: Scalars["Float"]
  total_balance: Scalars["Float"]
  total_chains?: Maybe<Scalars["Int"]>
  /**  Estimated uPOKT the nodes will receive when their pending claims are finished  */
  total_estimated_pending_rewards?: Maybe<Scalars["Float"]>
  /**  POKTs generated by validating blocks and serving relays in the last 6 hours.   */
  total_last_6_hours: Scalars["Float"]
  /**  POKTs generated by validating blocks and serving relays in the last 24 hours.   */
  total_last_24_hours: Scalars["Float"]
  /**  POKTs generated by validating blocks and serving relays in the last 48 hours.   */
  total_last_48_hours: Scalars["Float"]
  total_nodes: Scalars["Int"]
  total_output_balance?: Maybe<Scalars["Float"]>
  total_pending_relays?: Maybe<Scalars["BigInt"]>
  validators?: Maybe<Scalars["BigInt"]>
}

export type NodeSearch = {
  __typename?: "NodeSearch"
  address?: Maybe<Scalars["String"]>
  height?: Maybe<Scalars["Int"]>
  public_key?: Maybe<Scalars["String"]>
  service_domain?: Maybe<Scalars["String"]>
  service_url?: Maybe<Scalars["String"]>
}

export type NodeStakedCount = {
  __typename?: "NodeStakedCount"
  count: Scalars["Int"]
}

export type NodeTotalRewardChainReport = {
  __typename?: "NodeTotalRewardChainReport"
  chain: Scalars["String"]
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
}

export type NodeTotalRewardReport = {
  __typename?: "NodeTotalRewardReport"
  address: Scalars["String"]
  chains?: Maybe<Array<Maybe<NodeTotalRewardChainReport>>>
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
}

export type NodeVersion = {
  __typename?: "NodeVersion"
  staked: Scalars["Int"]
  tokens: Scalars["BigInt"]
  total_jailed: Scalars["Int"]
  total_not_jailed?: Maybe<Scalars["Int"]>
  unstaked?: Maybe<Scalars["Int"]>
  unstaking?: Maybe<Scalars["Int"]>
  validators?: Maybe<Scalars["Int"]>
  version: Scalars["ID"]
}

export type NodeVersionList = {
  __typename?: "NodeVersionList"
  block?: Maybe<Scalars["Int"]>
  items?: Maybe<Array<Maybe<NodeVersion>>>
}

export type NodesAvailability = {
  __typename?: "NodesAvailability"
  _id?: Maybe<Scalars["ID"]>
  availability: Scalars["String"]
  position: Scalars["Int"]
  quantity: Scalars["Int"]
}

export type NodesAvailabilityInput = {
  _id?: InputMaybe<Scalars["ID"]>
  availability: Scalars["String"]
  position: Scalars["Int"]
  quantity: Scalars["Int"]
}

export type NodesOfOutputAddress = {
  __typename?: "NodesOfOutputAddress"
  addresses: Array<Scalars["String"]>
  nodes_balance: Scalars["Float"]
  nodes_staked: Scalars["BigInt"]
  output_address: Scalars["String"]
  output_balance: Scalars["Float"]
}

export type NodesPerformance = {
  __typename?: "NodesPerformance"
  address: Scalars["String"]
  balance: Scalars["Float"]
  chains: Array<Scalars["String"]>
  custodial?: Maybe<Scalars["Boolean"]>
  jailed: Scalars["Boolean"]
  last6: Scalars["Float"]
  last6_relays: Scalars["Float"]
  last24: Scalars["Float"]
  last24_relays: Scalars["Float"]
  last48: Scalars["Float"]
  last48_relays: Scalars["Float"]
  output_address?: Maybe<Scalars["String"]>
  output_balance?: Maybe<Scalars["Float"]>
  pending_claims?: Maybe<Scalars["BigInt"]>
  producer_rewards: Scalars["Float"]
  producer_times: Scalars["Int"]
  service_domain: Scalars["String"]
  service_url: Scalars["String"]
  stake_amount?: Maybe<Scalars["BigInt"]>
  stake_weight?: Maybe<Scalars["Float"]>
  status?: Maybe<Scalars["Int"]>
  total_pending_claim_relays?: Maybe<Scalars["BigInt"]>
  total_pending_claim_tokens?: Maybe<Scalars["BigInt"]>
  validator?: Maybe<Scalars["Boolean"]>
}

export type NodesPerformanceList = {
  __typename?: "NodesPerformanceList"
  items?: Maybe<Array<Maybe<NodesPerformance>>>
  pageInfo: PageInfo
}

export type NodesRequest = {
  __typename?: "NodesRequest"
  date?: Maybe<Scalars["String"]>
  email: Scalars["String"]
  first_name: Scalars["String"]
  last_name: Scalars["String"]
  nodes_amount: Scalars["Int"]
  nodes_availability: NodesAvailability
  telegram?: Maybe<Scalars["String"]>
}

export type NodesRequestInput = {
  date: Scalars["String"]
  email: Scalars["String"]
  first_name: Scalars["String"]
  last_name: Scalars["String"]
  nodes_amount: Scalars["Int"]
  nodes_availability: NodesAvailabilityInput
  telegram?: InputMaybe<Scalars["String"]>
}

export type NodesSummary = {
  __typename?: "NodesSummary"
  address: Scalars["String"]
  total_net_tokens: Scalars["Float"]
}

export type PageInfo = {
  __typename?: "PageInfo"
  limit: Scalars["Int"]
  page: Scalars["Int"]
  total: Scalars["Int"]
}

export type PendingClaims = {
  __typename?: "PendingClaims"
  app?: Maybe<Scalars["String"]>
  chain?: Maybe<Scalars["String"]>
  estimated_pokt?: Maybe<Scalars["BigInt"]>
  evidence_type?: Maybe<Scalars["Int"]>
  expiration_height?: Maybe<Scalars["BigInt"]>
  from_address?: Maybe<Scalars["String"]>
  session_height?: Maybe<Scalars["BigInt"]>
  total_proofs?: Maybe<Scalars["BigInt"]>
}

export type PoktEarnByChain = {
  __typename?: "PoktEarnByChain"
  chain: Scalars["String"]
  pokt: Scalars["Float"]
  relays: Scalars["Float"]
  validators_avg: Scalars["Float"]
}

export type PoktEarnPerformance = {
  __typename?: "PoktEarnPerformance"
  last_block: Scalars["BigInt"]
  producer?: Maybe<ValidatorEarnPerformance>
  servicer?: Maybe<ServicerEarnPerformance>
}

export type PoktNetworkStatus = {
  __typename?: "PoktNetworkStatus"
  height: Scalars["Int"]
  is_sync: Scalars["Boolean"]
  network_height: Scalars["Int"]
  time: Scalars["String"]
}

export type Query = {
  __typename?: "Query"
  /**
   * list accounts (wallets), you can pass the page number, limit of items per page, sort by accounts properties and filter.
   *
   * Sort example: [{"property": "amount","direction": -1}]
   *
   * Filter example: "["amount",">",5000000000]" (for 5,000.00 POKT)
   *
   * Page example: 1
   *
   * Limit example: 25
   */
  accounts?: Maybe<AccountList>
  /**
   * list apps, you can pass the page number, limit of items per page, sort by apps properties and filter.
   *
   * Sort example: [{"property": "height","direction": -1}]
   *
   * Filter example: "[["chains","contains","0049"],"or",["chains","contains","0040"]]"
   *
   * Page example: 1
   *
   * Limit example: 25
   */
  apps?: Maybe<AppList>
  /**
   * list transactions, you can pass the page number, limit of items per page, sort by transactions properties and filter.
   *
   * Sort example: [{"property": "height","direction": 1}]
   *
   * Filter example: "[["height",">=",58248],"and",["producer","=","bee8db258cff5b7cc4e8ed4a6b18ded28f45c66e"]]" (to get all in and out txs to an address)
   *
   * Page example: 1
   *
   * Limit example: 25
   */
  blocks?: Maybe<BlockList>
  /**
   * Get one account by it address or public_key.
   *
   * We use this query to show the info of account details.
   */
  getAccount?: Maybe<Account>
  /**
   * Get the nodes addresses grouped by the output address that they aim to.
   * You can pass the addresses, output address, partial url or domain.
   */
  getAddressesByOutputAddressForNodeSelection?: Maybe<Array<Maybe<NodesOfOutputAddress>>>
  /**
   * Get one app by it address or public_key.
   *
   * We use this query to show the info of app details.
   */
  getApp?: Maybe<App>
  /**
   * Get number and tokens of apps by status (staked, unstaking or unstaked) summarized by the time aggregation specified
   * in the date range selected (from and to).
   * We use this query on Explore page's network stats tab to show the data of Nodes Chart.
   * Variables example: {
   *   "timeSeriesAggregation": "day",
   *   "from": "2022-04-06",
   *   "to": "2022-05-06"
   * }
   */
  getAppsByStatusTimeseries?: Maybe<Array<Maybe<AppByStatusTimeSeriesUnit>>>
  /**
   * Get one block by it height.
   *
   * We use this query to show the info of block details.
   */
  getBlock?: Maybe<Block>
  /**
   * Get rewards grouped by chains (that means you will get rewards for each chain) in the selected date range
   * (from and to) and summarized by the aggregation specified (example: day).
   *
   * We use this query to show the data in the By Chains Chart on Explore page's rewards tab.
   *
   * Variables example:
   *
   * "from": "2022-04-06",
   *
   * "to": "2022-05-06",
   *
   * "timeSeriesAggregation": "day"
   */
  getChainsRewards?: Maybe<ChainsRewards>
  /**
   * Get the total of pokt and relays by chain in the date range selected.
   *
   * Variables example:
   *
   * "from": "2022-04-06",
   *
   * "to": "2022-05-06"
   */
  getChainsTotals: ChainsRelays
  /**
   * Get the network performance comparing the actual network values
   * and the values of the previous segment you specify.
   *
   * We use this query to show the info of Network Performance on dashboard page.
   *
   * Variables example: {from: "2022-05-06T16:07:19.203Z", segment: "daily"}.
   */
  getNetworkPerformance?: Maybe<NetworkPerformance>
  /**
   * Get one node specifying the address, public key or service_url.
   * We use this query to show the info of node details.
   */
  getNode?: Maybe<Node>
  /**
   * Get errors of nodes.
   *
   * We use this query to show the data of Errors table on node detail.
   *
   * Variables example:
   *
   * "address": "2057b1ba36e3ff7823459bc9833b6bff218e5063",
   *
   * "page": 1,
   *
   * "limit": 10
   */
  getNodeErrors?: Maybe<NodeErrorList>
  /**
   * Get history of changes of one node.
   *
   * property is the property that change, from_value is the previous value
   * and to_value is the value of that property in that height.
   *
   * We use this query to show the info of History table on node details.
   */
  getNodeHistory?: Maybe<HistoryList>
  /**
   * Get node relays records with address, relays, pokts (amount), chain and more.
   *
   * If you specified fromHeight or toHeight, height will not be considered.
   *
   * Variables example:
   *
   * "input": {
   *
   * "addresses": ["da1b87226b2f6dd6f85c7f91bb74364b70999836"],
   *
   * "height": [55864],
   *
   * "page": 1,
   *
   * "perPage": 25,
   *
   * "sortBy": "height",
   *
   * "sortDirection": "desc"
   *
   * }
   */
  getNodeRelays?: Maybe<NodeRelaysList>
  /**
   * Get node rewards performance by addresses, output address, partial url or domain.
   *
   * We use this query to show the data of Node Runner page's performance tab.
   *
   * Variables example:
   *
   * "domain": "poktscan.net",
   *
   * "addresses": ["da1b87226b2f6dd6f85c7f91bb74364b70999836"],
   *
   * "output_address": "da1b87226b2f6dd6f85c7f91bb74364b70999836",
   *
   * "partial_url": "poktscan.n",
   *
   * "search": "",
   *
   * "page": 1,
   *
   * "limit": 25,
   *
   * "filter": "["balance",">",500]",
   *
   * "sort": [{"property": "balance","direction": -1}]
   */
  getNodeRewardsPerformance?: Maybe<NodesPerformanceList>
  getNodeRunnerClientSummary?: Maybe<ClientSummary>
  /**
   * Get a summary of the nodes specifying their addresses, output address, partial url or domain.
   *
   * We use this query to show the data of Summary card on Node Runner page.
   *
   * Variables example:
   *
   * "domain": "poktscan.net",
   *
   * "addresses": ["da1b87226b2f6dd6f85c7f91bb74364b70999836"]
   *
   * "partial_url": "poktscan.n",
   *
   * "output_address": "da1b87226b2f6dd6f85c7f91bb74364b70999836"
   */
  getNodeRunnerSummary?: Maybe<NodeRunnerSummary>
  /**
   * Get number and tokens of nodes by jailed and status (staked, unstaking or unstaked)
   * summarized by the time aggregation specified in the date range selected (from and to).
   *
   * We use this query on Explore page's network stats tab to show the data of Apps Chart.
   *
   * Variables example:
   *
   * "timeSeriesAggregation": "day",
   *
   * "from": "2022-04-06",
   *
   * "to": "2022-05-06"
   */
  getNodesByStatusTimeseries?: Maybe<Array<Maybe<NodeByStatusTimeSeriesUnit>>>
  /** Get nodes staked of the domain specified. */
  getNodesStakedCountOfDomain?: Maybe<NodeStakedCount>
  /**
   * Get pokt earn performance report starting from last block.
   *
   * We use this query to show the info of Pocket Earned section on Performance card in Dashboard page.
   */
  getPoktEarnPerformance?: Maybe<PoktEarnPerformance>
  /**
   * Get total of relays and pokt grouped by chains for the date range specified.
   *
   * We use this query along with the getValidatorsByChain query to show the
   * data on Earn By Chain Table on Explore page's rewards tab.
   *
   * Variables examples: {from: "2022-04-26", to: "2022-05-06"}
   */
  getPoktEarnPerformanceByChain: Array<PoktEarnByChain>
  /**
   * Get if poktscan is synced with pokt network.
   * Height is the poktscan height.
   *
   * We use this query to know and show if our site is synced in the app bar.
   */
  getPoktNetworkStatus?: Maybe<PoktNetworkStatus>
  /**
   * Get relays and pokt data (this query is the one we use on our Relays chart on dashboard page).
   *
   * You will get data summarized by chains and unit times (like days, hours, months and years) and you
   * can specify the date range (from and to).
   *
   * Variables example: {
   *   "timeSeriesAggregation": "day",
   *   "from": "2022-04-06",
   *   "to": "2022-05-06"
   * }
   */
  getRelays?: Maybe<RelayReport>
  /**
   * Get relays performance report starting from last block.
   *
   * We use this query to show the info of Relays section on Performance card in Dashboard page.
   */
  getRelaysPerformance?: Maybe<RelaysPerformance>
  /**
   * Get rewards by the specified chains in the selected date range (from and to) and summarized by the time aggregation specified (example: day).
   *
   * We use this query to show the data in the By Nodes Chart on Explore page's rewards tab.
   *
   * Variable example:
   *
   * "chains": ["0009","0040","0027","0021"],
   *
   * "timeSeriesAggregation": "day",
   *
   * "from": "2022-04-06",
   *
   * "to": "2022-05-06"
   */
  getRewardsByChain?: Maybe<RewardByChainReport>
  /**
   * Get rewards report by addresses, output address, partial url or domain.
   * in the date range specified and summarized by month or year.
   *
   * We use this query to show the data of Node Runner page's rewards tab.
   *
   * Variables example:
   *
   * "domain": "poktscan.net",
   *
   * "addresses": ["da1b87226b2f6dd6f85c7f91bb74364b70999836"],
   *
   * "output_address": "da1b87226b2f6dd6f85c7f91bb74364b70999836",
   *
   * "partial_url": "poktscan.n",
   *
   * "by": "month",
   *
   * "from": "2022-02-01T00:00:00.000-04:00",
   *
   * "to": "2022-05-06T13:59:59.999-04:00"
   */
  getRewardsReport?: Maybe<RewardsReport>
  /**
   * Get the amount of nodes by stake weight.
   *
   * You can pass a block height. If you do not pass a block height, the last block will be considered.
   */
  getServicerStakeWeightDistribution?: Maybe<ServicerStakeWeightDistributionResponse>
  /**
   * Get the amount of nodes by stake weight by specifying their addresses, output address, partial url or domain.
   *
   * We use this query to show the data of Summary card on Node Runner page.
   *
   * Variables example:
   *
   * "domain": "poktscan.net",
   *
   * "addresses": ["da1b87226b2f6dd6f85c7f91bb74364b70999836"]
   *
   * "partial_url": "poktscan.n",
   *
   * "output_address": "da1b87226b2f6dd6f85c7f91bb74364b70999836"
   */
  getServicerStakeWeightDistributionForSelection?: Maybe<ServicerStakeWeightDistributionResponse>
  /**
   * Get the top chains performance comparing the actual chain relays and the
   * relays of the previous segment you specify.
   *
   * Variable example: {from: "2022-05-06T16:07:19.203Z", segment: "daily"}.
   *
   * We use this query to show the info of Chains Performance on dashboard page.
   */
  getTopChainsPerformance?: Maybe<TopChainsPerformance>
  /**
   * Get the top chains performance of the selected addresses, output address, partial url or domain.
   * comparing the actual chain relaysand the relays of the previous 24hrs.
   *
   * We use this query to show the info of Chains Performance on dashboard page.
   *
   * Variables example:
   *
   * "domain": "poktscan.net",
   *
   * "addresses": ["da1b87226b2f6dd6f85c7f91bb74364b70999836"],
   *
   * "output_address": "da1b87226b2f6dd6f85c7f91bb74364b70999836",
   *
   * "partial_url": "poktscan.n",
   *
   * "to": "2022-05-06T13:59:59.999-04:00"
   */
  getTopChainsPerformanceByAddress?: Maybe<TopChainsPerformanceByAddress>
  /**
   * Get one transaction by it hash.
   *
   * We use this query to show the info of transaction details.
   */
  getTransaction?: Maybe<Transaction>
  /**
   * Get the amount of nodes divided by segments (ranges) of the staked tokens by specifying their addresses, output address, partial url or domain.
   * Each range have the length of the average unless is the first and last segment.
   *
   * We use this query to show the data of Summary card on Node Runner page.
   *
   * Variables example:
   *
   * "domain": "poktscan.net",
   *
   * "addresses": ["da1b87226b2f6dd6f85c7f91bb74364b70999836"]
   *
   * "partial_url": "poktscan.n",
   *
   * "output_address": "da1b87226b2f6dd6f85c7f91bb74364b70999836"
   */
  getValidatorStakeDistributionForSelection: Array<Maybe<ValidatorsStakedDistribution>>
  /**
   * Get number of validators by chains for the date range specified.
   *
   * We use this query along with the getPoktEarnPerformanceByChain query
   * to show the data on Earn By Chain Table on Explore page's rewards tab.
   *
   * Variables examples: {from: "2022-04-26", to: "2022-05-06"}
   */
  getValidatorsByChain: Array<ValidatorsByChain>
  /**
   * Get the total relays rewards of the selected validators (nodes) in the date range specified.
   *
   * Variables examples:
   *
   * "addresses": ["da1b87226b2f6dd6f85c7f91bb74364b70999836"],
   *
   * "from": "2022-04-06T13:59:59.999-04:00",
   *
   * "to": "2022-05-06T13:59:59.999-04:00"
   */
  getValidatorsRewards?: Maybe<Array<Maybe<NodeTotalRewardReport>>>
  /**
   * Get rewards by the specified chains for the validators specified on addresses in the
   * selected date range (from and to) and summarized by the time aggregation specified (example: day).
   *
   * We use this query to show data on By Nodes and By Chains Charts on Explore page's
   * rewards tab when nodes are selected.
   *
   * Variables example:
   *
   * "from": "2022-04-06T00:00:00.000Z",
   *
   * "to": "2022-05-06T23:59:59.999Z",
   *
   * "timeSeriesAggregation": "day",
   *
   * "chains": ["0009","0040","0027","0021"],
   *
   * "addresses": ["a8eff730df5079d371444a99ef75b1d8ebf10e90"]
   */
  getValidatorsRewardsByChain?: Maybe<RewardByChainReport>
  /**
   * Get the amount of nodes divided by segments (ranges) of the staked tokens.
   * Each range have the length of the average unless is the first and last segment.
   */
  getValidatorsStakedTokensDistribution: Array<Maybe<ValidatorsStakedDistribution>>
  /**
   * Get the latest block on the network with the validator threshold.
   *
   * We use this query to show the data of the Latest Block card on Dashboard page.
   */
  highestBlock?: Maybe<BlockItem>
  /**
   * Get data of nodes grouped by largest node runners (domains). Tokens are in uPOKT.
   *
   * We use this query to show the info of Node Runners card in Dashboard page.
   */
  largestNodeRunners?: Maybe<LargestNodeRunnersList>
  /**
   * list nodes, you can pass the page number, limit of items per page, sort by nodes properties and filter.
   *
   * Sort example: [{"property": "height","direction": -1}]
   *
   * Filter example: "["service_domain","=","poktscan.net"]"
   *
   * Page example: 1
   *
   * Limit example: 25
   */
  nodes?: Maybe<NodeList>
  /** Get consensus data of nodes (nodes by versions) */
  nodesConsensusData?: Maybe<NodeConsensusList>
  /**
   * Get a summary of nodes grouped by their country.
   *
   * We use this query to show the info of Node Locations card in Dashboard page.
   */
  nodesGeoLocationData?: Maybe<NodeGeoList>
  /**
   * Get a summary of nodes grouped by their version.
   *
   * We use this query to show the info of Versions Chart on Explore page's network stats tab.
   */
  nodesVersionData?: Maybe<NodeVersionList>
  /**
   * Search for nodes, accounts, blocks and transactions. Variable examples to search:
   *
   * Blocks: {"contains": "58551","type": "height"}
   *
   * Nodes: {"contains": "bee8db258cff5b7cc4e8ed4a6b18ded28f45c66e","type": "address"}
   *
   * Accounts: {"contains": "48d09634b4ca1ba8e7f6a2e70aace5c6f08580ab","type": "address"}
   *
   * Transactions: {"contains": "244058FC9501882447AEC57715A40849F9971037E720E9C3ED54DA3E9CC5BB8A","type": "hash"}
   *
   * Unknown: {contains: "sfsdsdf", type: "unknown"}
   */
  search?: Maybe<Array<Maybe<SearchEntry>>>
  /**
   * list transactions, you can pass the page number, limit of items per page, sort by transactions properties and filter.
   *
   * Sort example: [{"property": "height","direction": 1}]
   *
   * Filter example: "[["from_address","=","c2364214fc387aa3bb9cb253dea8902fff2aa691"],"or",["to_address","=","c2364214fc387aa3bb9cb253dea8902fff2aa691"]]"
   *
   * Page example: 1
   *
   * Limit example: 25
   */
  transactions?: Maybe<TransactionList>
  /**
   * It's the same of transactions query, only differ in this query only search for
   * transactions of type send (transfers).
   *
   * We use this query to show transfers on node, app and account details.
   */
  transfers?: Maybe<TransferList>
}

export type QueryAccountsArgs = {
  filter?: InputMaybe<Scalars["String"]>
  limit: Scalars["Int"]
  page: Scalars["Int"]
  search: Scalars["String"]
  sort?: InputMaybe<Array<SortInput>>
}

export type QueryAppsArgs = {
  filter?: InputMaybe<Scalars["String"]>
  limit: Scalars["Int"]
  page: Scalars["Int"]
  search: Scalars["String"]
  sort?: InputMaybe<Array<SortInput>>
}

export type QueryBlocksArgs = {
  filter?: InputMaybe<Scalars["String"]>
  limit: Scalars["Int"]
  page: Scalars["Int"]
  search: Scalars["String"]
  sort?: InputMaybe<Array<SortInput>>
}

export type QueryGetAccountArgs = {
  address?: InputMaybe<Scalars["ID"]>
  public_key?: InputMaybe<Scalars["ID"]>
}

export type QueryGetAddressesByOutputAddressForNodeSelectionArgs = {
  addresses?: InputMaybe<Array<Scalars["String"]>>
  domain?: InputMaybe<Scalars["String"]>
  partial_url?: InputMaybe<Scalars["String"]>
}

export type QueryGetAppArgs = {
  address?: InputMaybe<Scalars["ID"]>
  public_key?: InputMaybe<Scalars["ID"]>
}

export type QueryGetAppsByStatusTimeseriesArgs = {
  from: Scalars["String"]
  interval?: InputMaybe<Scalars["BigInt"]>
  timeSeriesAggregation?: InputMaybe<TimeSeriesAggregation>
  to: Scalars["String"]
}

export type QueryGetBlockArgs = {
  height: Scalars["BigInt"]
}

export type QueryGetChainsRewardsArgs = {
  from: Scalars["String"]
  interval?: InputMaybe<Scalars["BigInt"]>
  timeSeriesAggregation?: InputMaybe<TimeSeriesAggregation>
  to: Scalars["String"]
}

export type QueryGetChainsTotalsArgs = {
  from: Scalars["String"]
  to: Scalars["String"]
}

export type QueryGetNetworkPerformanceArgs = {
  from: Scalars["String"]
  segment: Segment
}

export type QueryGetNodeArgs = {
  address?: InputMaybe<Scalars["ID"]>
  public_key?: InputMaybe<Scalars["ID"]>
  service_url?: InputMaybe<Scalars["ID"]>
}

export type QueryGetNodeErrorsArgs = {
  addresses: Array<Scalars["String"]>
  limit: Scalars["Int"]
  page: Scalars["Int"]
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>
}

export type QueryGetNodeHistoryArgs = {
  address: Scalars["ID"]
  limit: Scalars["Int"]
  page: Scalars["Int"]
}

export type QueryGetNodeRelaysArgs = {
  input?: InputMaybe<NodeRelaysInput>
}

export type QueryGetNodeRewardsPerformanceArgs = {
  addresses?: InputMaybe<Array<Scalars["String"]>>
  domain?: InputMaybe<Scalars["String"]>
  filter?: InputMaybe<Scalars["String"]>
  limit: Scalars["Int"]
  output_address?: InputMaybe<Scalars["String"]>
  page: Scalars["Int"]
  partial_url?: InputMaybe<Scalars["String"]>
  search: Scalars["String"]
  sort?: InputMaybe<Array<SortInput>>
}

export type QueryGetNodeRunnerClientSummaryArgs = {
  client_id: Scalars["String"]
}

export type QueryGetNodeRunnerSummaryArgs = {
  addresses?: InputMaybe<Array<Scalars["String"]>>
  domain?: InputMaybe<Scalars["String"]>
  output_address?: InputMaybe<Scalars["String"]>
  partial_url?: InputMaybe<Scalars["String"]>
}

export type QueryGetNodesByStatusTimeseriesArgs = {
  from: Scalars["String"]
  interval?: InputMaybe<Scalars["BigInt"]>
  timeSeriesAggregation?: InputMaybe<TimeSeriesAggregation>
  to: Scalars["String"]
}

export type QueryGetNodesStakedCountOfDomainArgs = {
  domain: Scalars["String"]
}

export type QueryGetPoktEarnPerformanceByChainArgs = {
  from: Scalars["String"]
  to: Scalars["String"]
}

export type QueryGetRelaysArgs = {
  addresses?: InputMaybe<Array<Scalars["String"]>>
  chains?: InputMaybe<Array<Scalars["String"]>>
  from: Scalars["String"]
  interval?: InputMaybe<Scalars["BigInt"]>
  timeSeriesAggregation?: InputMaybe<TimeSeriesAggregation>
  to: Scalars["String"]
}

export type QueryGetRewardsByChainArgs = {
  chains: Array<Scalars["String"]>
  from: Scalars["String"]
  interval?: InputMaybe<Scalars["BigInt"]>
  timeSeriesAggregation?: InputMaybe<TimeSeriesAggregation>
  to: Scalars["String"]
}

export type QueryGetRewardsReportArgs = {
  addresses?: InputMaybe<Array<Scalars["String"]>>
  by?: InputMaybe<RewardReportBy>
  domain?: InputMaybe<Scalars["String"]>
  from: Scalars["String"]
  output_address?: InputMaybe<Scalars["String"]>
  partial_url?: InputMaybe<Scalars["String"]>
  to: Scalars["String"]
}

export type QueryGetServicerStakeWeightDistributionArgs = {
  height?: InputMaybe<Scalars["BigInt"]>
}

export type QueryGetServicerStakeWeightDistributionForSelectionArgs = {
  addresses?: InputMaybe<Array<Scalars["String"]>>
  domain?: InputMaybe<Scalars["String"]>
  output_address?: InputMaybe<Scalars["String"]>
  partial_url?: InputMaybe<Scalars["String"]>
}

export type QueryGetTopChainsPerformanceArgs = {
  from: Scalars["String"]
  segment: Segment
}

export type QueryGetTopChainsPerformanceByAddressArgs = {
  addresses?: InputMaybe<Array<Scalars["String"]>>
  domain?: InputMaybe<Scalars["String"]>
  from: Scalars["String"]
  output_address?: InputMaybe<Scalars["String"]>
  partial_url?: InputMaybe<Scalars["String"]>
}

export type QueryGetTransactionArgs = {
  hash: Scalars["ID"]
}

export type QueryGetValidatorStakeDistributionForSelectionArgs = {
  addresses?: InputMaybe<Array<Scalars["String"]>>
  domain?: InputMaybe<Scalars["String"]>
  output_address?: InputMaybe<Scalars["String"]>
  partial_url?: InputMaybe<Scalars["String"]>
}

export type QueryGetValidatorsByChainArgs = {
  from: Scalars["String"]
  to: Scalars["String"]
}

export type QueryGetValidatorsRewardsArgs = {
  addresses: Array<Scalars["String"]>
  from: Scalars["String"]
  to: Scalars["String"]
}

export type QueryGetValidatorsRewardsByChainArgs = {
  addresses: Array<Scalars["String"]>
  chains: Array<Scalars["String"]>
  from: Scalars["String"]
  interval?: InputMaybe<Scalars["BigInt"]>
  timeSeriesAggregation?: InputMaybe<TimeSeriesAggregation>
  to: Scalars["String"]
}

export type QueryNodesArgs = {
  filter?: InputMaybe<Scalars["String"]>
  limit: Scalars["Int"]
  page: Scalars["Int"]
  search: Scalars["String"]
  sort?: InputMaybe<Array<SortInput>>
}

export type QuerySearchArgs = {
  contains?: InputMaybe<Scalars["String"]>
  type?: InputMaybe<Scalars["String"]>
}

export type QueryTransactionsArgs = {
  filter?: InputMaybe<Scalars["String"]>
  limit: Scalars["Int"]
  page: Scalars["Int"]
  search: Scalars["String"]
  sort?: InputMaybe<Array<SortInput>>
}

export type QueryTransfersArgs = {
  filter?: InputMaybe<Scalars["String"]>
  limit: Scalars["Int"]
  page: Scalars["Int"]
  search: Scalars["String"]
  sort?: InputMaybe<Array<SortInput>>
}

export type QueryGetInput = {
  filter?: InputMaybe<Scalars["String"]>
}

export type QueryInput = {
  filter?: InputMaybe<Scalars["String"]>
  limit: Scalars["Int"]
  page: Scalars["Int"]
  projection?: InputMaybe<Scalars["String"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>
}

export type RelayChainReport = {
  __typename?: "RelayChainReport"
  chain: Scalars["String"]
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
}

export type RelayReport = {
  __typename?: "RelayReport"
  first: Scalars["BigInt"]
  first_time: Scalars["String"]
  last: Scalars["BigInt"]
  last_time: Scalars["String"]
  total_by_address: Array<Maybe<RelayTotalByAddress>>
  total_by_chain: Array<Maybe<RelayTotalByChain>>
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
  units: Array<RelayUnitReport>
}

export type RelayTotalByAddress = {
  __typename?: "RelayTotalByAddress"
  address: Scalars["String"]
  /** this address power over all address */
  power: Scalars["BigInt"]
  /** power inside of total_by_chain is the power of that chain over the other chains for the same address total */
  total_by_chain: Array<Maybe<RelayTotalByChain>>
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
}

export type RelayTotalByChain = {
  __typename?: "RelayTotalByChain"
  chain: Scalars["String"]
  /** this chain power over the other chains */
  power: Scalars["Float"]
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
}

export type RelayUnitReport = {
  __typename?: "RelayUnitReport"
  chains: Array<Maybe<RelayChainReport>>
  first: Scalars["BigInt"]
  first_time: Scalars["String"]
  last: Scalars["BigInt"]
  last_time: Scalars["String"]
  point: Scalars["String"]
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
}

export type RelaysPerformance = {
  __typename?: "RelaysPerformance"
  max_pokt: Scalars["Float"]
  max_relays: Scalars["BigInt"]
  thirty_day_pokt_avg: Scalars["Float"]
  thirty_day_relays_avg: Scalars["Float"]
  today_pokt: Scalars["Float"]
  today_relays: Scalars["BigInt"]
}

export type RewardByChainReport = {
  __typename?: "RewardByChainReport"
  first: Scalars["BigInt"]
  first_time: Scalars["String"]
  last: Scalars["BigInt"]
  last_time: Scalars["String"]
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
  units: Array<RewardByChainUnit>
}

export type RewardByChainUnit = {
  __typename?: "RewardByChainUnit"
  earn_avg: Scalars["Float"]
  point: Scalars["String"]
  point_id: Scalars["String"]
  total_pokt: Scalars["Float"]
  total_relays: Scalars["BigInt"]
  validators_avg: Scalars["Float"]
}

export enum RewardReportBy {
  Month = "month",
  Year = "year",
}

export type RewardsReport = {
  __typename?: "RewardsReport"
  total_fee: Scalars["Float"]
  total_jails: Scalars["BigInt"]
  total_net_tokens: Scalars["Float"]
  total_producer_tokens: Scalars["Float"]
  total_producers: Scalars["BigInt"]
  total_relays: Scalars["BigInt"]
  total_relays_tokens: Scalars["Float"]
  total_rewards: Scalars["Float"]
  total_tokens: Scalars["Float"]
  units: Array<Maybe<RewardsReportUnit>>
}

export type RewardsReportUnit = {
  __typename?: "RewardsReportUnit"
  avg_nodes_on_unit: Scalars["Float"]
  chains: Array<Scalars["String"]>
  jails: Scalars["Int"]
  nodes_added: Scalars["Int"]
  nodes_stacked_on_unit: Scalars["Float"]
  point_id: Scalars["String"]
  producers: Scalars["Int"]
  time: Scalars["String"]
  /**
   * on month filter, avg by day, on year filter, avg by month
   * total of month / total of days in the month
   * total of year / 12 (each month)
   */
  tokens_avg: Scalars["Float"]
  total_chains: Scalars["Int"]
  total_fee: Scalars["Float"]
  total_net_tokens: Scalars["Float"]
  total_producer_tokens: Scalars["Float"]
  total_relays: Scalars["BigInt"]
  total_relays_tokens: Scalars["Float"]
  total_rewards: Scalars["BigInt"]
  total_tokens: Scalars["Float"]
}

export type SearchEntry = {
  __typename?: "SearchEntry"
  address?: Maybe<Scalars["String"]>
  entity: Scalars["String"]
  hash?: Maybe<Scalars["String"]>
  height?: Maybe<Scalars["BigInt"]>
  meta?: Maybe<SearchEntryMeta>
  public_key?: Maybe<Scalars["String"]>
  service_domain?: Maybe<Scalars["String"]>
  service_url?: Maybe<Scalars["String"]>
}

export type SearchEntryMeta = {
  __typename?: "SearchEntryMeta"
  pending?: Maybe<Scalars["Boolean"]>
  result_code?: Maybe<Scalars["Int"]>
  service_domain?: Maybe<Scalars["String"]>
  service_url?: Maybe<Scalars["String"]>
  status?: Maybe<Scalars["Int"]>
  time?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
}

export enum Segment {
  Daily = "daily",
  Hourly = "hourly",
  Weekly = "weekly",
}

export type ServicedNodeRelays = {
  __typename?: "ServicedNodeRelays"
  address: Scalars["String"]
  relay_chain: Scalars["String"]
  total_relays?: Maybe<Scalars["BigInt"]>
  tx_claim?: Maybe<Scalars["String"]>
  tx_proof: Scalars["String"]
}

export type ServicerEarnPerformance = {
  __typename?: "ServicerEarnPerformance"
  thirty_days_max_pokt_avg?: Maybe<Scalars["Float"]>
  thirty_days_max_relays?: Maybe<Scalars["Float"]>
  thirty_days_max_relays_avg?: Maybe<Scalars["Float"]>
  thirty_days_max_stake_nodes_avg?: Maybe<Scalars["Float"]>
  thirty_days_pokt_avg?: Maybe<Scalars["Float"]>
  thirty_days_relays?: Maybe<Scalars["Float"]>
  thirty_days_relays_avg?: Maybe<Scalars["Float"]>
  thirty_days_stake_nodes_avg?: Maybe<Scalars["Float"]>
  twenty_fours_hs_less_pokt_avg?: Maybe<Scalars["Float"]>
  twenty_fours_hs_less_relays?: Maybe<Scalars["Float"]>
  twenty_fours_hs_less_relays_avg?: Maybe<Scalars["Float"]>
  twenty_fours_hs_less_stake_nodes_avg?: Maybe<Scalars["Float"]>
}

export type ServicerPip22Distribution = {
  __typename?: "ServicerPip22Distribution"
  /**
   * Average of the rewards (in POKT) in the last 24hs using as start point the time of the block selected.
   * Rewards is calculated in the following way: avg relays on last 24hs * node earning multiplier * weight.
   */
  avg_rewards_24hs?: Maybe<Scalars["Float"]>
  /**  Tokens (uPOKT) in which the segment ends. If is null that means the segment does not have an end.  */
  end?: Maybe<Scalars["BigInt"]>
  /**  Amount of nodes staked.  */
  nodes: Scalars["BigInt"]
  /**  Tokens (uPOKT) in which the segment starts.  */
  start: Scalars["BigInt"]
  /**  Stake weight of the segment.  */
  weight: Scalars["Float"]
}

export type ServicerStakeWeightDistributionResponse = {
  __typename?: "ServicerStakeWeightDistributionResponse"
  /**  height considered for the data  */
  height?: Maybe<Scalars["BigInt"]>
  /**  Multiplier to know how many POKT a node will receive for relays.  */
  node_earning_multiplier?: Maybe<Scalars["Float"]>
  segments: Array<Maybe<ServicerPip22Distribution>>
}

export enum SortDirectionNodeRelays {
  Asc = "asc",
  Desc = "desc",
}

export type SortInput = {
  direction?: InputMaybe<Scalars["Int"]>
  property?: InputMaybe<Scalars["String"]>
}

export enum SortPropertyNodeRelays {
  Address = "address",
  Amount = "amount",
  Chain = "chain",
  Height = "height",
  TotalRelays = "total_relays",
}

export type StakeByChain = {
  __typename?: "StakeByChain"
  amount: Scalars["BigInt"]
  chain: Scalars["String"]
}

export type StakeWeightSummary = {
  __typename?: "StakeWeightSummary"
  jailed: Scalars["BigInt"]
  staked_nodes: Scalars["BigInt"]
  tokens: Scalars["BigInt"]
  unstaking_nodes: Scalars["BigInt"]
  weight: Scalars["Float"]
}

export type Subscription = {
  __typename?: "Subscription"
  networkStatus?: Maybe<NetworkStatus>
  syncStart?: Maybe<SyncStart>
}

export type SyncStart = {
  __typename?: "SyncStart"
  height: Scalars["BigInt"]
  is_latest: Scalars["Boolean"]
}

export enum TimeSeriesAggregation {
  Day = "day",
  Hour = "hour",
  Month = "month",
  Week = "week",
  Year = "year",
}

export type TopChainPerformance = {
  __typename?: "TopChainPerformance"
  chain: Scalars["String"]
  network_percentage?: Maybe<Scalars["Float"]>
  performance: Scalars["Float"]
  relays: Scalars["BigInt"]
}

export type TopChainPerformanceByAddress = {
  __typename?: "TopChainPerformanceByAddress"
  chain: Scalars["String"]
  percentage?: Maybe<Scalars["Float"]>
  performance: Scalars["Float"]
  relays: Scalars["BigInt"]
}

export type TopChainsPerformance = {
  __typename?: "TopChainsPerformance"
  chains: Array<Maybe<TopChainPerformance>>
}

export type TopChainsPerformanceByAddress = {
  __typename?: "TopChainsPerformanceByAddress"
  chains: Array<Maybe<TopChainPerformanceByAddress>>
}

export type Transaction = {
  __typename?: "Transaction"
  _id: Scalars["ID"]
  amount?: Maybe<Scalars["BigInt"]>
  app_public_key?: Maybe<Scalars["String"]>
  block_time: Scalars["String"]
  chain?: Maybe<Scalars["String"]>
  claim_tx_hash?: Maybe<Scalars["String"]>
  expiration_height?: Maybe<Scalars["Int"]>
  from_address: Scalars["String"]
  hash: Scalars["String"]
  height: Scalars["Int"]
  index: Scalars["Int"]
  memo?: Maybe<Scalars["String"]>
  parse_time: Scalars["String"]
  pending?: Maybe<Scalars["Boolean"]>
  result_code: Scalars["Int"]
  session_height?: Maybe<Scalars["Int"]>
  to_address: Scalars["String"]
  total_fee: Scalars["Int"]
  total_pokt?: Maybe<Scalars["Float"]>
  total_proof?: Maybe<Scalars["String"]>
  type: Scalars["String"]
}

export type TransactionList = {
  __typename?: "TransactionList"
  items?: Maybe<Array<Maybe<Transaction>>>
  pageInfo: PageInfo
}

export type TransactionSearch = {
  __typename?: "TransactionSearch"
  hash?: Maybe<Scalars["String"]>
  height?: Maybe<Scalars["Int"]>
  pending?: Maybe<Scalars["Boolean"]>
  result_code?: Maybe<Scalars["Int"]>
  type?: Maybe<Scalars["String"]>
}

export type Transfer = {
  __typename?: "Transfer"
  _id: Scalars["ID"]
  amount: Scalars["BigInt"]
  block_time: Scalars["String"]
  fee: Scalars["Int"]
  from_address: Scalars["String"]
  height: Scalars["Int"]
  memo?: Maybe<Scalars["String"]>
  parse_time: Scalars["String"]
  pending?: Maybe<Scalars["Boolean"]>
  to_address: Scalars["String"]
  tx_hash: Scalars["String"]
  tx_result_code: Scalars["Int"]
}

export type TransferList = {
  __typename?: "TransferList"
  items?: Maybe<Array<Maybe<Transfer>>>
  pageInfo: PageInfo
}

export type ValidatorEarnPerformance = {
  __typename?: "ValidatorEarnPerformance"
  thirty_days_max_pokt_avg?: Maybe<Scalars["Float"]>
  thirty_days_pokt_avg?: Maybe<Scalars["Float"]>
  twenty_fours_hs_less_pokt_avg?: Maybe<Scalars["Float"]>
}

export type ValidatorsByChain = {
  __typename?: "ValidatorsByChain"
  chain: Scalars["String"]
  validators: Scalars["BigInt"]
}

export type ValidatorsStakedDistribution = {
  __typename?: "ValidatorsStakedDistribution"
  /**  Tokens (uPOKT) in which the segment ends.  */
  end: Scalars["BigInt"]
  /**  Amount of nodes validators.  */
  nodes: Scalars["BigInt"]
  /**  Number of the segment (basically an identifier).  */
  segment: Scalars["BigInt"]
  /**  Tokens (uPOKT) in which the segment starts.  */
  start: Scalars["BigInt"]
}

export type ValidatorsStakedTokensDistributionResponse = {
  __typename?: "ValidatorsStakedTokensDistributionResponse"
  /**  height considered for the data  */
  height?: Maybe<Scalars["BigInt"]>
  segments: Array<Maybe<ValidatorsStakedDistribution>>
}

export type GetRelaysAndPoktPerformanceQueryVariables = Exact<{ [key: string]: never }>

export type GetRelaysAndPoktPerformanceQuery = {
  __typename?: "Query"
  getRelaysPerformance?: {
    __typename: "RelaysPerformance"
    max_relays: any
    max_pokt: number
    thirty_day_relays_avg: number
    thirty_day_pokt_avg: number
    today_relays: any
    today_pokt: number
  } | null
  highestBlock?: {
    __typename?: "BlockItem"
    validatorThreshold?: number | null
    item?: {
      __typename?: "Block"
      height: number
      time: string
      producer: string
      took: number
      total_nodes: number
      total_apps: number
      total_accounts: number
      total_txs: number
      total_relays_completed?: number | null
    } | null
  } | null
}

export const GetRelaysAndPoktPerformanceDocument = gql`
  query getRelaysAndPoktPerformance {
    getRelaysPerformance {
      max_relays
      max_pokt
      thirty_day_relays_avg
      thirty_day_pokt_avg
      today_relays
      today_pokt
      __typename
    }
    highestBlock {
      item {
        height
        time
        producer
        took
        total_nodes
        total_apps
        total_accounts
        total_txs
        total_relays_completed
      }
      validatorThreshold
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
    getRelaysAndPoktPerformance(
      variables?: GetRelaysAndPoktPerformanceQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<GetRelaysAndPoktPerformanceQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetRelaysAndPoktPerformanceQuery>(
            GetRelaysAndPoktPerformanceDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "getRelaysAndPoktPerformance",
        "query",
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
