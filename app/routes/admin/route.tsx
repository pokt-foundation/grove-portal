import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
  Container,
} from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, json, LinksFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import React, { useState } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import Shell from "./components/Shell"
import styles from "./styles.css"
import { portalTheme } from "~/root"
import { requireAdmin } from "~/utils/session.server"

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
]

export type Route = {
  to: string
  label?: string
  icon?: React.ReactNode
  end?: boolean
  external?: boolean
}

export type AdminOutletContext = {
  setRoutes: React.Dispatch<React.SetStateAction<Route[]>>
}

type LoaderData = {
  admin: Awaited<Auth0Profile>
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    admin: await requireAdmin(request),
  })
}

export default function Admin() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark")

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  const [routes, setRoutes] = useState<Route[]>([
    {
      to: "",
      label: "Dashboard",
    },
    {
      to: "accounts",
      label: "Accounts",
    },
    {
      to: "blockchains",
      label: "Blockchains",
    },
    {
      to: "custom-pay-plan",
      label: "Plans",
    },
    {
      to: "settings",
      label: "Settings",
    },
  ])

  const [externalRoutes, setExternalRoutes] = useState<Route[]>([
    {
      to: "https://stripe.com",
      label: "Stripe Subscriptions",
    },
    {
      to: "https://pokt-manager.us-east4-1.poktnodes.network:8443",
      label: "Chain Manager",
    },
    {
      to: "https://altruists.us-east4-1.poktnodes.network:8443",
      label: "Altruist Manager",
    },
    {
      to: "https://support.pokt.network",
      label: "Support",
    },
  ])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ ...portalTheme, primaryColor: "magenta", colorScheme }}>
        <Shell externalRoutes={externalRoutes} routes={routes}>
          <Container fluid p={32}>
            <Outlet context={{ setRoutes }} />
          </Container>
        </Shell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
