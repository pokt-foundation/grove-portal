import { Button, IconCopy, theme } from "@pokt-foundation/pocket-blocks"
import { ReactNode } from "react"
import Checkmark from "../Icons/Checkmark"
import { useClipboard } from "~/hooks/useClipboard"

type CopyTextProps = {
  text: string | undefined
  children?: ReactNode
}

export default function CopyText({ children, text }: CopyTextProps) {
  const clipboard = useClipboard({ timeout: 1500 })

  return (
    <Button
      aria-label="Click to copy"
      className="pokt-button-outline"
      color="blue"
      sx={{
        padding: "0",
      }}
      tabIndex={0}
      variant="outline"
      onClick={() => clipboard.copy(text)}
    >
      {children}
      {clipboard.copied ? <Checkmark /> : <IconCopy fill={theme.white} />}
    </Button>
  )
}
