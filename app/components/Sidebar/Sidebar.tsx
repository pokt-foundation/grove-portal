import { Divider, Box, MediaQuery, Navbar, ScrollArea } from "@mantine/core"
import { Link, useParams } from "@remix-run/react"
import React, { useMemo, useState } from "react"
import {
  LuArrowUpCircle,
  LuBookOpen,
  LuLifeBuoy,
  LuLineChart,
  LuPanelLeft,
  LuPlus,
  LuSettings,
} from "react-icons/lu/index.js"
import AccountSelect from "~/components/AccountSelect"
import GroveLogo from "~/components/GroveLogo"
import {
  ExternalLink,
  InternalLink,
  NavButton,
  SidebarApps,
  SidebarNavRoute,
} from "~/components/Sidebar/components"
import { Account, PayPlanType, PortalApp, RoleName } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"
import { DISCORD_PATH, DOCS_PATH } from "~/utils/utils"

type SidebarProps = {
  account: Account
  hidden: boolean
  accounts: Account[]
  userRole: RoleName
}

const getStaticRoutes = (
  activeAccount: Account,
  userRole: RoleName,
): SidebarNavRoute[] => {
  const isStarterAccount = activeAccount?.planType === PayPlanType.FreetierV0
  return [
    ...(isStarterAccount && userRole !== RoleName.Member
      ? [
          {
            to: `/account/${activeAccount?.id}/upgrade`,
            label: "Upgrade to Auto-Scale",
            icon: LuArrowUpCircle,
            end: true,
          },
        ]
      : []),
    ...[
      {
        to: `/account/${activeAccount?.id}`,
        label: "Insights",
        icon: LuLineChart,
        end: true,
      },
      {
        to: `/account/${activeAccount?.id}/settings`,
        label: "Settings",
        icon: LuSettings,
      },
      {
        to: DOCS_PATH,
        icon: LuBookOpen,
        label: "Documentation",
        external: true,
      },
      {
        to: DISCORD_PATH,
        icon: LuLifeBuoy,
        label: "Support",
        external: true,
      },
    ],
  ]
}

export const Sidebar = ({ account, hidden, userRole, accounts }: SidebarProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const { accountId } = useParams()
  const [collapsed, setCollapsed] = useState(false)
  const staticRoutes = useMemo(() => {
    return getStaticRoutes(account, userRole)
  }, [account, userRole])

  const canCreateApps = userRole !== RoleName.Member
  const { portalApps: apps } = account

  return (
    <Navbar
      className={commonClasses.mainBackgroundColor}
      hidden={hidden}
      hiddenBreakpoint="sm"
      p={8}
      pt={18}
      width={{ base: collapsed ? 60 : 300 }}
    >
      <>
        <Box ml={10}>
          <Link to={`/account/${accountId}`}>
            <GroveLogo icon={collapsed} />
          </Link>
        </Box>
        <Divider mb="md" ml={-8} mr={-8} mt="sm" />
        <AccountSelect accounts={accounts} collapsed={collapsed} />
        <ScrollArea h="100%" mt="lg" mx="-xs" px="xs">
          {staticRoutes.map((route, index) =>
            route.external ? (
              <Navbar.Section key={`${route.label}-${index}`}>
                <ExternalLink iconOnly={collapsed} route={route} />
              </Navbar.Section>
            ) : (
              <Navbar.Section key={`${route.label}-${index}`}>
                <InternalLink iconOnly={collapsed} route={route} />
              </Navbar.Section>
            ),
          )}
          <Divider my="lg" />
          <Navbar.Section>
            {apps && <SidebarApps apps={apps as PortalApp[]} iconOnly={collapsed} />}
            {canCreateApps && (
              <InternalLink
                iconOnly={collapsed}
                route={{
                  to: `/account/${accountId}/create`,
                  label: "New Application",
                  icon: LuPlus,
                  end: true,
                }}
              />
            )}
          </Navbar.Section>
        </ScrollArea>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Navbar.Section>
            <NavButton
              icon={LuPanelLeft}
              iconOnly={collapsed}
              label={`${collapsed ? "Expand" : "Collapse"} sidebar`}
              onClick={() => setCollapsed(!collapsed)}
            />
          </Navbar.Section>
        </MediaQuery>
      </>
    </Navbar>
  )
}

export default Sidebar
