import Tooltip, { TooltipProps } from "~/components/shared/Tooltip"
import Button from "~/components/shared/Button"
import { IconQuestion } from "@pokt-foundation/ui"
import { useEffect, useState } from "react"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

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
    <Tooltip {...props} opened={open} className="pokt-help">
      <Button onClick={() => setOpen((o) => !o)}>
        <IconQuestion />
      </Button>
    </Tooltip>
  )
}
