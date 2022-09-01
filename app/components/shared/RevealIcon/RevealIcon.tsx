import { IconEyeOn, IconEyeOff } from "@pokt-foundation/ui"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

type RevealIconProps = {
  revealed: boolean
  setRevealed: Function
}

export default function RevealIcon({ revealed, setRevealed }: RevealIconProps) {
  return (
    <span
      className="pokt-reveal"
      aria-label="Click to show value"
      tabIndex={0}
      onClick={() => setRevealed(!revealed)}
    >
      {revealed ? <IconEyeOn /> : <IconEyeOff />}
    </span>
  )
}
