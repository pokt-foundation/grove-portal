import { IconCopy, IconPlus } from "@pokt-foundation/ui"
import styles from "./styles.css"
import { useClipboard } from "~/hooks/useClipboard"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

type CopyTextIconProps = {
  text: string | undefined
}

export default function CopyTextIcon({ text }: CopyTextIconProps) {
  const clipboard = useClipboard({ timeout: 500 })

  return (
    <span className="pokt-copy-text" onClick={() => clipboard.copy(text)}>
      {clipboard.copied ? <IconPlus /> : <IconCopy />}
    </span>
  )
}
