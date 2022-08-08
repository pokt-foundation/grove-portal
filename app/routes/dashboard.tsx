import { LinksFunction, LoaderFunction, json } from "@remix-run/node"
import { Outlet, useCatch, useLoaderData, useTransition } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import Container, { links as ContainerLinks } from "~/components/shared/Container"
import Footer, { links as FooterLinks } from "~/components/shared/Footer"
import Header, { links as HeaderLinks } from "~/components/shared/Header"
import { IconApp, IconNetwork } from "~/components/shared/Icons"
import Loader, { links as LoaderLinks } from "~/components/shared/Loader"
import Nav, { links as NavLinks } from "~/components/shared/Nav"
import { useTranslate } from "~/context/TranslateContext"
import { requireUserProfile } from "~/utils/session.server"

export const links: LinksFunction = () => {
  return [
    ...HeaderLinks(),
    ...FooterLinks(),
    ...NavLinks(),
    ...ContainerLinks(),
    ...LoaderLinks(),
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
  const { state } = useTransition()
  const routes = [
    {
      to: "/dashboard",
      label: t.terms.network,
      icon: IconNetwork,
      end: true,
    },
    {
      to: "/dashboard/apps",
      label: t.terms.apps,
      icon: IconApp,
    },
    {
      to: "/dashboard/support",
      label: t.terms.support,
    },
  ]
  return (
    <>
      <Header user={user}>
        <Nav routes={routes} />
      </Header>
      <main>
        <Container>
          {state === "loading" && <Loader />}
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
