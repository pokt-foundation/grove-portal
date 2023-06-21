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
          <TranslateContextProvider>{children}</TranslateContextProvider>
        </UserContextProvider>
      </FeatureFlagsContextProvider>
    </MantineProvider>
  )
}

export default RootProviders
