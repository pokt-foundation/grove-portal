import { json, LinksFunction, LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import Footer, { links as FooterLinks } from "~/components/shared/Footer"
import Header, { links as HeaderLinks } from "~/components/shared/Header"
import Container, { links as ContainerLinks } from "~/components/shared/Container"
import Nav, { links as NavLinks } from "~/components/application/Nav"
import { requireUser } from "~/utils/session.server"

export const links: LinksFunction = () => {
  return [...HeaderLinks(), ...FooterLinks(), ...NavLinks(), ...ContainerLinks()]
}

type LoaderData = {
  user: unknown
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await requireUser(request),
  })
}

export default function Dashboard() {
  const { user } = useLoaderData()
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

export const ErrorBoundary = ({ error }: { error: Error }) => {
  console.log(error)
  return (
    <div className="error-container">
      <dialog title="Index Error" color="red">
        {error.message}
      </dialog>
    </div>
  )
}
