import { IconCaretDown } from "@pokt-foundation/pocket-blocks"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import clsx from "clsx"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

type DropdownProps = {
  label: string | React.ReactElement
  contentClassName: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  contentClassName = "",
  children,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="pokt-dropdown-trigger">
        {label}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className={clsx({
          "pokt-dropdown-content": true,
          [contentClassName]: contentClassName,
        })}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

type DropdownTriggerProps = {
  label: string
}

type DropdownItemProps = {
  label: string
  variant?: "default" | "green"
  action: () => void
}

function DropdownTrigger({ label }: DropdownTriggerProps) {
  return (
    <div className="dropdown-trigger">
      <div className="dropdown-trigger__label">{label}</div>
      <div className="dropdown-trigger__arrow">
        <IconCaretDown className="pokt-icon" height="12px" width="12px" />
      </div>
    </div>
  )
}

function DropdownItem({ label, action, variant }: DropdownItemProps) {
  return (
    <button
      className={clsx({
        "dropdown-item": true,
        "dropdown-item--green": variant === "green",
      })}
      onClick={action}
    >
      {label}
    </button>
  )
}

export default Dropdown
export { DropdownMenu, DropdownItem, DropdownTrigger }
