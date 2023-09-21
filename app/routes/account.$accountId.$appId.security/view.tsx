import { Divider } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { Box } from "@pokt-foundation/pocket-blocks"
import { useFetcher } from "@remix-run/react"
import { useReducer, useEffect } from "react"
import { SecurityActionData } from "./route"
import { DEFAULT_WHITELISTS, securityReducer } from "./utils/stateReducer"
import {
  BlockchainsQuery,
  PortalApp,
  WhitelistContractsV2,
  WhitelistMethodsV2,
} from "~/models/portal/sdk"
import { Blockchain } from "~/models/portal/sdk"
import ApprovedChains from "~/routes/account.$accountId.$appId.security/components/ApprovedChains"
import ChainWhitelist from "~/routes/account.$accountId.$appId.security/components/ChainWhitelist"
import PrivateSecretKey from "~/routes/account.$accountId.$appId.security/components/PrivateSecretKey"
import WhitelistOrigins from "~/routes/account.$accountId.$appId.security/components/WhitelistOrigins"
import WhitelistUserAgents from "~/routes/account.$accountId.$appId.security/components/WhitelistUserAgents"
import { LoaderDataStruct } from "~/utils/loader"

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
  const fetcher = useFetcher()

  useEffect(() => {
    console.log(state)

    // stop it from posting on initial load

    // fetcher.submit(
    //   {
    //     whitelist: JSON.stringify(state),
    //   },
    //   {
    //     method: "post",
    //   },
    // )
  }, [fetcher, state])

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
        approvedChainsIds={state.blockchains as string[]}
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
