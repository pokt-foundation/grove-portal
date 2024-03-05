import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import React from "react"
import { portalTheme } from "~/root/portalTheme"

const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MantineProvider defaultColorScheme="dark" theme={portalTheme}>
        <Notifications position="bottom-center" />
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    </>
  )
}

export default RootProviders
