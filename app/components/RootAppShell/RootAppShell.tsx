import { AppShell, Container } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
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
  user: User
  userRole?: RoleName
}
export const RootAppShell = ({
  user,
  account,
  children,
  accounts,
  userRole,
}: RootAppShellProps) => {
  const [opened, setOpened] = useState(false)
  const { hideSidebar } = useRoot({ user })
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

  return (
    <AppShell
      header={
        <AppHeader
          accounts={accounts}
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
