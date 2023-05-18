import { List, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import LinksGroup, { LinksGroupProps } from "../LinksGroup/LinksGroup"

type SidebarProps = {
  data: LinksGroupProps[]
}

export function Sidebar({ data }: SidebarProps) {
  const theme = useMantineTheme()

  return (
    <List
      unstyled
      withPadding
      m={0}
      sx={{
        height: "calc(100vh - 144px)",
        padding: "0 8px 48px 0",
        width: 300,
        top: 0,
        position: "sticky",
        background: theme.colors.navy[7],
      }}
    >
      {data.map((item) => (
        <LinksGroup {...item} key={item.label} />
      ))}
    </List>
  )
}
