import { Grid, Navbar } from "@pokt-foundation/pocket-blocks"
import LinksGroup, { LinksGroupProps } from "../LinksGroup/LinksGroup"

type SidebarProps = {
  data: LinksGroupProps[]
}

export function Sidebar({ data }: SidebarProps) {
  const links = data.map((item) => <LinksGroup {...item} key={item.label} />)

  return (
    <Navbar
      bg="#0a0e13"
      height="unset"
      p="16px 8px 48px 56px"
      width={{ sm: 300 }}
      withBorder={false}
    >
      <Navbar.Section grow>
        <Grid
          sx={{
            flexDirection: "column",
          }}
        >
          {links}
        </Grid>
      </Navbar.Section>
    </Navbar>
  )
}
