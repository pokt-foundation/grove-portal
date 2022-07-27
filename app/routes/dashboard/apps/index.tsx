import { MetaFunction } from "@remix-run/node"
import { Link } from "@remix-run/react"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { ProcessedEndpoint } from "~/models/portal/sdk"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { AppsLayoutLoaderData } from "../apps"

export const links = () => {
  return [...TableLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: "Applications Page",
  }
}

export const Apps = () => {
  const appIdRoute = useMatchesRoute("routes/dashboard/apps")
  const { endpoints } = appIdRoute?.data as AppsLayoutLoaderData
  const tableData = endpoints
    .filter((e): e is ProcessedEndpoint => e !== null)
    .map((app) => ({
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
    }))
  return (
    <section>
      <Table
        label="Applications"
        data={tableData}
        columns={["App", "Chain", "Status", ""]}
        paginate={{
          perPage: 10,
        }}
        search
      />
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
