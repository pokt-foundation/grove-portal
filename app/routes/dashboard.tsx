import { LinksFunction, LoaderFunction, json } from "@remix-run/node"
import { Outlet, useCatch, useLoaderData, useTransition } from "@remix-run/react"
import { useEffect } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import analyticsInit, { AmplitudeEvents, trackEvent } from "../utils/analytics"
import Container, { links as ContainerLinks } from "~/components/shared/Container"
import Footer, { links as FooterLinks } from "~/components/shared/Footer"
import Header, { links as HeaderLinks } from "~/components/shared/Header"
import { IconApp, IconNetwork } from "~/components/shared/Icons"
// import Loader, { links as LoaderLinks } from "~/components/shared/Loader"
import Nav, { links as NavLinks } from "~/components/shared/Nav"
import { useTranslate } from "~/context/TranslateContext"
import { requireUserProfile } from "~/utils/session.server"

export const links: LinksFunction = () => {
  return [
    ...HeaderLinks(),
    ...FooterLinks(),
    ...NavLinks(),
    ...ContainerLinks(),
    // ...LoaderLinks(),
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
  ]
  return (
    <>
      <Header user={user}>
        <Nav routes={routes} />
      </Header>
      <main>
        <Container>
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
