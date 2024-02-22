import { Divider, Box } from "@mantine/core"
import { useFetcher } from "@remix-run/react"
import React, { useReducer, useEffect, useRef } from "react"
import ApprovedChains from "./components/ApprovedChains"
import ChainWhitelist from "./components/ChainWhitelist"
import PrivateSecretKey from "./components/PrivateSecretKey"
import WhitelistOrigins from "./components/WhitelistOrigins"
import WhitelistUserAgents from "./components/WhitelistUserAgents"
import { DEFAULT_WHITELISTS, securityReducer } from "./utils/stateReducer"
import useActionNotification, {
  ActionNotificationData,
} from "~/hooks/useActionNotification"
import { type Blockchain, type RoleName } from "~/models/portal/sdk"
import {
  BlockchainsQuery,
  PortalApp,
  WhitelistContracts,
  WhitelistMethods,
} from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type SecurityViewProps = {
  app: PortalApp
  blockchains: BlockchainsQuery["blockchains"]
  userRole: RoleName
}

export const SecurityView = ({ app, blockchains, userRole }: SecurityViewProps) => {
  const [state, dispatch] = useReducer(
    securityReducer,
    app.whitelists ?? DEFAULT_WHITELISTS,
  )
  const fetcher = useFetcher()
  const fetcherData = fetcher.data as ActionNotificationData
  const isInitialRender = useRef(true)
  const isReadOnly = userRole === "MEMBER"

  useActionNotification(fetcherData)

  // ٍRun effect only when state changes excluding the first render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
    } else {
      trackEvent({
        category: AnalyticCategories.app,
        action: AnalyticActions.app_settings_update,
        label: app.id,
      })
      fetcher.submit(
        {
          whitelist: JSON.stringify(state),
        },
        {
          method: "post",
        },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, app.id])

  return (
    <Box>
      <PrivateSecretKey
        readOnly={isReadOnly}
        secretKeyRequired={app.settings.secretKeyRequired as boolean}
      />
      <Divider />
      <ApprovedChains
        approvedChainsIds={state.blockchains as string[]}
        blockchains={blockchains as Blockchain[]}
        dispatch={dispatch}
        readOnly={isReadOnly}
      />
      <Divider />
      <WhitelistUserAgents
        dispatch={dispatch}
        readOnly={isReadOnly}
        whitelistUserAgents={state.userAgents as string[]}
      />
      <Divider />
      <WhitelistOrigins
        dispatch={dispatch}
        readOnly={isReadOnly}
        whitelistOrigins={state.origins as string[]}
      />
      <Divider />
      <ChainWhitelist
        blockchains={blockchains as Blockchain[]}
        dispatch={dispatch}
        readOnly={isReadOnly}
        type="contracts"
        whitelists={state.contracts as WhitelistContracts[]}
      />
      <Divider />
      <ChainWhitelist
        blockchains={blockchains as Blockchain[]}
        dispatch={dispatch}
        readOnly={isReadOnly}
        type="methods"
        whitelists={state.methods as WhitelistMethods[]}
      />
    </Box>
  )
}

export default SecurityView
