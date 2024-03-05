import { AppShell, Container } from "@mantine/core"
import React, { ReactNode, useState } from "react"
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
  withSidebar?: boolean
}
export const RootAppShell = ({
  user,
  account,
  children,
  accounts,
  userRole,
  withSidebar = true,
}: RootAppShellProps) => {
  const [opened, setOpened] = useState(false)
  const { hideSidebar } = useRoot({ user })
  return (
    <AppShell
      header={{ height: 60 }}
      layout="alt"
      navbar={{
        width: withSidebar ? 260 : 0,
        breakpoint: "sm",
        collapsed: { mobile: hideSidebar || !opened },
      }}
      padding="xs"
    >
      <AppShell.Header withBorder={false}>
        <AppHeader
          accounts={accounts}
          opened={opened}
          user={user}
          onOpen={(o) => setOpened(o)}
        />
      </AppShell.Header>
      {account && userRole && (
        <Sidebar
          account={account}
          accounts={accounts}
          hidden={!opened}
          userRole={userRole}
        />
      )}
      <AppShell.Main>
        <Container size="lg">{children}</Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default RootAppShell
