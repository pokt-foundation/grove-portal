import { Button as MantineButton, ButtonProps } from "@mantine/core"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function Button<C = "button">(props: ButtonProps<C>) {
  const { children, ...buttonProps } = props
  return (
    <MantineButton
      className="pokt-button"
      variant={buttonProps.variant ?? "outline"}
      {...buttonProps}
    >
      {children}
    </MantineButton>
  )
}
