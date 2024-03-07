import { Box, ScrollArea, AppShell, Divider } from "@mantine/core"
import { Link, useParams } from "@remix-run/react"
import React, { useMemo } from "react"
import { LuPlus } from "react-icons/lu"
import AccountSelect from "~/components/AccountSelect"
import GroveLogo from "~/components/GroveLogo"
import {
  ExternalLink,
  InternalLink,
  SidebarApps,
  SidebarNavRoute,
} from "~/components/Sidebar/components"
import { Account, PayPlanType, PortalApp, RoleName } from "~/models/portal/sdk"
import { DISCORD_PATH, DOCS_PATH } from "~/utils/utils"

type SidebarProps = {
  account: Account
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
            end: true,
          },
        ]
      : []),
    ...[
      {
        to: `/account/${activeAccount?.id}`,
        label: "Insights",
        end: true,
      },
      {
        to: `/account/${activeAccount?.id}/sandbox`,
        label: "Sandbox",
        end: true,
      },
      {
        to: `/account/${activeAccount?.id}/settings`,
        label: "Settings",
      },
      {
        to: DOCS_PATH,
        label: "Documentation",
        external: true,
      },
      {
        to: DISCORD_PATH,
        label: "Support",
        external: true,
      },
    ],
  ]
}

export const Sidebar = ({ account, userRole, accounts }: SidebarProps) => {
  const { accountId } = useParams()
  const staticRoutes = useMemo(() => {
    return getStaticRoutes(account, userRole)
  }, [account, userRole])

  const canCreateApps = userRole !== RoleName.Member
  const { portalApps: apps } = account

  return (
    <AppShell.Navbar p={8} pt={18}>
      <AccountSelect accounts={accounts} />
      <ScrollArea h="100%" mt="lg">
        {staticRoutes.map((route, index) =>
          route.external ? (
            <AppShell.Section key={`${route.label}-${index}`}>
              <ExternalLink route={route} />
            </AppShell.Section>
          ) : (
            <AppShell.Section key={`${route.label}-${index}`}>
              <InternalLink route={route} />
            </AppShell.Section>
          ),
        )}
        <Divider my="lg" />
        <AppShell.Section>
          {apps && <SidebarApps apps={apps as PortalApp[]} />}
          {canCreateApps && (
            <InternalLink
              route={{
                to: `/account/${accountId}/create`,
                label: "New Application",
                icon: LuPlus,
                end: true,
              }}
            />
          )}
        </AppShell.Section>
      </ScrollArea>
      <Box ml={10}>
        <Link to={`/account/${accountId}`}>
          <GroveLogo />
        </Link>
      </Box>
    </AppShell.Navbar>
  )
}

export default Sidebar
