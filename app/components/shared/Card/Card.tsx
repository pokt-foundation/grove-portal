import { Card as PBCard } from "@pokt-foundation/pocket-blocks"
import React from "react"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <PBCard className="pokt-card">{children}</PBCard>
}

export default Card
