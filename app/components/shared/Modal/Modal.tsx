import { Modal as MantineModal, ModalProps } from "@mantine/core"
import { Group } from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import React from "react"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export default function Modal({ ...props }: ModalProps) {
  return (
    <MantineModal
      centered={true}
      className={clsx({
        "pokt-modal": true,
      })}
      size={props.size ?? 704}
      withinPortal={false}
      {...props}
    />
  )
}

export const ModalCTA: React.FC = ({ children }) => {
  return (
    <Group align="center" className="pokt-modal-cta buttonGroup" position="center">
      {children}
    </Group>
  )
}
