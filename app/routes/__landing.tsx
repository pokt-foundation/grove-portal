import { LinksFunction, LoaderFunction, MetaFunction, json } from "@remix-run/node"
import { useMemo } from "react"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import { Header, links as HeaderLinks } from "~/components/shared/Header"
import { Footer, links as FooterLinks } from "~/components/shared/Footer"
import { Nav, links as NavLinks } from "~/components/shared/Nav"
import { getUserProfile } from "~/utils/session.server"

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
      <Header nav="right" user={user}>
        <Nav routes={routes} />
      </Header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
