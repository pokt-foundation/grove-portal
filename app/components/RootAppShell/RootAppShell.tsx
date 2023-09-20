import { AppShell, Container, Header } from "@pokt-foundation/pocket-blocks"
import React, { ReactNode, useMemo, useState } from "react"
import { AppHeader } from "~/components/AppHeader"
import { Sidebar } from "~/components/Sidebar"
import { Account, PortalApp, User } from "~/models/portal/sdk"
import { useRoot } from "~/root/hooks/useRoot"
import useCommonStyles from "~/styles/commonStyles"

type RootAppShellProps = {
  user: User
  apps?: PortalApp[]
  children: ReactNode
  accounts: Account[]
}

export const RootAppShell = ({ user, apps, children, accounts }: RootAppShellProps) => {
  const [opened, setOpened] = useState(false)
  const { classes: commonClasses } = useCommonStyles()
  const { hideSidebar } = useRoot({ user })
  const navProp = useMemo(
    () => ({
      ...(!hideSidebar && apps && { navbar: <Sidebar apps={apps} hidden={!opened} /> }),
    }),
    [hideSidebar, apps, opened],
  )

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
            hasNewInvites={true}
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