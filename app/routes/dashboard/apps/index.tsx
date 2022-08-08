import { MetaFunction } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { AllAppsLoaderData } from "../apps"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"

export const links = () => {
  return [...TableLinks(), ...CardLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: "Applications Page",
  }
}

export const Apps = () => {
  const allAppsRoute = useMatchesRoute("routes/dashboard/apps")
  const { endpoints } = allAppsRoute?.data as AllAppsLoaderData

  return (
    <section>
      {endpoints && endpoints.length > 0 ? (
        <Table
          search
          columns={["App", "Chain", "Status", ""]}
          data={endpoints.map((app) => ({
            id: app.id,
            app: {
              value: app.name,
              element: <Link to={app.id}>{app.name}</Link>,
            },
            chain: app.chain,
            status: app.status,
            action: {
              value: "",
              element: <Link to={app.id}>...</Link>,
            },
          }))}
          label="Applications"
          paginate={{
            perPage: 10,
          }}
        />
      ) : (
        <Card>
          <div className="pokt-card-header">
            <h3>Applications</h3>
          </div>
        </Card>
      )}
    </section>
  )
}

export default Apps

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h3>{error.message}</h3>
      <p>{error.stack}</p>
    </div>
  )
}
