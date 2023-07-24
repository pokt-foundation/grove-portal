import { Divider, MediaQuery, Navbar, ScrollArea } from "@pokt-foundation/pocket-blocks"
import React, { useState } from "react"
import {
  RiStackLine,
  RiAddLine,
  RiBook2Line,
  RiSettings3Line,
  RiDiscordLine,
  RiUserSmileLine,
  RiArrowLeftDoubleLine,
  RiArrowRightDoubleLine,
} from "react-icons/ri"
import {
  AppLink,
  ExternalLink,
  NavButton,
  SidebarNavRoute,
  SidebarApps,
} from "~/components/Sidebar/components"
import { EndpointsQuery } from "~/models/portal/sdk"

type SidebarProps = { endpoints: EndpointsQuery | null; hidden: boolean }

const staticRoutes: Record<string, SidebarNavRoute> = {
  overview: {
    to: "/dashboard",
    label: "Overview",
    icon: RiStackLine,
    end: true,
  },
  createNewApp: {
    to: "/dashboard/create",
    label: "New Application",
    icon: RiAddLine,
    end: true,
  },
  docs: {
    to: "https://docs.portal.pokt.network/",
    icon: RiBook2Line,
    label: "Documentation",
  },
  accountSettings: {
    to: "/dashboard/profile",
    icon: RiSettings3Line,
    label: "Account Settings",
  },
  support: {
    to: "https://discord.gg/portal-rpc",
    icon: RiDiscordLine,
    label: "Support",
  },
  feedback: {
    to: "https://discord.gg/portal-rpc",
    icon: RiUserSmileLine,
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
          <ExternalLink iconOnly={collapsed} route={staticRoutes.feedback} />
        </Navbar.Section>
      </ScrollArea>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Navbar.Section>
          <NavButton
            icon={collapsed ? RiArrowRightDoubleLine : RiArrowLeftDoubleLine}
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
