import { Outlet, useLoaderData } from "@remix-run/react"
import { Header, links as HeaderLinks } from "~/components/shared/Header"
import { Footer, links as FooterLinks } from "~/components/shared/Footer"
import { Nav, links as NavLinks } from "~/components/shared/Nav"
import { json, LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useEffect, useMemo } from "react"
import { getUserProfile } from "~/utils/session.server"
import { Auth0Profile } from "remix-auth-auth0"
import analyticsInit from "~/utils/analytics"

export const links: LinksFunction = () => {
  return [...HeaderLinks(), ...FooterLinks(), ...NavLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: "Pocket Network Portal",
  }
}

type LoaderData = {
  user: Awaited<Auth0Profile | undefined>
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUserProfile(request),
  })
}

export default function LandingLayout() {
  const { user } = useLoaderData() as LoaderData

  useEffect(() => {
    analyticsInit(user)
  }, [])

  const routes = useMemo(() => {
    const dashboardRoutes = [
      {
        to: "/dashboard",
        label: "Dashboard",
      },
    ]
    const marketingRoutes = [
      {
        to: "/faq",
        label: "FAQs",
      },
      {
        to: "https://www.pokt.network/",
        label: "About Pocket",
        external: true,
      },
      {
        to: "https://docs.pokt.network/home/paths/app-developer",
        label: "Docs",
        external: true,
      },
    ]

    if (user) {
      return [...marketingRoutes, ...dashboardRoutes]
    }
    return marketingRoutes
  }, [user])
  return (
    <>
      <Header user={user} nav="right">
        <Nav routes={routes} />
      </Header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
