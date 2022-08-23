import { Modal as MantineModal, ModalProps } from "@mantine/core"
import clsx from "clsx"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

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
