import { Text as PoktText, TextProps } from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function Text({ ...props }: TextProps) {
  const { className, ...textProps } = props
  return (
    <PoktText
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
