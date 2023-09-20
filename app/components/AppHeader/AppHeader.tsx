import { Burger, Flex, Group, MediaQuery } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import OrganizationDrawer from "~/components/OrganizationDrawer"
import OrganizationSelect from "~/components/OrganizationSelect"
import { Account, User } from "~/models/portal/sdk"

type HeaderProps = {
  user?: User
  accounts: Account[]
  opened: boolean
  hasPendingInvites: boolean
  onOpen: (o: boolean) => void
}

export const AppHeader = ({
  user,
  opened,
  onOpen,
  accounts,
  hasPendingInvites,
}: HeaderProps) => {
  return (
    <>
      <Flex align="center" h="100%" justify="space-between">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger mr="xl" opened={opened} size="sm" onClick={() => onOpen(!opened)} />
        </MediaQuery>
        <Link to="/">
          <img alt="Grove logo" height={20} loading="lazy" src="/grove-logo.svg"></img>
        </Link>
        <Group>
          {user && <OrganizationSelect accounts={accounts} />}
          <OrganizationDrawer hasPendingInvites={hasPendingInvites} user={user} />
        </Group>
      </Flex>
    </>
  )
}

export default AppHeader
