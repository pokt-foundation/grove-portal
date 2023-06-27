import { Text, Group } from "@pokt-foundation/pocket-blocks"
import { useFetcher } from "@remix-run/react"
import { forwardRef } from "react"
import SecretKeyCard from "./components/SecretKeyCard/SecretKeyCard"
import WhitelistBlockchainsCard from "./components/WhitelistBlockchainsCard/WhitelistBlockchainsCard"
import WhitelistContractsCard from "./components/WhitelistContractsCard/WhitelistContractsCard"
import WhitelistMethodsCard from "./components/WhitelistMethodsCard/WhitelistMethodsCard"
import WhitelistOriginsCard from "./components/WhitelistOriginsCard/WhitelistOriginsCard"
import WhitelistUserAgentsCard from "./components/WhitelistUserAgentsCard/WhitelistUserAgentsCard"
import styles from "./styles.css"
import { links as AppEndpointUrlLinks } from "~/components/application/AppEndpointUrl"
import { links as CardLinks } from "~/components/Card"
import { BlockchainsQuery } from "~/models/portal/sdk"
import { EndpointQuery } from "~/models/portal/sdk"

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
  const securityAction = useFetcher()

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
