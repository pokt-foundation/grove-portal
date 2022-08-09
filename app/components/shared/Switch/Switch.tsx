import { Switch as MantineSwitch, SwitchProps } from "@mantine/core"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function Switch({ ...props }: SwitchProps) {
  return <MantineSwitch className="pokt-switch" size={props.size ?? "md"} {...props} />
}
