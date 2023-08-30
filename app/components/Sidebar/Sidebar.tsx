import { Divider, MediaQuery, Navbar, ScrollArea } from "@pokt-foundation/pocket-blocks"
import { useParams } from "@remix-run/react"
import React, { useMemo, useState } from "react"
import {
  LuBook,
  LuChevronsLeft,
  LuChevronsRight,
  LuLayers,
  LuLifeBuoy,
  LuPlus,
  LuSettings,
} from "react-icons/lu"
import {
  AppLink,
  ExternalLink,
  NavButton,
  SidebarNavRoute,
  SidebarApps,
} from "~/components/Sidebar/components"
import { EndpointsQuery } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"

type SidebarProps = {
  endpoints: EndpointsQuery | null
  hidden: boolean
}

const getStaticRoutes = (
  accountId: string | undefined,
): Record<string, SidebarNavRoute> => ({
  overview: {
    to: `/account/${accountId}`,
    label: "Overview",
    icon: LuLayers,
    end: true,
  },
  createNewApp: {
    to: `/account/${accountId}/create`,
    label: "New Application",
    icon: LuPlus,
    end: true,
  },
  docs: {
    to: "https://docs.portal.pokt.network/",
    icon: LuBook,
    label: "Documentation",
  },
  accountSettings: {
    to: `/user/profile`,
    icon: LuSettings,
    label: "Account Settings",
  },
  support: {
    to: "https://discord.gg/portal-rpc",
    icon: LuLifeBuoy,
    label: "Support",
  }
})

export const Sidebar = ({ endpoints, hidden }: SidebarProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const { accountId } = useParams()
  const [collapsed, setCollapsed] = useState(false)
  const staticRoutes = useMemo(() => getStaticRoutes(accountId), [accountId])

  return (
    <Navbar
      className={commonClasses.mainBackgroundColor}
      hidden={hidden}
      hiddenBreakpoint="sm"
      p="md"
      width={{ base: collapsed ? 80 : 300 }}
    >
      <ScrollArea h="100%" mx="-xs" px="xs">
        <Navbar.Section>
          <AppLink iconOnly={collapsed} route={staticRoutes.overview} />
          {endpoints && <SidebarApps apps={endpoints} iconOnly={collapsed} />}
          <AppLink iconOnly={collapsed} route={staticRoutes.createNewApp} />
        </Navbar.Section>
        <Divider color="#343438" my="lg" size="xs" />
        <Navbar.Section>
          <ExternalLink iconOnly={collapsed} route={staticRoutes.docs} />
        </Navbar.Section>
        <Navbar.Section>
          <AppLink iconOnly={collapsed} route={staticRoutes.accountSettings} />
          <ExternalLink iconOnly={collapsed} route={staticRoutes.support} />
        </Navbar.Section>
      </ScrollArea>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Navbar.Section>
          <NavButton
            icon={collapsed ? LuChevronsRight : LuChevronsLeft}
            iconOnly={collapsed}
            label="Collapse sidebar"
            onClick={() => setCollapsed(!collapsed)}
          />
        </Navbar.Section>
      </MediaQuery>
    </Navbar>
  )
}

export default Sidebar
