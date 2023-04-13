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
      color={theme.colors.gray[6]}
      p="0 .5em"
      size="xs"
      tabIndex={0}
      variant="subtle"
      onClick={() => clipboard.copy(text)}
    >
      {clipboard.copied ? (
        <IconCheck fill={theme.colors.gray[6]} height={18} width={18} />
      ) : (
        <IconCopy fill={theme.colors.gray[6]} height={18} width={18} />
      )}
    </Button>
  )
}
