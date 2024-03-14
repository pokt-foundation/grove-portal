import { AppShell } from "@mantine/core"
import { useMemo } from "react"
import { InternalLink, SidebarNavRoute } from "~/components/Sidebar/components"
import { PortalApp } from "~/models/portal/sdk"

type SidebarAppsProps = {
  apps: PortalApp[]
  iconOnly?: boolean
}

export const SidebarApps = ({ apps, iconOnly }: SidebarAppsProps) => {
  const appsRoutes = useMemo(() => {
    return apps
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map((app) => ({
        to: app.id,
        label: app.name,
        icon: app.appEmoji,
      })) as SidebarNavRoute[]
  }, [apps])

  return (
    <AppShell.Section>
      {appsRoutes.map((SidebarNavRoute) => (
        <InternalLink key={SidebarNavRoute.to} route={SidebarNavRoute} />
      ))}
    </AppShell.Section>
  )
}

export default SidebarApps
