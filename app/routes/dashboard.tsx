import { Container } from "@pokt-foundation/pocket-blocks"
import { LinksFunction, LoaderFunction, json } from "@remix-run/node"
import { Outlet, useCatch, useLoaderData, useTransition } from "@remix-run/react"
import { useEffect } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import analyticsInit, { AmplitudeEvents, trackEvent } from "../utils/analytics"
import Footer, { links as FooterLinks } from "~/components/shared/Footer"
import Header, { links as HeaderLinks } from "~/components/shared/Header"
import { IconApp, IconNetwork } from "~/components/shared/Icons"
// import Loader, { links as LoaderLinks } from "~/components/shared/Loader"
import Nav, { links as NavLinks } from "~/components/shared/Nav"
import { useTranslate } from "~/context/TranslateContext"
import styles from "~/styles/dashboard.css"
import { requireUserProfile } from "~/utils/session.server"

export const links: LinksFunction = () => {
  return [
    ...HeaderLinks(),
    ...FooterLinks(),
    ...NavLinks(),
    // ...LoaderLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

type LoaderData = {
  user: Awaited<Auth0Profile>
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await requireUserProfile(request),
  })
}

export default function Dashboard() {
  const { user } = useLoaderData() as LoaderData
  const { t } = useTranslate()
  // const { state } = useTransition()

  useEffect(() => {
    analyticsInit(user)
    trackEvent(AmplitudeEvents.DashboardView)
  }, [user])

  const routes = [
    {
      to: "/dashboard",
      label: t.dashboard.routes.network,
      icon: IconNetwork,
      end: true,
    },
    {
      to: "/dashboard/apps",
      label: t.dashboard.routes.apps,
      icon: IconApp,
    },
    {
      to: "https://docs.pokt.network",
      external: true,
      label: t.dashboard.routes.docs,
    },
    {
      to: "https://discord.gg/pokt",
      external: true,
      label: t.dashboard.routes.discord,
    },
    {
      to: "/contact-sales",
      label: "Contact",
      external: false,
    },
  ]
  return (
    <>
      <Header user={user}>
        <Nav routes={routes} />
      </Header>
      <main>
        <Container className="container" size="lg">
          {/* {state === "loading" && <Loader />} */}
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export const CatchBoundary = () => {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <div className="error-container">
        <h1>Dashboard Error</h1>
        <p>{caught.statusText}</p>
      </div>
    )
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h1>Dashboard Error</h1>
      <p>{error.message}</p>
    </div>
  )
}
