import { Navbar } from "@pokt-foundation/pocket-blocks"
import { useMemo } from "react"
import { InternalLink, SidebarNavRoute } from "~/components/Sidebar/components"
import { PortalApp } from "~/models/portal/sdk"

type SidebarAppsProps = {
  apps: PortalApp[]
  iconOnly?: boolean
}

function getRandomAppmoji(): string {
  const emojis: string[] = [
    "1f4a1",
    "1f680",
    "1f525",
    "1f41b",
    "1f4bb",
    "1f528",
    "1f4be",
    "1f4a3",
    "1f48e",
    "1f3ae",
    "2b50",
    "1f3b1",
  ]

  const randomIndex: number = Math.floor(Math.random() * emojis.length)
  return emojis[randomIndex]
}

export const SidebarApps = ({ apps, iconOnly }: SidebarAppsProps) => {
  const appsRoutes = useMemo(() => {
    return apps
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map((app) => ({
        to: app.id,
        label: app.name,
        icon: app.appEmoji !== "" ? app.appEmoji : getRandomAppmoji(),
      })) as SidebarNavRoute[]
  }, [apps])

  return (
    <Navbar.Section>
      {appsRoutes.map((SidebarNavRoute) => (
        <InternalLink
          key={SidebarNavRoute.to}
          iconOnly={iconOnly}
          route={SidebarNavRoute}
        />
      ))}
    </Navbar.Section>
  )
}

export default SidebarApps
