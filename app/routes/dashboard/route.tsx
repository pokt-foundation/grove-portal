import { Container } from "@pokt-foundation/pocket-blocks"
import { LinksFunction, LoaderFunction } from "@remix-run/node"
import { Outlet, useCatch } from "@remix-run/react"
import styles from "./styles.css"
import { requireUserProfile } from "~/utils/session.server"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserProfile(request, "/api/auth/auth0")
  return null
}

export default function Dashboard() {
  return (
    <Container className="container" size="lg">
      <Outlet />
    </Container>
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
