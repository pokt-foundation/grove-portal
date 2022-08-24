import { Switch as MantineSwitch, SwitchProps } from "@mantine/core"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export default function Switch({ ...props }: SwitchProps) {
  return <MantineSwitch className="pokt-switch" size={props.size ?? "md"} {...props} />
}
