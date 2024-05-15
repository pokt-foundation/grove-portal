import { Burger, Flex } from "@mantine/core"
import AccountDrawer from "~/components/AccountDrawer"
import { NovuNotificationPopover } from "~/components/AppHeader/NovuNotificationPopover"
import { Account, User } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type HeaderProps = {
  user?: User
  accounts: Account[]
  opened: boolean
  toggle: () => void
}

export const AppHeader = ({ user, opened, toggle }: HeaderProps) => {
  return (
    <Flex align="center" gap="sm" h="100%" justify="flex-end" px="md" py={40}>
      <Burger
        hiddenFrom="sm"
        opened={opened}
        size="sm"
        onClick={() => {
          toggle()
          trackEvent({
            category: AnalyticCategories.user,
            action: AnalyticActions.user_header_menu,
            label: `${opened ? "Close" : "Open"} menu`,
          })
        }}
      />
      {user && <NovuNotificationPopover subscriberId={user.portalUserID} />}
      <AccountDrawer user={user} />
    </Flex>
  )
}

export default AppHeader
