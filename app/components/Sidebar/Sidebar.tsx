import { List, MediaQuery, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import { useState } from "react"
import SidebarLeftButton from "~/components/Icons/SidebarLeftButton"
import SidebarRightButton from "~/components/Icons/SidebarRightButton"
import LinksGroup, { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"

type SidebarProps = {
  data: LinksGroupProps[]
}

export function Sidebar({ data }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const theme = useMantineTheme()

  return (
    <>
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
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
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <List
          unstyled
          withPadding
          m={0}
          sx={{
            background: theme.colors.navy[7],
            height: "100vh",
            left: isSidebarOpen ? 0 : "calc(-300px + 45px)",
            maxWidth: 300,
            padding: "0 8px",
            position: "absolute",
            top: 88,
            transition: "left ease-in-out .3s",
            width: "100%",
            zIndex: 9999,
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
            {isSidebarOpen ? <SidebarLeftButton /> : <SidebarRightButton />}
          </List.Item>
          {isSidebarOpen
            ? data.map((item) => <LinksGroup {...item} key={item.label} />)
            : null}
        </List>
      </MediaQuery>
    </>
  )
}
