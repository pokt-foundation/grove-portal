import { Text as PoktText, TextProps } from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"

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
      style={
        props.component === "span" ? { fontSize: "inherit" } : { fontFamily: "inherit" }
      }
      {...textProps}
    />
  )
}
