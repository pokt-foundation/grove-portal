import { ChainMetadata, prefixFromChainId } from "~/utils/chainUtils"
import ChainWithImage from "~/components/application/ChainWithImage"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import styles from "./styles.css"
import Button from "~/components/shared/Button"
import { IconTrashcan } from "@pokt-foundation/ui"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }, ...TextInputLinks()]
}

type AppEndpointUrlProp = {
  chainId: string
  appId: string
  handleRemove: (chain: string) => void
}

export default function AppEndpointUrl({
  chainId,
  appId,
  handleRemove,
}: AppEndpointUrlProp) {
  if (!chainId) {
    return <></>
  }

  const {
    prefix = "",
    abbrv = "",
    name = "",
  } = prefixFromChainId(chainId) as ChainMetadata
  const endpoint = `https://${prefix}.gateway.pokt.network/v1/lb/${appId}`

  return (
    <div className="pokt-app-endpoint-url">
      <div className="pokt-app-endpoint-url-abbrv">
        <ChainWithImage chain={name} label={abbrv} />
      </div>
      <TextInput readOnly copy value={endpoint} />
      <Button
        className="pokt-app-endpoint-url-delete"
        onClick={() => handleRemove(chainId)}
      >
        <IconTrashcan />
      </Button>
    </div>
  )
}
