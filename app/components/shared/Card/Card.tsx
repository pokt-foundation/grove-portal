import { Card as PBCard, CardProps as PBCardProps } from "@pokt-foundation/pocket-blocks"
import React from "react"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export const Card = ({
  children,
  ...props
}: { children: React.ReactNode } & PBCardProps) => {
  return (
    <PBCard className="pokt-card" {...props}>
      {children}
    </PBCard>
  )
}

export default Card
