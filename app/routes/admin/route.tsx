import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
  Container,
} from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, json, LinksFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import styles from "./styles.css"
import { requireAdmin } from "~/utils/session.server"
import Shell from "./components/Shell"
import React, { useState } from "react"
import { portalTheme } from "~/root"

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

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ ...portalTheme, primaryColor: "magenta", colorScheme }}>
        <Shell routes={routes}>
          <Container fluid p={32}>
            <Outlet context={{ setRoutes }} />
          </Container>
        </Shell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
