import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import React from "react"
import { portalTheme } from "~/root/portalTheme"
import { emotionCache } from "~/utils/mantineCache"

const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      emotionCache={emotionCache}
      theme={portalTheme}
    >
      <Notifications position="bottom-center" />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  )
}

export default RootProviders
