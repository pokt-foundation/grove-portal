import { MantineColorScheme, MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import { NavigationProgress, nprogress } from "@mantine/nprogress"
import { useNavigation } from "@remix-run/react"
import React, { useEffect } from "react"
import { portalTheme } from "~/root/portalTheme"

const RootProviders = ({
  children,
  colorScheme,
}: {
  children: React.ReactNode
  colorScheme?: MantineColorScheme
}) => {
  const { state } = useNavigation()
  useEffect(() => {
    if (state === "loading") nprogress.start()
    if (state === "idle") nprogress.complete()
  }, [state])
  return (
    <MantineProvider defaultColorScheme={colorScheme} theme={portalTheme}>
      <NavigationProgress />
      <Notifications position="bottom-center" />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  )
}

export default RootProviders
