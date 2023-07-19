import { Navbar } from "@pokt-foundation/pocket-blocks"
import React, { useMemo } from "react"
import { SidebarRoute } from "~/components/Sidebar"
import { AppLink } from "~/components/Sidebar/components/SidebarLinks"
import { EndpointsQuery } from "~/models/portal/sdk"

type SidebarAppsProps = { apps: EndpointsQuery }

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

export const SidebarApps = ({ apps }: SidebarAppsProps) => {
  const appsRoutes = useMemo(() => {
    return Object.entries(apps).flatMap(([parent, apps]) => {
      return typeof apps === "object"
        ? apps.map((app) => ({
            to: `apps/${app?.id}`,
            label: app?.name,
            badge: parent,
            end: true,
            icon: getRandomAppmoji(),
          }))
        : []
    }) as SidebarRoute[]
  }, [apps])

  console.log(appsRoutes)

  return (
    <Navbar.Section>
      {appsRoutes.map((appRoute) => (
        <AppLink key={appRoute.to} route={appRoute} />
      ))}
    </Navbar.Section>
  )
}

export default SidebarApps
