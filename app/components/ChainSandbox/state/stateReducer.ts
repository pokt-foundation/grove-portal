import { Blockchain, PortalApp } from "~/models/portal/sdk"
import { KeyValuePair } from "~/types/global"

export type ChainSandboxStateType = {
  selectedMethod?: string
  includeSecretKey: boolean
  selectedChain: Blockchain | null
  selectedApp: PortalApp | null
  responseData: any
  chainRestPath: string
  chainUrl: string
  requestPayload: string
  requestHeaders: KeyValuePair<string>
}

export type ChainSandboxActionType =
  | { type: "SET_SELECTED_METHOD"; payload: string | undefined }
  | { type: "SET_INCLUDE_SECRET_KEY"; payload: boolean }
  | { type: "SET_SELECTED_CHAIN"; payload: Blockchain | null }
  | { type: "SET_SELECTED_APP"; payload: PortalApp }
  | { type: "SET_RESPONSE_DATA"; payload: any }
  | { type: "SET_CHAIN_REST_PATH"; payload: string }
  | { type: "SET_CHAIN_URL"; payload: string }
  | { type: "SET_REQUEST_HEADERS"; payload: KeyValuePair<string> }
  | { type: "SET_REQUEST_PAYLOAD"; payload: string }
  | { type: "RESET_STATE" }

const reducer = (
  state: ChainSandboxStateType,
  action: ChainSandboxActionType,
): ChainSandboxStateType => {
  switch (action.type) {
    case "SET_SELECTED_METHOD":
      return { ...state, selectedMethod: action.payload }
    case "SET_INCLUDE_SECRET_KEY":
      return { ...state, includeSecretKey: action.payload }
    case "SET_SELECTED_CHAIN":
      return {
        ...state,
        selectedChain: action.payload,
        selectedMethod: undefined,
        chainRestPath: "",
      }
    case "SET_SELECTED_APP":
      return { ...state, selectedApp: action.payload }
    case "SET_RESPONSE_DATA":
      return { ...state, responseData: action.payload }
    case "SET_CHAIN_REST_PATH":
      return { ...state, chainRestPath: action.payload }
    case "SET_CHAIN_URL":
      return { ...state, chainUrl: action.payload }
    case "SET_REQUEST_HEADERS":
      return { ...state, requestHeaders: action.payload }
    case "SET_REQUEST_PAYLOAD":
      return { ...state, requestPayload: action.payload }
    case "RESET_STATE":
      return {
        ...state,
        selectedChain: null,
        responseData: undefined,
        selectedMethod: undefined,
        includeSecretKey: false,
        chainRestPath: "",
        chainUrl: "",
      }
    default:
      return state
  }
}

export default reducer
