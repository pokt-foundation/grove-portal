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

export default Dropdown
export { DropdownMenu }
