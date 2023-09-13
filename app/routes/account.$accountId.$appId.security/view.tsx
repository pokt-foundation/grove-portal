import { Divider } from "@mantine/core"
import { Button, Text, Switch, Box, Stack } from "@pokt-foundation/pocket-blocks"
import { useNavigation } from "@remix-run/react"
import React, { useState } from "react"
import { LuPlus } from "react-icons/lu"
import { BlockchainsQuery } from "~/models/portal/sdk"
import { Blockchain, EndpointQuery } from "~/models/portal/sdk"
import ApprovedChains from "~/routes/account.$accountId.$appId.security/components/ApprovedChains"
import WhitelistUserAgents from "~/routes/account.$accountId.$appId.security/components/WhitelistUserAgents"
import useCommonStyles from "~/styles/commonStyles"

type SecurityViewProps = {
  endpoint: EndpointQuery["endpoint"]
  appId: string | undefined
  blockchains: BlockchainsQuery["blockchains"]
}

export const SecurityView = ({ endpoint, appId, blockchains }: SecurityViewProps) => {
  const navigation = useNavigation()

  const { classes: commonClasses } = useCommonStyles()

  const [secretKeyRequired, setSecretKeyRequired] = useState<boolean>(
    Boolean(endpoint.gatewaySettings.secretKeyRequired),
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

      <Stack align="flex-start" px={40} py={32}>
        <Text fw={600}>Whitelist Origins</Text>
        <Text>Limits requests to only the HTTP Origins specified.</Text>
        <Button
          className={commonClasses.grayOutlinedButton}
          color="gray"
          rightIcon={<LuPlus size={18} />}
          variant="outline"
        >
          Add
        </Button>
      </Stack>
      <Divider />

      <Stack align="flex-start" px={40} py={32}>
        <Text fw={600}>Whitelist Contracts</Text>
        <Text>Limits requests to the smart contract addresses specified.</Text>
        <Button
          className={commonClasses.grayOutlinedButton}
          color="gray"
          rightIcon={<LuPlus size={18} />}
          variant="outline"
        >
          Add
        </Button>
      </Stack>
      <Divider />
      <Stack align="flex-start" px={40} py={32}>
        <Text fw={600}>Whitelist Methods</Text>
        <Text>Limits requests to use specific RPC methods.</Text>
        <Button
          className={commonClasses.grayOutlinedButton}
          color="gray"
          rightIcon={<LuPlus size={18} />}
          variant="outline"
        >
          Add
        </Button>
      </Stack>
    </Box>
  )
}

export default SecurityView
