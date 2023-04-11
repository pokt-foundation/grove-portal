import { Button, IconCopy, theme } from "@pokt-foundation/pocket-blocks"
import { ReactNode } from "react"
import Checkmark from "../Icons/Checkmark"
import { useClipboard } from "~/hooks/useClipboard"

type CopyTextProps = {
  text: string | undefined
  children?: ReactNode
}

export default function CopyText({ text }: CopyTextProps) {
  const clipboard = useClipboard({ timeout: 1500 })

  return (
    <Button
      aria-label="Click to copy"
      className="pokt-button-outline"
      size="sm"
      sx={(theme) => ({
        ".mantine-Button-inner svg": {
          fill: theme.colors.blue[5],
        },
      })}
      tabIndex={0}
      variant="subtle"
      onClick={() => clipboard.copy(text)}
    >
      {clipboard.copied ? <Checkmark /> : <IconCopy />}
    </Button>
  )
}
