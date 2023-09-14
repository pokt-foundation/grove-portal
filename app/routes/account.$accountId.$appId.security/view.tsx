import { Divider } from "@mantine/core"
import { Text, Switch, Box, Stack } from "@pokt-foundation/pocket-blocks"
import { useNavigation } from "@remix-run/react"
import React, { useMemo, useState } from "react"
import { BlockchainsQuery } from "~/models/portal/sdk"
import { Blockchain, EndpointQuery } from "~/models/portal/sdk"
import ApprovedChains from "~/routes/account.$accountId.$appId.security/components/ApprovedChains"
import ChainWhitelist from "~/routes/account.$accountId.$appId.security/components/ChainWhitelist"
import WhitelistOrigins from "~/routes/account.$accountId.$appId.security/components/WhitelistOrigins"
import WhitelistUserAgents from "~/routes/account.$accountId.$appId.security/components/WhitelistUserAgents"
import {
  formatBlockchainWhitelist,
  WhitelistContract,
  WhitelistMethod,
} from "~/routes/account.$accountId.$appId.security/utils"

type SecurityViewProps = {
  endpoint: EndpointQuery["endpoint"]
  appId: string | undefined
  blockchains: BlockchainsQuery["blockchains"]
}

export const SecurityView = ({ endpoint, appId, blockchains }: SecurityViewProps) => {
  const navigation = useNavigation()

  const [secretKeyRequired, setSecretKeyRequired] = useState<boolean>(
    Boolean(endpoint.gatewaySettings.secretKeyRequired),
  )

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
      <Stack px={40} py={32}>
        <Text fw={600}>Private Secret Key Required</Text>
        <Text>
          To maximize the security of your application, you should activate the private
          secret key for all requests and enable the use of whitelisted user-agents and
          origins.
        </Text>
        <Switch
          aria-label="Private Secret Key Required"
          checked={secretKeyRequired}
          id="secretRequired"
          name="secretKeyRequired"
          onChange={(event) => setSecretKeyRequired(event.currentTarget.checked)}
        />
      </Stack>
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
      <Divider />
    </Box>
  )
}

export default SecurityView
