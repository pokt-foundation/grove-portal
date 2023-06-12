import { Container } from "@pokt-foundation/pocket-blocks"
import { LinksFunction } from "@remix-run/node"
import { Outlet, useCatch, useLocation } from "@remix-run/react"
import { useMemo } from "react"
import styles from "./styles.css"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function Landing() {
  const { pathname } = useLocation()
  const isDashboard = useMemo(() => pathname.includes("/dashboard/"), [pathname])

  return isDashboard ? (
    <Container fluid className="container">
      <Outlet />
    </Container>
  ) : (
    <Outlet />
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
