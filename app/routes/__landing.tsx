import { Container } from "@pokt-foundation/pocket-blocks"
import { LinksFunction, LoaderFunction, MetaFunction, json } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { useMemo, useEffect } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import { Footer, links as FooterLinks } from "~/components/shared/Footer"
import { Header, links as HeaderLinks } from "~/components/shared/Header"
import { Nav, links as NavLinks } from "~/components/shared/Nav"
import analyticsInit, { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getUserProfile } from "~/utils/session.server"
import styles from "~/styles/__landing.css"

export const links: LinksFunction = () => {
  return [
    ...HeaderLinks(),
    ...FooterLinks(),
    ...NavLinks(),
    { rel: "stylesheet", href: styles },
  ]
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
    trackEvent(AmplitudeEvents.LandingView)
  }, [user])

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
        <Container size="lg" className="container">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}
