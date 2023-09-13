import { Navbar } from "@pokt-foundation/pocket-blocks"
import { useParams } from "@remix-run/react"
import React, { useMemo } from "react"
import { InternalLink, SidebarNavRoute } from "~/components/Sidebar/components"
import { PortalApp } from "~/models/portal/sdk"

type SidebarAppsProps = {
  apps: PortalApp[]
  iconOnly?: boolean
}

function getRandomAppmoji(): string {
  const emojis: string[] = [
    "💡",
    "🕹️",
    "⛰️",
    "🚀",
    "🔥",
    "🐛",
    "⚙️",
    "📱",
    "💻",
    "🛠️",
    "🎮 ",
  ]

  const randomIndex: number = Math.floor(Math.random() * emojis.length)
  return emojis[randomIndex]
}

export const SidebarApps = ({ apps, iconOnly }: SidebarAppsProps) => {
  const { accountId } = useParams()
  const appsRoutes = useMemo(() => {
    return apps
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map((app) => ({
        to: app.id,
        label: app.name,
        icon: getRandomAppmoji(),
      })) as SidebarNavRoute[]
  }, [accountId, apps])

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
