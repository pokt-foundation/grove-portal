import styles from "./styles.css"

import { TextInput as MantineTextInput, TextInputProps } from "@mantine/core"
import { useRef } from "react"
import CopyTextIcon, {
  links as CopyTextIconLinks,
} from "~/components/shared/CopyTextIcon"
import clsx from "clsx"

export const links = () => {
  return [...CopyTextIconLinks(), { rel: "stylesheet", href: styles }]
}

type InputProps = TextInputProps & {
  copy?: boolean
}

export default function TextInput({ copy = false, ...props }: InputProps) {
  const ref = useRef<HTMLInputElement>(null)

  let rightSection = props.rightSection

  if (!rightSection && copy) {
    rightSection = <CopyTextIcon text={ref.current?.value} />
  }

  return (
    <MantineTextInput
      ref={ref}
      className={clsx({
        "pokt-text-input": true,
        "right-section": props.rightSection,
      })}
      size={props.size ?? "md"}
      variant={props.variant ?? "unstyled"}
      rightSection={rightSection}
      {...props}
    />
  )
}
