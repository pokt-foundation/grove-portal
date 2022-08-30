import styles from "./styles.css"
import ChainWithImage from "~/components/application/ChainWithImage"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { InputProps } from "~/components/shared/TextInput"
import { Blockchain } from "~/models/portal/sdk"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }, ...TextInputLinks()]
}
/* c8 ignore stop */

type AppEndpointUrlProp = InputProps & {
  chain: Blockchain | undefined | null
}

export default function AppEndpointUrl({ chain, ...props }: AppEndpointUrlProp) {
  if (!chain) {
    return <></>
  }

  return (
    <div className="pokt-app-endpoint-url">
      <div className="pokt-app-endpoint-url-abbrv">
        <ChainWithImage chain={chain.description} label={chain.ticker} />
      </div>
      <TextInput {...props} />
    </div>
  )
}
