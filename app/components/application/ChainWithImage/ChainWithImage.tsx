import styles from "./styles.css"
import { getImageForChain } from "~/utils/known-chains/known-chains"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export interface AppEndpointProps {
  chain: string | undefined | null
  label?: string
}

export default function ChainWithImage({ chain, label }: AppEndpointProps) {
  if (!chain) return <></>

  const labelText = label ?? chain
  return (
    <span className="pokt-chain-with-image">
      {getImageForChain(chain) && <img alt={chain} src={getImageForChain(chain)} />}{" "}
      <span>{labelText}</span>
    </span>
  )
}
