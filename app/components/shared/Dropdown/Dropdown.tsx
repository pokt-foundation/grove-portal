import styles from "./styles.css"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

type DropdownProps = {
  label: string | React.ReactElement
}

export const Dropdown: React.FC<DropdownProps> = ({ label, children }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{label}</DropdownMenu.Trigger>
      <DropdownMenu.Content>{children}</DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default Dropdown
export { DropdownMenu }
