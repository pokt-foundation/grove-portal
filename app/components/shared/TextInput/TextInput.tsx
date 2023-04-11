import {
  Button,
  IconDeleteAlt,
  TextInput as MantineTextInput,
  TextInputProps,
} from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import styles from "./styles.css"
import { links as RevealIconLinks } from "~/components/shared/RevealIcon"

/* c8 ignore start */
export const links = () => {
  return [...RevealIconLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export type InputProps = TextInputProps & {
  revealed?: boolean
  setRevealed?: () => void
  children?: React.ReactNode
}

export default function TextInput({
  revealed = false,
  setRevealed,
  children,
  ...props
}: InputProps) {
  return (
    <div className="pokt-text-wrapper">
      <MantineTextInput
        className={clsx({
          "pokt-text-input": true,
          "right-section": props.rightSection,
        })}
        rightSection={props.rightSection}
        size={props.size ?? "md"}
        variant={props.variant ?? "unstyled"}
        {...props}
      />
      {children}
    </div>
  )
}
