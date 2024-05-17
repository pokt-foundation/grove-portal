import { ActionIcon, Burger, Flex, useMantineColorScheme } from "@mantine/core"
import { useFetcher } from "@remix-run/react"
import React from "react"
import { LuMoonStar, LuSun } from "react-icons/lu"
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
  const { toggleColorScheme, colorScheme } = useMantineColorScheme()

  const themeFetcher = useFetcher()

  const handleColorSchemeToggle = () => {
    toggleColorScheme()
    themeFetcher.submit(
      {
        "color-scheme": colorScheme === "dark" ? "light" : "dark",
      },
      {
        method: "post",
        action: "/api/set-color-scheme",
      },
    )
  }

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
      <ActionIcon
        aria-label="toggle color scheme"
        color="dark"
        radius="xl"
        size={40}
        variant="outline"
        onClick={handleColorSchemeToggle}
      >
        {colorScheme === "dark" ? <LuSun size={18} /> : <LuMoonStar size={18} />}
      </ActionIcon>
      {user && <NovuNotificationPopover subscriberId={user.portalUserID} />}
      <AccountDrawer user={user} />
    </Flex>
  )
}

export default AppHeader
