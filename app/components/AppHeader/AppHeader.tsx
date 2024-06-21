import { ActionIcon, Burger, Flex, useMantineColorScheme } from "@mantine/core"
import { useFetcher } from "@remix-run/react"
import React from "react"
import { IoContrast } from "react-icons/io5"
import AccountDrawer from "~/components/AccountDrawer"
import { NovuNotificationPopover } from "~/components/AppHeader/NovuNotificationPopover"
import { Account, User } from "~/models/portal/sdk"
import { ColorScheme } from "~/root"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type HeaderProps = {
  user?: User
  accounts: Account[]
  opened: boolean
  toggle: () => void
}

export const AppHeader = ({ user, opened, toggle }: HeaderProps) => {
  const { colorScheme } = useMantineColorScheme()

  const colorSchemeFetcher = useFetcher({ key: "color-scheme-fetcher" })

  const handleColorSchemeToggle = () => {
    colorSchemeFetcher.submit(
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
        <IoContrast size={20} />
      </ActionIcon>
      {user && (
        <NovuNotificationPopover
          colorScheme={colorScheme as ColorScheme}
          subscriberId={user.portalUserID}
        />
      )}
      <AccountDrawer user={user} />
    </Flex>
  )
}

export default AppHeader
