import { Burger, Flex, MediaQuery } from "@mantine/core"
import AccountDrawer from "~/components/AccountDrawer"
import { Account, User } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type HeaderProps = {
  user?: User
  accounts: Account[]
  opened: boolean
  hasPendingInvites: boolean
  onOpen: (o: boolean) => void
}

export const AppHeader = ({ user, opened, onOpen, hasPendingInvites }: HeaderProps) => {
  return (
    <>
      <Flex align="center" h="100%" justify="flex-end" p="md">
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
        <AccountDrawer hasPendingInvites={hasPendingInvites} user={user} />
      </Flex>
    </>
  )
}

export default AppHeader
