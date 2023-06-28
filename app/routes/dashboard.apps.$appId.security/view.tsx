import { Text, Group, Notification } from "@pokt-foundation/pocket-blocks"
import { Form, useActionData } from "@remix-run/react"
import { forwardRef, useEffect, useState } from "react"
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
import ErrorIcon from "~/components/Icons/ErrorIcon"
import SuccessIcon from "~/components/Icons/SuccessIcon"

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
  const [isNotificationShown, setIsNotificationShown] = useState(false)
  const actionData = useActionData()

  useEffect(() => {
    if (actionData && !isNotificationShown) {
      setTimeout(() => {
        setIsNotificationShown(true)
      }, 5000)
      setTimeout(() => {
        setIsNotificationShown(false)
      }, 10000)
    }
  }, [actionData])

  return (
    <div className="security">
      <Form method="post">
        <input name="appID" type="hidden" value={appId} />
        <SecretKeyCard endpoint={endpoint} />
        <WhitelistBlockchainsCard blockchains={blockchains} endpoint={endpoint} />
        <WhitelistUserAgentsCard endpoint={endpoint} />
        <WhitelistOriginsCard endpoint={endpoint} />
        <WhitelistContractsCard endpoint={endpoint} />
        <WhitelistMethodsCard endpoint={endpoint} />
      </Form>
      {isNotificationShown ? (
        <Notification
          icon={actionData.error ? <ErrorIcon /> : <SuccessIcon />}
          sx={{
            position: "sticky",
            bottom: "1em",
            margin: "0 auto",
            maxWidth: "200px",
          }}
        >
          {actionData.error ? "There was an error saving the changes" : "Changes saved"}
        </Notification>
      ) : null}
    </div>
  )
}

export default SecurityView
