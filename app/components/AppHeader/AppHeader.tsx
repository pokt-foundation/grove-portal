import { Burger, Flex, Group, MediaQuery } from "@pokt-foundation/pocket-blocks"
import { Link, useParams } from "@remix-run/react"
import OrganizationDrawer from "~/components/OrganizationDrawer"
import OrganizationSelect from "~/components/OrganizationSelect"
import { Account, User } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

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
  const { accountId } = useParams()

  return (
    <>
      <Flex align="center" h="100%" justify="space-between">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            mr="xl"
            opened={opened}
            size="sm"
            onClick={() => {
              onOpen(!opened)
              trackEvent({
                category: AnalyticCategories.user,
                action: AnalyticActions.user_header_menu,
                label: `${opened ? "Close" : "Open"} menu`,
              })
            }}
          />
        </MediaQuery>
        <Link to={accountId ? `/account/${accountId}` : "/"}>
          <img alt="Grove logo" height={20} loading="lazy" src="/grove-logo.svg"></img>
        </Link>
        <Group>
          {user && accounts && accounts.length > 0 && (
            <OrganizationSelect accounts={accounts} />
          )}
          <OrganizationDrawer hasPendingInvites={hasPendingInvites} user={user} />
        </Group>
      </Flex>
    </>
  )
}

export default AppHeader
