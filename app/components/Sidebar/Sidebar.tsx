import { List, Navbar, ScrollArea, useMantineTheme } from "@pokt-foundation/pocket-blocks"
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

      height="calc(100vh - 144px)"
      p="16px 8px 16px 0"
      pos="sticky"
      top="0"
      width={{ sm: 300 }}
      withBorder={false}
    >
      <Navbar.Section grow component={ScrollArea} pr="sm">
        <List unstyled withPadding m={0}>
          {links}
        </List>
      </Navbar.Section>
    </Navbar>
  )
}
