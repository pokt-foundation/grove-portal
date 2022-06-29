import { prefixFromChainId } from "~/utils/chainUtils"
import ChainWithImage from "~/components/application/ChainWithImage"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import styles from "./styles.css"
import Button from "~/components/shared/Button"
import { IconTrashcan } from "@pokt-foundation/ui"

/* c8 ignore next */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }, ...TextInputLinks()]
}

type AppEndpointUrlProp = {
  chainId: string
  inputValue: string
  hasDelete: boolean
  handleRemove: (chain: string) => void
}

export default function AppEndpointUrl({
  chainId,
  inputValue,
  hasDelete,
  handleRemove,
}: AppEndpointUrlProp) {
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
      <TextInput
        copy
        readOnly
        hasDelete={hasDelete}
        handleRemove={() => handleRemove(chainId)}
        value={inputValue}
      />
    </div>
  )
}
