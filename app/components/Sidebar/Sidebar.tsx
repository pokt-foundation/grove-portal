import { Divider, MediaQuery, Navbar, ScrollArea } from "@pokt-foundation/pocket-blocks"
import { useParams } from "@remix-run/react"
import React, { useMemo, useState } from "react"
import {
  LuBook,
  LuChevronsLeft,
  LuChevronsRight,
  LuLifeBuoy,
  LuPlus,
} from "react-icons/lu"
import {
  InternalLink,
  ExternalLink,
  NavButton,
  SidebarNavRoute,
  SidebarApps,
} from "~/components/Sidebar/components"
import { PortalApp } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"

type SidebarProps = {
  apps: PortalApp[] | null
  hidden: boolean
  canCreateApps: boolean
}

const getStaticRoutes = (
  accountId: string | undefined,
): Record<string, SidebarNavRoute> => ({
  overview: {
    to: `/account/${accountId}`,
    label: "Portal Overview",
    imgSrc: "/portal-icon.svg",
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
  support: {
    to: "https://discord.gg/portal-rpc",
    icon: LuLifeBuoy,
    label: "Support",
  },
})

export const Sidebar = ({ apps, hidden, canCreateApps }: SidebarProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const { accountId } = useParams()
  const [collapsed, setCollapsed] = useState(false)
  const staticRoutes = useMemo(() => getStaticRoutes(accountId), [accountId])

  return (
    <Navbar
      className={commonClasses.mainBackgroundColor}
      hidden={hidden}
      hiddenBreakpoint="sm"
      p={8}
      pt={32}
      width={{ base: collapsed ? 60 : 300 }}
    >
      <ScrollArea h="100%" mx="-xs" px="xs">
        <Navbar.Section>
          <InternalLink iconOnly={collapsed} route={staticRoutes.overview} />
          {apps && <SidebarApps apps={apps} iconOnly={collapsed} />}
          {canCreateApps && (
            <InternalLink iconOnly={collapsed} route={staticRoutes.createNewApp} />
          )}
        </Navbar.Section>
        <Divider color="#343438" my="lg" size="xs" />
        <Navbar.Section>
          <ExternalLink iconOnly={collapsed} route={staticRoutes.docs} />
        </Navbar.Section>
        <Navbar.Section>
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
