import { Select as MantineSelect, SelectProps } from "@mantine/core"
import clsx from "clsx"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function Select({ ...props }: SelectProps) {
  return (
    <MantineSelect
      className={clsx({
        "pokt-select": true,
      })}
      size={props.size ?? "md"}
      variant={props.variant ?? "unstyled"}
      withinPortal={false}
      {...props}
    />
  )
}
