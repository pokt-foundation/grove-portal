import { Maybe } from "graphql/jsutils/Maybe"
import { BlockchainWhitelist } from "./utils"
import { Whitelists, WhitelistContractsV2, WhitelistMethodsV2 } from "~/models/portal/sdk"

export type SecurityReducerActions =
  | { type: "origins-add"; payload: string[] }
  | { type: "origins-remove"; payload: string }
  | { type: "blockchains-add"; payload: string[] }
  | { type: "blockchains-remove"; payload: string }
  | { type: "userAgents-add"; payload: string[] }
  | { type: "userAgents-remove"; payload: string }
  | { type: "contracts-add"; payload: BlockchainWhitelist[] }
  | { type: "contracts-remove"; payload: BlockchainWhitelist }
  | { type: "methods-add"; payload: BlockchainWhitelist[] }
  | { type: "methods-remove"; payload: BlockchainWhitelist }

export const DEFAULT_WHITELISTS: Whitelists = {
  blockchains: [],
  contracts: [],
  methods: [],
  origins: [],
  userAgents: [],
}

export function securityReducer(state: Whitelists, action: SecurityReducerActions) {
  switch (action.type) {
    case "blockchains-add":
      return {
        ...state,
        blockchains: [...new Set([...state.blockchains, ...action.payload])],
      }
    case "blockchains-remove":
      return {
        ...state,
        blockchains: state.blockchains.filter((str) => str !== action.payload),
      }
    case "origins-add":
      return {
        ...state,
        origins: [...new Set([...state.origins, ...action.payload])],
      }
    case "origins-remove":
      return {
        ...state,
        origins: state.origins.filter((str) => str !== action.payload),
      }
    case "userAgents-add":
      return {
        ...state,
        userAgents: [...new Set([...state.userAgents, ...action.payload])],
      }
    case "userAgents-remove":
      return {
        ...state,
        userAgents: state.userAgents.filter((str) => str !== action.payload),
      }
    case "contracts-add":
      let payloadContracts = combineToType(
        action.payload,
        "whitelistValue",
        "contracts",
      ) as WhitelistContractsV2[]

      let combinedContracts = combineToType(
        [...state.contracts, ...payloadContracts],
        "contracts",
        "contracts",
      ) as WhitelistContractsV2[]

      return {
        ...state,
        contracts: combinedContracts,
      }
    case "contracts-remove":
      let changedContract = state.contracts.find(
        (contract) => contract?.blockchainID === action.payload.blockchainID,
      )

      if (!changedContract) return state

      changedContract.contracts = changedContract.contracts.filter(
        (str) => str !== action.payload.whitelistValue,
      )

      const updatedContracts = state.contracts.map((contract) => {
        if (contract?.blockchainID === changedContract?.blockchainID) {
          return changedContract
        } else return contract
      }) as WhitelistContractsV2[]

      return {
        ...state,
        contracts: updatedContracts,
      }
    case "methods-add":
      let payloadMethods = combineToType(
        action.payload,
        "whitelistValue",
        "methods",
      ) as WhitelistMethodsV2[]

      let combinedMethods = combineToType(
        [...state.methods, ...payloadMethods],
        "methods",
        "methods",
      ) as WhitelistMethodsV2[]

      return {
        ...state,
        methods: combinedMethods,
      }
    case "methods-remove":
      let changedMethod = state.methods.find(
        (contract) => contract?.blockchainID === action.payload.blockchainID,
      )

      if (!changedMethod) return state

      changedMethod.methods = changedMethod.methods.filter(
        (str) => str !== action.payload.whitelistValue,
      )

      const udpatedMethods = state.methods.map((contract) => {
        if (contract?.blockchainID === changedMethod?.blockchainID) {
          return changedMethod
        } else return contract
      }) as WhitelistMethodsV2[]

      return {
        ...state,
        methods: udpatedMethods,
      }
    default:
      return state
  }
}

const combineToType = (
  array:
    | BlockchainWhitelist[]
    | Maybe<WhitelistContractsV2>[]
    | Maybe<WhitelistMethodsV2>[],
  fromType: string,
  toType: string,
) => {
  let map = new Map<string, string[]>()

  array.forEach((list) => {
    if (!list) return
    // @ts-ignore
    let isArray = Array.isArray(list[fromType])
    let values = []
    if (isArray) {
      // @ts-ignore
      values = [...list[fromType]]
    } else {
      // @ts-ignore
      values = [list[fromType]]
    }

    if (map.has(list.blockchainID)) {
      let existingValues = map.get(list.blockchainID) as string[]
      values = [...existingValues, ...values]
    }
    map.set(list.blockchainID, values)
  })

  return Array.from(map, ([key, value]) => ({
    blockchainID: key,
    [toType]: value,
  }))
}
