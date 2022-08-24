import { Modal as MantineModal, ModalProps } from "@mantine/core"
import clsx from "clsx"
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
      size={props.size ?? "md"}
      withinPortal={false}
      {...props}
    />
  )
}
