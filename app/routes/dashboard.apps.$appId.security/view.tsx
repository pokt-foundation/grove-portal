import {
  Button,
  Text,
  Switch,
  Loader,
  Group,
  Flex,
  useMantineTheme,
  TextInput,
  IconPlus,
  Box,
  Badge,
} from "@pokt-foundation/pocket-blocks"
import { useFetcher, useNavigation } from "@remix-run/react"
import { forwardRef } from "react"
import React from "react"
import useSecurityState, {
  FormatData,
  WhitelistContractType,
  WhitelistMethodType,
  formatData,
} from "./hooks/useSecurityState"
import styles from "./styles.css"
import AppEndpointUrl, {
  links as AppEndpointUrlLinks,
} from "~/components/application/AppEndpointUrl"
import Card, { links as CardLinks } from "~/components/Card"
import ChainsDropdown from "~/components/ChainsDropdown/ChainsDropdown"
import CopyText from "~/components/CopyText"
import Delete from "~/components/Delete/Delete"
import { useTranslate } from "~/context/TranslateContext"
import { Blockchain, BlockchainsQuery } from "~/models/portal/sdk"
import { EndpointQuery } from "~/models/portal/sdk"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getImageForChain } from "~/utils/known-chains/known-chains"
import SecretKeyCard from "./components/SecretKeyCard/SecretKeyCard"
import WhitelistBlockchainsCard from "./components/WhitelistBlockchainsCard/WhitelistBlockchainsCard"
import WhitelistUserAgentsCard from "./components/WhitelistUserAgentsCard/WhitelistUserAgentsCard"
import { addIfMissing } from "./utils/utils"
import WhitelistOriginsCard from "./components/WhitelistOriginsCard/WhitelistOriginsCard"
import WhitelistContractsCard from "./components/WhitelistContractsCard/WhitelistContractsCard"
import WhitelistMethodsCard from "./components/WhitelistMethodsCard/WhitelistMethodsCard"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), ...AppEndpointUrlLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

type SecurityViewProps = {
  endpoint: EndpointQuery["endpoint"]
  appId: string | undefined
  blockchains: BlockchainsQuery["blockchains"]
}

const SelectItem = forwardRef<HTMLDivElement, { label: string; value: string }>(
  ({ label, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Text>{label}</Text>
      </Group>
    </div>
  ),
)

SelectItem.displayName = "SelectItem"

export const SecurityView = ({ endpoint, appId, blockchains }: SecurityViewProps) => {
  const navigation = useNavigation()
  const { t } = useTranslate()
  const securityAction = useFetcher()
  const theme = useMantineTheme()

  const [state, dispatch] = useSecurityState(endpoint, navigation.state)

  const {
    saveModalsShown: {
      isSecretKeySaveShown,
      isApprovedChainsSaveShown,
      isWhitelistUserAgentsSaveShown,
      isWhitelistOriginsSaveShown,
      isWhitelistContractsSaveShown,
      isWhitelistMethodsSaveShown,
    },
    secretKeyRequired,
    whitelistBlockchains,
    whitelistUserAgents,
    whitelistUserAgentsInput,
    whitelistOrigins,
    whitelistOriginsInput,
    whitelistContracts,
    whitelistContractsInput,
    whitelistContractsDropdown,
    whitelistMethods,
    whitelistMethodsInput,
    whitelistMethodsDropdown,
  } = state

  return (
    <div className="security">
      <securityAction.Form action={`/api/${appId}/settings`} method="post">
        <input name="appID" type="hidden" value={appId} />
        <SecretKeyCard endpoint={endpoint} />
        <WhitelistBlockchainsCard blockchains={blockchains} endpoint={endpoint} />
        <WhitelistUserAgentsCard endpoint={endpoint} />
        <WhitelistOriginsCard endpoint={endpoint} />
        <WhitelistContractsCard endpoint={endpoint} />
        <WhitelistMethodsCard endpoint={endpoint} />
      </securityAction.Form>
    </div>
  )
}

export default SecurityView
