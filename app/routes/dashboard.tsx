import { json, LinksFunction, LoaderFunction } from "@remix-run/node"
import { Outlet, useCatch, useLoaderData } from "@remix-run/react"
import Footer, { links as FooterLinks } from "~/components/shared/Footer"
import Header, { links as HeaderLinks } from "~/components/shared/Header"
import Container, { links as ContainerLinks } from "~/components/shared/Container"
import Nav, { links as NavLinks } from "~/components/application/Nav"
import { requireUserProfile } from "~/utils/session.server"
import { Auth0Profile } from "remix-auth-auth0"

export const links: LinksFunction = () => {
  return [...HeaderLinks(), ...FooterLinks(), ...NavLinks(), ...ContainerLinks()]
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
  return (
    <>
      <Header user={user}>
        <Nav />
      </Header>
      <main>
        <Container>
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
