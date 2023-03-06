import { Card as PBCard } from "@pokt-foundation/pocket-blocks"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export const Card: React.FC = ({ children }) => {
  return <PBCard className="pokt-card">{children}</PBCard>
}

export default Card
