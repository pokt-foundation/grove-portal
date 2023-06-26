import { useReducer, useEffect } from "react"
import {
  EndpointQuery,
  Maybe,
  WhitelistContracts,
  WhitelistMethods,
} from "~/models/portal/sdk"

export type WhitelistContractType = Pick<WhitelistContracts, "blockchainID" | "contracts">
export type WhitelistMethodType = Pick<WhitelistMethods, "blockchainID" | "methods">

export type FormatData = {
  id: string
  inputValue: string
}

type State = {
  secretKeyRequired: boolean
  whitelistBlockchains: string[]
  whitelistUserAgents: string[]
  whitelistUserAgentsInput: string
  whitelistOrigins: string[]
  whitelistOriginsInput: string
  whitelistContracts: FormatData[]
  whitelistContractsInput: string
  whitelistContractsDropdown: string
  // whitelistMethods: FormatData[]
  // whitelistMethodsInput: string
  // whitelistMethodsDropdown: string
  // whitelistMethodsError: boolean
  saveModalsShown: {
    isSecretKeySaveShown: boolean
    isApprovedChainsSaveShown: boolean
    isWhitelistUserAgentsSaveShown: boolean
    isWhitelistOriginsSaveShown: boolean
    isWhitelistContractsSaveShown: boolean
    isWhitelistMethodsSaveShown: boolean
  }
}

type Action =
  | { type: "SET_SECRET_KEY_REQUIRED"; payload: boolean }
  | { type: "SET_WHITELIST_BLOCKCHAINS"; payload: string[] }
  | { type: "SET_WHITELIST_USER_AGENTS"; payload: string[] }
  | { type: "SET_WHITELIST_USER_AGENTS_INPUT"; payload: string }
  | { type: "SET_WHITELIST_ORIGINS"; payload: string[] }
  | { type: "SET_WHITELIST_ORIGINS_INPUT"; payload: string }
  | { type: "SET_WHITELIST_CONTRACTS"; payload: FormatData[] }
  | { type: "SET_WHITELIST_CONTRACTS_INPUT"; payload: string }
  | { type: "SET_WHITELIST_CONTRACTS_DROPDOWN"; payload: string }
  // | { type: "SET_WHITELIST_METHODS"; payload: FormatData[] }
  // | { type: "SET_WHITELIST_METHODS_INPUT"; payload: string }
  // | { type: "SET_WHITELIST_METHODS_DROPDOWN"; payload: string }
  // | { type: "SET_WHITELIST_METHODS_ERROR"; payload: boolean }
  | {
      type: "SET_SAVE_MODAL_SHOWN"
      payload: {
        modal:
          | "isSecretKeySaveShown"
          | "isApprovedChainsSaveShown"
          | "isWhitelistUserAgentsSaveShown"
          | "isWhitelistOriginsSaveShown"
          | "isWhitelistContractsSaveShown"
          | "isWhitelistMethodsSaveShown"
        shown: boolean
      }
    }
  | { type: "RESET_SAVE_MODALS_SHOWN" }

export const formatData = <T extends WhitelistContractType | WhitelistMethodType>(
  data: Maybe<T>[],
  key: keyof T,
) => {
  return data.reduce((prev: FormatData[], curr) => {
    if (!curr) {
      return prev
    }
    const subArray = (curr[key] as unknown as string[]).reduce(
      (subPrev: FormatData[], subCurr) => {
        return [...subPrev, { id: curr.blockchainID, inputValue: subCurr }]
      },
      [],
    )
    return [...prev, ...subArray]
  }, [])
}

const initialState = (endpoint: EndpointQuery["endpoint"]): State => ({
  secretKeyRequired: Boolean(endpoint.gatewaySettings.secretKeyRequired),
  whitelistBlockchains: endpoint.gatewaySettings.whitelistBlockchains as string[],
  whitelistUserAgents: endpoint.gatewaySettings?.whitelistUserAgents as string[],
  whitelistUserAgentsInput: "",
  whitelistOrigins: endpoint.gatewaySettings?.whitelistOrigins as string[],
  whitelistOriginsInput: "",
  whitelistContracts: formatData<WhitelistContractType>(
    endpoint.gatewaySettings?.whitelistContracts,
    "contracts",
  ),
  whitelistContractsInput: "",
  whitelistContractsDropdown: "",
  // whitelistMethods: formatData<WhitelistMethodType>(
  //   endpoint.gatewaySettings?.whitelistMethods,
  //   "methods",
  // ),
  // whitelistMethodsInput: "",
  // whitelistMethodsDropdown: "",
  // whitelistMethodsError: false,
  saveModalsShown: {
    isSecretKeySaveShown: false,
    isApprovedChainsSaveShown: false,
    isWhitelistUserAgentsSaveShown: false,
    isWhitelistOriginsSaveShown: false,
    isWhitelistContractsSaveShown: false,
    isWhitelistMethodsSaveShown: false,
  },
})

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SECRET_KEY_REQUIRED":
      return { ...state, secretKeyRequired: action.payload }
    case "SET_WHITELIST_BLOCKCHAINS":
      return { ...state, whitelistBlockchains: action.payload }
    case "SET_WHITELIST_USER_AGENTS":
      return { ...state, whitelistUserAgents: action.payload }
    case "SET_WHITELIST_USER_AGENTS_INPUT":
      return { ...state, whitelistUserAgentsInput: action.payload }
    case "SET_WHITELIST_ORIGINS":
      return { ...state, whitelistOrigins: action.payload }
    case "SET_WHITELIST_ORIGINS_INPUT":
      return { ...state, whitelistOriginsInput: action.payload }
    case "SET_WHITELIST_CONTRACTS":
      return { ...state, whitelistContracts: action.payload }
    case "SET_WHITELIST_CONTRACTS_INPUT":
      return { ...state, whitelistContractsInput: action.payload }
    case "SET_WHITELIST_CONTRACTS_DROPDOWN":
      return { ...state, whitelistContractsDropdown: action.payload }
    // //... TODO: similar for other SET_... cases
    case "SET_SAVE_MODAL_SHOWN":
      return {
        ...state,
        saveModalsShown: {
          ...state.saveModalsShown,
          [action.payload.modal]: action.payload.shown,
        },
      }
    case "RESET_SAVE_MODALS_SHOWN":
      return {
        ...state,
        saveModalsShown: {
          isSecretKeySaveShown: false,
          isApprovedChainsSaveShown: false,
          isWhitelistUserAgentsSaveShown: false,
          isWhitelistOriginsSaveShown: false,
          isWhitelistContractsSaveShown: false,
          isWhitelistMethodsSaveShown: false,
        },
      }
    default:
      return state
  }
}

const useSecurityState = (
  endpoint: EndpointQuery["endpoint"],
  navigationState: string,
) => {
  const [state, dispatch] = useReducer(reducer, initialState(endpoint))

  useEffect(() => {
    if (navigationState === "idle") {
      dispatch({ type: "RESET_SAVE_MODALS_SHOWN" })
    }
  }, [navigationState])

  return [state, dispatch] as const
}

export default useSecurityState
