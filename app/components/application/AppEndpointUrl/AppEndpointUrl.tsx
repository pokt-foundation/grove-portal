import styles from "./styles.css"
import ChainWithImage from "~/components/application/ChainWithImage"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { InputProps } from "~/components/shared/TextInput"
import { prefixFromChainId } from "~/utils/chainUtils"

/* c8 ignore next */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }, ...TextInputLinks()]
}

type AppEndpointUrlProp = InputProps & {
  chainId: string
}

export default function AppEndpointUrl({ chainId, ...props }: AppEndpointUrlProp) {
  if (!chainId) {
    return <></>
  }

  const chain = prefixFromChainId(chainId)

  if (!chain) {
    return <></>
  }

  const { abbrv, name } = chain

  return (
    <div className="pokt-app-endpoint-url">
      <div className="pokt-app-endpoint-url-abbrv">
        <ChainWithImage chain={name} label={abbrv} />
      </div>
      <TextInput {...props} />
    </div>
  )
}
