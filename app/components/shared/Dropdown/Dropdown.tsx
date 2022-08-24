import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

type DropdownProps = {
  label: string | React.ReactElement
}

export const Dropdown: React.FC<DropdownProps> = ({ label, children }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="pokt-dropdown-trigger">
        {label}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="pokt-dropdown-content">
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default Dropdown
export { DropdownMenu }
