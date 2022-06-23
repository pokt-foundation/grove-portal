import styles from "./styles.css"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import clsx from "clsx"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

type DropdownProps = {
  label: string | React.ReactElement
  triggerClassName?: string
  contentClassName?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  children,
  contentClassName = "",
  triggerClassName = "",
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={clsx("pokt-dropdown-trigger", triggerClassName)}>
        {label}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={clsx("pokt-dropdown-content", contentClassName)}>
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default Dropdown
export { DropdownMenu }
