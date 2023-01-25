import { IconEyeOn, IconEyeOff } from "@pokt-foundation/pocket-blocks"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

type RevealIconProps = {
  revealed: boolean
  setRevealed: () => void
}

export default function RevealIcon({ revealed, setRevealed }: RevealIconProps) {
  return (
    <span
      aria-label={`Click to ${revealed ? "show" : "hide"} value`}
      className="pokt-reveal"
      tabIndex={0}
      onClick={setRevealed}
    >
      {revealed ? (
        <IconEyeOn fill="var(--color-secondary-main)" />
      ) : (
        <IconEyeOff fill="var(--color-secondary-main)" />
      )}
    </span>
  )
}
