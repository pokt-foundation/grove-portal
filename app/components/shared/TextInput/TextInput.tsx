import styles from "./styles.css"

import { TextInput as MantineTextInput, TextInputProps } from "@mantine/core"
import React, { useEffect, useRef, useState } from "react"
import { IconCopy, IconPlus } from "@pokt-foundation/ui"
import clsx from "clsx"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

type InputProps = TextInputProps & {
  copy?: boolean
}

export default function TextInput({ copy = false, ...props }: InputProps) {
  const ref = useRef<HTMLInputElement>(null)
  const [rightSectionEl, setRightSectionEl] = useState<React.ReactNode | null>(
    props.rightSection,
  )

  useEffect(() => {
    const handleTextCopy = () => {
      const value = ref.current?.value
      if (value) {
        window.navigator.clipboard.writeText(value)
        setRightSectionEl(copyResponse)
        setTimeout(() => {
          setRightSectionEl(copyAction)
        }, 1000)
      }
    }
    const copyAction = (
      <span className="pokt-text-input-copy">
        <IconCopy onClick={handleTextCopy} />
      </span>
    )
    const copyResponse = (
      <span className="pokt-text-input-copy">
        <IconPlus />
      </span>
    )

    setRightSectionEl(copyAction)
  }, [copy])

  return (
    <MantineTextInput
      ref={ref}
      className={clsx({
        "pokt-text-input": true,
        "right-section": rightSectionEl,
      })}
      size={props.size ?? "md"}
      variant={props.variant ?? "unstyled"}
      rightSection={rightSectionEl}
      {...props}
    />
  )
}
