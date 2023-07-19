import {
  Divider,
  IconBookOpen,
  IconHighlight,
  IconLayers,
  IconPlus,
  IconSettings,
  Navbar,
  ScrollArea,
} from "@pokt-foundation/pocket-blocks"
import { IconProps } from "@pokt-foundation/pocket-blocks/dist/src/package/icon/types"
import React, { FC } from "react"
import IconDiscord from "~/components/Icons/IconDiscord"
import SidebarApps from "~/components/Sidebar/components/SidebarApps"
import { AppLink, ExternalLink } from "~/components/Sidebar/components/SidebarLinks"
import { EndpointsQuery } from "~/models/portal/sdk"

export type SidebarRoute = {
  to: string
  label: string
  icon: FC<IconProps> | string
  end?: boolean
  external?: boolean
  badge?: string
}

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
  return (
    <Navbar hidden={hidden} hiddenBreakpoint="sm" p="md" width={{ sm: 200, lg: 300 }}>
      <ScrollArea mx="-xs" px="xs">
        <Navbar.Section>
          <AppLink route={staticRoutes.overview} />
          {endpoints && <SidebarApps apps={endpoints} />}
          <AppLink route={staticRoutes.createNewApp} />
        </Navbar.Section>
        <Divider color="#343438" my="lg" size="xs" />
        <Navbar.Section>
          <ExternalLink route={staticRoutes.docs} />
        </Navbar.Section>
        <Divider color="#343438" my="lg" size="xs" />
        <Navbar.Section>
          <AppLink route={staticRoutes.accountSettings} />
          <ExternalLink route={staticRoutes.support} />
          <ExternalLink route={staticRoutes.feedback} />
        </Navbar.Section>
      </ScrollArea>
    </Navbar>
  )
}

export default Sidebar
