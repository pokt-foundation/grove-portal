import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import { MantineProvider } from "@pokt-foundation/pocket-blocks"
import React from "react"
import { portalTheme } from "~/root/portalTheme"

const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={portalTheme}
    >
      <NotificationsProvider position="bottom-center">
        <ModalsProvider>{children}</ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default RootProviders
