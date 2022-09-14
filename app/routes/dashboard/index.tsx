import { Link } from "@remix-run/react"
import Card, { links as CardLinks } from "~/components/shared/Card"

export const links = () => {
  return [...CardLinks()]
}

export const DashboardIndex = () => {
  return (
    <>
      <Card>
        <Link to="/docs">Learn</Link>
      </Card>
      <Card>
        <Link to="apps">Manage Apps</Link>
      </Card>
      <Card>
        <Link to="nodes">Manage Nodes</Link>
      </Card>
      <Card>
        <Link to="/explorer">Explorer Network</Link>
      </Card>
    </>
  )
}

export default DashboardIndex

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h3>{error.message}</h3>
      <p>{error.stack}</p>
    </div>
  )
}
