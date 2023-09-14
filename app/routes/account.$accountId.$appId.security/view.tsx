import { Divider } from "@mantine/core"
import { Box } from "@pokt-foundation/pocket-blocks"
import { useNavigation } from "@remix-run/react"
import React, { useMemo } from "react"
import { BlockchainsQuery } from "~/models/portal/sdk"
import { Blockchain, EndpointQuery } from "~/models/portal/sdk"
import ApprovedChains from "~/routes/account.$accountId.$appId.security/components/ApprovedChains"
import ChainWhitelist from "~/routes/account.$accountId.$appId.security/components/ChainWhitelist"
import PrivateSecretKey from "~/routes/account.$accountId.$appId.security/components/PrivateSecretKey"
import WhitelistOrigins from "~/routes/account.$accountId.$appId.security/components/WhitelistOrigins"
import WhitelistUserAgents from "~/routes/account.$accountId.$appId.security/components/WhitelistUserAgents"
import {
  formatBlockchainWhitelist,
  WhitelistContract,
  WhitelistMethod,
} from "~/routes/account.$accountId.$appId.security/utils"

type SecurityViewProps = {
  app: PortalApp
  blockchains: BlockchainsQuery["blockchains"]
}

export const SecurityView = ({ endpoint, appId, blockchains }: SecurityViewProps) => {
  const navigation = useNavigation()

  const whiteListContracts = useMemo(
    () =>
      formatBlockchainWhitelist<WhitelistContract>(
        endpoint.gatewaySettings?.whitelistContracts,
        "contracts",
      ),
    [endpoint.gatewaySettings?.whitelistContracts],
  )

  const whiteListMethods = useMemo(
    () =>
      formatBlockchainWhitelist<WhitelistMethod>(
        endpoint.gatewaySettings?.whitelistMethods,
        "methods",
      ),
    [endpoint.gatewaySettings?.whitelistMethods],
  )

  return (
    <Box>
      <PrivateSecretKey secretKeyRequired={endpoint.gatewaySettings.secretKeyRequired} />
      <Divider />
      <ApprovedChains
        approvedChainsIds={endpoint?.gatewaySettings?.whitelistBlockchains as string[]}
        blockchains={blockchains as Blockchain[]}
      />
      <Divider />
      <WhitelistUserAgents
        whitelistUserAgents={endpoint.gatewaySettings?.whitelistUserAgents as string[]}
      />
      <Divider />
      <WhitelistOrigins
        whitelistOrigins={endpoint.gatewaySettings?.whitelistOrigins as string[]}
      />
      <Divider />
      <ChainWhitelist
        blockchains={blockchains as Blockchain[]}
        type="contracts"
        whitelists={whiteListContracts}
      />
      <Divider />
      <ChainWhitelist
        blockchains={blockchains as Blockchain[]}
        type="methods"
        whitelists={whiteListMethods}
      />
    </Box>
  )
}

export default SecurityView
