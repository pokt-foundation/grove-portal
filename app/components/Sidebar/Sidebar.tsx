import { List, Navbar, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import LinksGroup, { LinksGroupProps } from "../LinksGroup/LinksGroup"

type SidebarProps = {
  data: LinksGroupProps[]
}

export function Sidebar({ data }: SidebarProps) {
  const links = data.map((item) => <LinksGroup {...item} key={item.label} />)

  const theme = useMantineTheme()

  return (
    <Navbar
      bg={theme.colors.navy[7]}
      height="unset"
      p="0 8px 48px 0"
      width={{ sm: 300 }}
      withBorder={false}
    >
      <Navbar.Section grow>
        <List unstyled withPadding m={0}>
          {links}
        </List>
      </Navbar.Section>
    </Navbar>
  )
}
