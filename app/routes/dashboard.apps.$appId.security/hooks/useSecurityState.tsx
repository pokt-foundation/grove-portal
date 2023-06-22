// useSecurityView.ts
import { useReducer, useEffect } from "react"
import { Maybe, WhitelistContracts, WhitelistMethods } from "~/models/portal/sdk"

type WhitelistContractType = Pick<WhitelistContracts, "blockchainID" | "contracts">
type WhitelistMethodType = Pick<WhitelistMethods, "blockchainID" | "methods">

type FormatData = {
  id: string
  inputValue: string
}

type State = {
  secretKeyRequired: boolean
  // whitelistBlockchains: string[]
  // whitelistUserAgents: string[]
  // whitelistOrigins: string[]
  // whitelistContracts: FormatData[]
  // whitelistMethods: FormatData[]
  // whitelistUserAgentsElement: string
  // whitelistOriginsElement: string
  // whitelistContractsInput: string
  // whitelistContractsDropdown: string
  // whitelistContractsError: boolean
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
  // | { type: "SET_WHITELIST_BLOCKCHAINS"; payload: string[] }
  // | { type: "SET_WHITELIST_USER_AGENTS"; payload: string[] }
  // | { type: "SET_WHITELIST_ORIGINS"; payload: string[] }
  // | { type: "SET_WHITELIST_CONTRACTS"; payload: FormatData[] }
  // | { type: "SET_WHITELIST_METHODS"; payload: FormatData[] }
  // | { type: "SET_WHITELIST_USER_AGENTS_ELEMENT"; payload: string }
  // | { type: "SET_WHITELIST_ORIGINS_ELEMENT"; payload: string }
  // | { type: "SET_WHITELIST_CONTRACTS_INPUT"; payload: string }
  // | { type: "SET_WHITELIST_CONTRACTS_DROPDOWN"; payload: string }
  // | { type: "SET_WHITELIST_CONTRACTS_ERROR"; payload: boolean }
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

const formatData = <T extends WhitelistContractType | WhitelistMethodType>(
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

const initialState = (endpoint: any): State => ({
  secretKeyRequired: Boolean(endpoint.gatewaySettings.secretKeyRequired),
  // whitelistBlockchains: endpoint.gatewaySettings.whitelistBlockchains as string[],
  // whitelistUserAgents: endpoint.gatewaySettings?.whitelistUserAgents as string[],
  // whitelistOrigins: endpoint.gatewaySettings?.whitelistOrigins as string[],
  // whitelistContracts: formatData<WhitelistContractType>(
  //   endpoint.gatewaySettings?.whitelistContracts,
  //   "contracts",
  // ),
  // whitelistMethods: formatData<WhitelistMethodType>(
  //   endpoint.gatewaySettings?.whitelistMethods,
  //   "methods",
  // ),
  // whitelistUserAgentsElement: "",
  // whitelistOriginsElement: "",
  // whitelistContractsInput: "",
  // whitelistContractsDropdown: "",
  // whitelistContractsError: false,
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
    // case "SET_WHITELIST_BLOCKCHAINS":
    //   return { ...state, whitelistBlockchains: action.payload }
    // case "SET_WHITELIST_USER_AGENTS":
    //   return { ...state, whitelistUserAgents: action.payload }
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

const useSecurityState = (endpoint: any, navigationState: string) => {
  const [state, dispatch] = useReducer(reducer, initialState(endpoint))

  useEffect(() => {
    if (navigationState === "idle") {
      dispatch({ type: "RESET_SAVE_MODALS_SHOWN" })
    }
  }, [navigationState])

  return [state, dispatch] as const
}

export default useSecurityState