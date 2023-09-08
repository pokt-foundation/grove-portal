import { ModalsProvider } from "@mantine/modals"
import { MantineProvider } from "@pokt-foundation/pocket-blocks"
import React from "react"
import { FeatureFlagsContextProvider } from "~/context/FeatureFlagContext"
import { TranslateContextProvider } from "~/context/TranslateContext"
import { UserContextProvider } from "~/context/UserContext"
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
        <UserContextProvider>
          <TranslateContextProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </TranslateContextProvider>
        </UserContextProvider>
      </FeatureFlagsContextProvider>
    </MantineProvider>
  )
}

export default RootProviders
