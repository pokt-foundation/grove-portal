import { List, MediaQuery, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import LinksGroup, { LinksGroupProps } from "../LinksGroup/LinksGroup"
import SidebarButton from "../Icons/SidebarButton"
import { useState } from "react"

type SidebarProps = {
  data: LinksGroupProps[]
}

export function Sidebar({ data }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const theme = useMantineTheme()

  return (
    <>
      <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
        <List
          unstyled
          withPadding
          m={0}
          sx={{
            height: "100vh",
            padding: "0 8px 8px 0",
            width: 300,
            top: 0,
            position: "sticky",
            background: theme.colors.navy[7],
            overflowY: "auto",
          }}
        >
          {data.map((item) => (
            <LinksGroup {...item} key={item.label} />
          ))}
        </List>
      </MediaQuery>
      <MediaQuery largerThan="xs" styles={{ display: "none" }}>
        <List
          unstyled
          withPadding
          m={0}
          sx={{
            background: theme.colors.navy[7],
            height: "100vh",
            padding: "0 8px",
            width: "100%",
            top: 88,
            left: isSidebarOpen ? 0 : -345,
            position: "absolute",
            zIndex: 9999,
            transition: "left ease-in-out .3s",
          }}
        >
          <List.Item
            sx={{
              display: "flex",
              listStyle: "none",
              justifyContent: "flex-end",
              paddingTop: "20px",
            }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <SidebarButton />
          </List.Item>
          {data.map((item) => (
            <LinksGroup {...item} key={item.label} />
          ))}
        </List>
      </MediaQuery>
    </>
  )
}
