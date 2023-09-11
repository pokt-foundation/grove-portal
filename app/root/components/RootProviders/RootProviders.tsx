import { ModalsProvider } from "@mantine/modals"
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
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  )
}

export default RootProviders
