import { Divider } from "@mantine/core"
import { Box, MediaQuery, Navbar, ScrollArea } from "@pokt-foundation/pocket-blocks"
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
} from "react-icons/lu"
import AccountSelect from "~/components/AccountSelect"
import GroveLogo from "~/components/GroveLogo"
import {
  InternalLink,
  ExternalLink,
  NavButton,
  SidebarNavRoute,
  SidebarApps,
} from "~/components/Sidebar/components"
import { Account, PayPlanType, PortalApp } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"
import { DISCORD_PATH, DOCS_PATH } from "~/utils/utils"

type SidebarProps = {
  apps: PortalApp[] | null
  hidden: boolean
  canCreateApps: boolean
  accounts: Account[]
}

const getStaticRoutes = (activeAccount: Account | undefined): SidebarNavRoute[] => {
  const isStarterAccount = activeAccount?.planType === PayPlanType.FreetierV0
  return [
    ...(isStarterAccount
      ? [
          {
            to: `/api/stripe/checkout-session?account-id=${activeAccount.id}`,
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
        label: "Settings and members",
        icon: LuSettings,
      },
      {
        to: DOCS_PATH,
        icon: LuBookOpen,
        label: "Docs",
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

export const Sidebar = ({ apps, hidden, canCreateApps, accounts }: SidebarProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const { accountId } = useParams()
  const [collapsed, setCollapsed] = useState(false)
  const staticRoutes = useMemo(() => {
    const activeAccount = accounts.find(({ id }) => id === accountId)
    return getStaticRoutes(activeAccount)
  }, [accountId, accounts])

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
            {apps && <SidebarApps apps={apps} iconOnly={collapsed} />}
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

        <Box ml="md" mt={30}>
          <Link to={`/account/${accountId}`}>
            <GroveLogo icon={collapsed} />
          </Link>
        </Box>
      </>
    </Navbar>
  )
}

export default Sidebar
