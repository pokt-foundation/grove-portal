import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import { MantineProvider } from "@pokt-foundation/pocket-blocks"
import React from "react"
import { FeatureFlagsContextProvider } from "~/context/FeatureFlagContext"
import { portalTheme } from "~/root/portalTheme"

const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={portalTheme}
    >
      <FeatureFlagsContextProvider>
        <NotificationsProvider position="bottom-center">
          <ModalsProvider>{children}</ModalsProvider>
        </NotificationsProvider>
      </FeatureFlagsContextProvider>
    </MantineProvider>
  )
}

export default RootProviders
