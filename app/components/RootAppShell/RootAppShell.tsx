import { showNotification } from "@mantine/notifications"
import { AppShell, Container } from "@mantine/core"
import { Link, useLocation } from "@remix-run/react"
import React, { ReactNode, useEffect, useMemo, useState } from "react"
import { LuShapes } from "react-icons/lu/index.js"
import { AppHeader } from "~/components/AppHeader"
import { Sidebar } from "~/components/Sidebar"
import { Account, RoleName, User } from "~/models/portal/sdk"
import { useRoot } from "~/root/hooks/useRoot"

type RootAppShellProps = {
  account?: Account
  accounts: Account[]
  children: ReactNode
  hasPendingInvites: boolean
  user: User
  userRole?: RoleName
}

export const PENDING_INVITES_NOTIFICATION_ID = "pending-account-invites"

export const RootAppShell = ({
  user,
  account,
  children,
  accounts,
  userRole,
  hasPendingInvites,
}: RootAppShellProps) => {
  const [opened, setOpened] = useState(false)
  const { hideSidebar } = useRoot({ user })
  const { pathname } = useLocation()

  const navProp = useMemo(
    () => ({
      ...(account &&
        userRole &&
        !hideSidebar && {
          navbar: (
            <Sidebar
              account={account}
              accounts={accounts}
              hidden={!opened}
              userRole={userRole}
            />
          ),
        }),
    }),
    [hideSidebar, userRole, account, accounts, opened],
  )

  useEffect(() => {
    if (hasPendingInvites && pathname !== "/user/accounts") {
      showNotification({
        id: PENDING_INVITES_NOTIFICATION_ID,
        icon: <LuShapes size={18} />,
        autoClose: 8000,
        message: <Link to="/user/accounts">You have pending account invitations.</Link>,
      })
    }
    // We want the notification to be shown only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AppShell
      header={
        <AppHeader
          accounts={accounts}
          hasPendingInvites={hasPendingInvites}
          opened={opened}
          user={user}
          onOpen={(o) => setOpened(o)}
        />
      }
      layout="alt"
      {...navProp}
      navbarOffsetBreakpoint="sm"
      padding="xs"
    >
      <Container size="lg">{children}</Container>
    </AppShell>
  )
}

export default RootAppShell
