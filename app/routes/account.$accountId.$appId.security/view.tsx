import { Divider } from "@mantine/core"
import { Box } from "@pokt-foundation/pocket-blocks"
import { useMemo } from "react"
import { BlockchainsQuery, PortalApp } from "~/models/portal/sdk"
import { Blockchain } from "~/models/portal/sdk"
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

export const SecurityView = ({ app, blockchains }: SecurityViewProps) => {
  const whiteListContracts = useMemo(
    () =>
      formatBlockchainWhitelist<WhitelistContract>(app.whitelists.contracts, "contracts"),
    [app.whitelists.contracts],
  )

  const whiteListMethods = useMemo(
    () => formatBlockchainWhitelist<WhitelistMethod>(app.whitelists.methods, "methods"),
    [app.whitelists.methods],
  )

  return (
    <Box>
      <PrivateSecretKey secretKeyRequired={app.settings.secretKeyRequired as boolean} />
      <Divider />
      <ApprovedChains
        approvedChainsIds={app.whitelists.blockchains as string[]}
        blockchains={blockchains as Blockchain[]}
      />
      <Divider />
      <WhitelistUserAgents whitelistUserAgents={app.whitelists.userAgents as string[]} />
      <Divider />
      <WhitelistOrigins whitelistOrigins={app.whitelists.origins as string[]} />
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
