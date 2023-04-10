import { Button, IconCopy, theme } from "@pokt-foundation/pocket-blocks"
import { useClipboard } from "~/hooks/useClipboard"
import Checkmark from "../Icons/Checkmark"
import { ReactNode } from "react"

type CopyTextProps = {
  text: string | undefined
  children?: ReactNode
}

export default function CopyText({ children, text }: CopyTextProps) {
  const clipboard = useClipboard({ timeout: 1500 })

  return (
    <Button
      className="pokt-button-outline"
      color="blue"
      variant="outline"
      aria-label="Click to copy"
      tabIndex={0}
      onClick={() => clipboard.copy(text)}
      sx={{
        padding: "0",
      }}
    >
      {children}
      {clipboard.copied ? <Checkmark /> : <IconCopy fill={theme.white} />}
    </Button>
  )
}
