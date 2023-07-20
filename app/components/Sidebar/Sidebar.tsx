import {
  Divider,
  IconArrowLeft,
  IconBookOpen,
  IconDoubleLeft,
  IconDoubleRight,
  IconHighlight,
  IconLayers,
  IconPlus,
  IconSettings,
  Navbar,
  ScrollArea,
} from "@pokt-foundation/pocket-blocks"
import React, { useState } from "react"
import IconDiscord from "~/components/Icons/IconDiscord"
import SidebarApps from "~/components/Sidebar/components/SidebarApps"
import {
  AppLink,
  ExternalLink,
  SidebarButton,
  SidebarRoute,
} from "~/components/Sidebar/components/SidebarLinks"
import { EndpointsQuery } from "~/models/portal/sdk"

type SidebarProps = { endpoints: EndpointsQuery | null; hidden: boolean }

const staticRoutes: Record<string, SidebarRoute> = {
  overview: {
    to: "/dashboard",
    label: "Overview",
    icon: IconLayers,
    end: true,
  },
  createNewApp: {
    to: "/dashboard/create",
    label: "New Application",
    icon: IconPlus,
    end: true,
  },
  docs: {
    to: "https://docs.portal.pokt.network/",
    icon: IconBookOpen,
    label: "Documentation",
  },
  accountSettings: {
    to: "/dashboard/profile",
    icon: IconSettings,
    label: "Account Settings",
  },
  support: {
    to: "https://discord.gg/portal-rpc",
    icon: IconDiscord,
    label: "Support",
  },
  feedback: {
    to: "https://discord.gg/portal-rpc",
    icon: IconHighlight,
    label: "Feedback",
  },
}

export const Sidebar = ({ endpoints, hidden }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Navbar
      hidden={hidden}
      hiddenBreakpoint="sm"
      p="md"
      width={{ base: collapsed ? 75 : 300 }}
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
        <Divider color="#343438" my="lg" size="xs" />
        <Navbar.Section>
          <AppLink iconOnly={collapsed} route={staticRoutes.accountSettings} />
          <ExternalLink iconOnly={collapsed} route={staticRoutes.support} />
          <ExternalLink iconOnly={collapsed} route={staticRoutes.feedback} />
        </Navbar.Section>
      </ScrollArea>
      <Navbar.Section>
        <SidebarButton
          icon={collapsed ? IconDoubleRight : IconDoubleLeft}
          iconOnly={collapsed}
          label="Collapse sidebar"
          onClick={() => setCollapsed(!collapsed)}
        />
      </Navbar.Section>
    </Navbar>
  )
}

export default Sidebar
