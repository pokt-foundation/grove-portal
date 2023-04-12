import {
  Button,
  IconCheck,
  IconCopy,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { ReactNode } from "react"
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
      color={theme.colors.blue[5]}
      size="xs"
      tabIndex={0}
      variant="subtle"
      onClick={() => clipboard.copy(text)}
    >
      {clipboard.copied ? (
        <IconCheck fill={theme.colors.blue[5]} width={18} height={18} />
      ) : (
        <IconCopy color={theme.colors.blue[5]} width={18} height={18} />
      )}
    </Button>
  )
}
