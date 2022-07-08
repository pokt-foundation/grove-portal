import styles from "./styles.css"

import { Text as MantineText, TextProps } from "@mantine/core"
import clsx from "clsx"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function Text<C = "p">({ ...props }: TextProps<C>) {
  const { className, ...textProps } = props
  return (
    <MantineText
      className={clsx(
        {
          "pokt-text": true,
        },
        className,
      )}
      style={props.component === "span" ? { fontSize: "inherit" } : undefined}
      {...textProps}
    />
  )
}
