import { Divider } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { Box } from "@pokt-foundation/pocket-blocks"
import { useReducer, useEffect, useMemo, ReducerState, ReducerAction } from "react"
import { SecurityActionData } from "./route"
import { blockchains } from "~/models/portal/portal.data"
import {
  BlockchainsQuery,
  PortalApp,
  WhitelistContractsV2,
  WhitelistMethodsV2,
  Whitelists,
  WhitelistsObject,
} from "~/models/portal/sdk"
import { Blockchain } from "~/models/portal/sdk"
import ApprovedChains from "~/routes/account.$accountId.$appId.security/components/ApprovedChains"
import ChainWhitelist from "~/routes/account.$accountId.$appId.security/components/ChainWhitelist"
import PrivateSecretKey from "~/routes/account.$accountId.$appId.security/components/PrivateSecretKey"
import WhitelistOrigins from "~/routes/account.$accountId.$appId.security/components/WhitelistOrigins"
import WhitelistUserAgents from "~/routes/account.$accountId.$appId.security/components/WhitelistUserAgents"
import { LoaderDataStruct } from "~/utils/loader"

export type SecurityReducerActions =
  | { type: "origins-add"; payload: string[] }
  | { type: "origins-remove"; payload: string }
  | { type: "blockchains-add"; payload: string[] }
  | { type: "blockchains-remove"; payload: string }
  | { type: "userAgents-add"; payload: string[] }
  | { type: "userAgents-remove"; payload: string }
  | { type: "contracts-add" }
  | { type: "contracts-remove" }
  | { type: "methods-add" }
  | { type: "methods-remove" }

const DEFAULT_WHITELISTS: Whitelists = {
  blockchains: [],
  contracts: [],
  methods: [],
  origins: [],
  userAgents: [],
}

function securityReducer(state: Whitelists, action: SecurityReducerActions) {
  let s

  switch (action.type) {
    case "blockchains-add":
      s = { ...state, blockchains: [...state.blockchains, ...action.payload] }
      break
    default:
      s = state
      break
  }

  // update db

  return s
}

type SecurityViewProps = {
  actionData?: LoaderDataStruct<SecurityActionData>
  app: PortalApp
  blockchains: BlockchainsQuery["blockchains"]
}

export const SecurityView = ({ actionData, app, blockchains }: SecurityViewProps) => {
  const [state, dispatch] = useReducer(
    securityReducer,
    app.whitelists ?? DEFAULT_WHITELISTS,
  )

  useEffect(() => {
    if (!actionData) return

    if ((actionData.data as SecurityActionData).app) {
      showNotification({
        message: "Security setting successfully updated",
      })
    }
  }, [actionData])

  return (
    <Box>
      <PrivateSecretKey secretKeyRequired={app.settings.secretKeyRequired as boolean} />
      <Divider />
      <ApprovedChains
        approvedChainsIds={app.whitelists.blockchains as string[]}
        blockchains={blockchains as Blockchain[]}
        dispatch={dispatch}
      />
      <Divider />
      <WhitelistUserAgents
        dispatch={dispatch}
        whitelistUserAgents={state.userAgents as string[]}
      />
      <Divider />
      <WhitelistOrigins
        dispatch={dispatch}
        whitelistOrigins={state.origins as string[]}
      />
      <Divider />
      <ChainWhitelist
        blockchains={blockchains as Blockchain[]}
        dispatch={dispatch}
        type="contracts"
        whitelists={state.contracts as WhitelistContractsV2[]}
      />
      <Divider />
      <ChainWhitelist
        blockchains={blockchains as Blockchain[]}
        dispatch={dispatch}
        type="methods"
        whitelists={state.methods as WhitelistMethodsV2[]}
      />
    </Box>
  )
}

export default SecurityView
