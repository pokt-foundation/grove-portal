import styles from "./styles.css"
import { Switch as MantineSwitch, SwitchProps } from "@mantine/core"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function Switch({ ...props }: SwitchProps) {
  return <MantineSwitch className="pokt-switch" size={props.size ?? "md"} {...props} />
}
