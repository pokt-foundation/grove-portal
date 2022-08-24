import { ButtonProps, Button as MantineButton } from "@mantine/core"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

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
