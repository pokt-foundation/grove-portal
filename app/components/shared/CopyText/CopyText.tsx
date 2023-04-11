import { Button, IconCopy, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import { ReactNode } from "react"
import Checkmark from "../Icons/Checkmark"
import { useClipboard } from "~/hooks/useClipboard"

type CopyTextProps = {
  text: string | undefined
  children?: ReactNode
}

export default function CopyText({ text }: CopyTextProps) {
  const clipboard = useClipboard({ timeout: 1500 })
  const theme = useMantineTheme()

  return (
    <Button
      aria-label="Click to copy"
      className="pokt-button-outline"
      color={theme.colors.blue[5]}
      size="sm"
      tabIndex={0}
      variant="subtle"
      onClick={() => clipboard.copy(text)}
    >
      {clipboard.copied ? (
        <Checkmark fill={theme.colors.blue[5]} />
      ) : (
        <IconCopy color={theme.colors.blue[5]} />
      )}
    </Button>
  )
}
