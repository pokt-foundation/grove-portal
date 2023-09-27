import { showNotification } from "@mantine/notifications"
import { AppShell, Container, Header } from "@pokt-foundation/pocket-blocks"
import { Link, useLocation, useParams } from "@remix-run/react"
import React, { ReactNode, useEffect, useMemo, useState } from "react"
import { LuShapes } from "react-icons/lu"
import { AppHeader } from "~/components/AppHeader"
import { Sidebar } from "~/components/Sidebar"
import { Account, PortalApp, User } from "~/models/portal/sdk"
import { useRoot } from "~/root/hooks/useRoot"
import useCommonStyles from "~/styles/commonStyles"
import isUserAccountOwner from "~/utils/user"

type RootAppShellProps = {
  user: User
  apps?: PortalApp[]
  hasPendingInvites: boolean
  children: ReactNode
  accounts: Account[]
}

export const RootAppShell = ({
  user,
  apps,
  children,
  accounts,
  hasPendingInvites,
}: RootAppShellProps) => {
  const [opened, setOpened] = useState(false)
  const { classes: commonClasses } = useCommonStyles()
  const { hideSidebar } = useRoot({ user })
  const { pathname } = useLocation()
  const { accountId } = useParams()

  const isUserOwner = useMemo(
    () => isUserAccountOwner({ accounts, accountId: accountId as string, user }),
    [accountId, accounts, user],
  )

  const navProp = useMemo(
    () => ({
      ...(!hideSidebar &&
        apps && {
          navbar: <Sidebar apps={apps} canCreateApps={isUserOwner} hidden={!opened} />,
        }),
    }),
    [hideSidebar, apps, opened, isUserOwner],
  )

  useEffect(() => {
    if (hasPendingInvites && pathname !== "/user/invited-apps") {
      showNotification({
        icon: <LuShapes size={18} />,
        autoClose: 8000,
        message: (
          <Link to="/user/invited-apps">You have pending application invitations.</Link>
        ),
      })
    }
    // We want the notification to be shown only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AppShell
      header={
        <Header
          className={commonClasses.mainBackgroundColor}
          height={{ base: 50, md: 70 }}
          p="md"
        >
          <AppHeader
            accounts={accounts}
            hasPendingInvites={hasPendingInvites}
            opened={opened}
            user={user}
            onOpen={(o) => setOpened(o)}
          />
        </Header>
      }
      {...navProp}
      navbarOffsetBreakpoint="sm"
      padding="xs"
    >
      <Container size="lg">{children}</Container>
    </AppShell>
  )
}

export default RootAppShell
