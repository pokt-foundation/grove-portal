import { Button, Tooltip, TooltipProps } from "@pokt-foundation/pocket-blocks"
import { IconQuestion } from "@pokt-foundation/ui"
import { useEffect, useState } from "react"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export default function HelpTooltip(props: Omit<TooltipProps, "children">) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }

    const handleClose = () => {
      setOpen(false)
    }
    document.addEventListener("click", handleClose)

    return () => {
      document.removeEventListener("click", handleClose)
    }
  }, [open])

  return (
    <Tooltip {...props} className="pokt-help" opened={open}>
      <Button onClick={() => setOpen((o) => !o)}>
        <IconQuestion />
      </Button>
    </Tooltip>
  )
}
