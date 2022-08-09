import { LoaderFunction, MetaFunction, json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { getLBUserApplications } from "~/models/portal.server"
import type { UserLB } from "~/models/portal.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { useEffect } from "react"

export const links = () => {
  return [...TableLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: "Applications Page",
  }
}

type LoaderData = {
  userApps: UserLB[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const userApps = await getLBUserApplications(request)

  return json<LoaderData>(
    {
      userApps,
    },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

export const Apps = () => {
  const data = useLoaderData() as LoaderData

  useEffect(() => {
    trackEvent(AmplitudeEvents.AllAppsView)
  }, [])

  return (
    <section>
      <Table
        search
        columns={["App", "Chain", "Status", ""]}
        data={data.userApps.map((app) => ({
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
