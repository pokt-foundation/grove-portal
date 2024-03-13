import { Divider, Box, Navbar, ScrollArea } from "@mantine/core"
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

export const Sidebar = ({ account, hidden, userRole, accounts }: SidebarProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const { accountId } = useParams()
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
      width={{ base: 260 }}
    >
      <>
        <AccountSelect accounts={accounts} />
        <ScrollArea h="100%" mt="lg">
          {staticRoutes.map((route, index) =>
            route.external ? (
              <Navbar.Section key={`${route.label}-${index}`}>
                <ExternalLink route={route} />
              </Navbar.Section>
            ) : (
              <Navbar.Section key={`${route.label}-${index}`}>
                <InternalLink route={route} />
              </Navbar.Section>
            ),
          )}
          <Divider my="lg" />
          <Navbar.Section>
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
          </Navbar.Section>
        </ScrollArea>
        <Box ml={10}>
          <Link to={`/account/${accountId}`}>
            <GroveLogo />
          </Link>
        </Box>
      </>
    </Navbar>
  )
}

export default Sidebar
