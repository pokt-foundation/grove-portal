import { Grid } from "@mantine/core"
import { json, LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import type { UserLB } from "~/models/portal.server"
import { getLBUserApplications } from "~/models/portal.server"
import Table, { links as TableLinks } from "~/components/shared/Table"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"

export const links = () => {
  return [...FeedbackCardLinks(), ...AdEconomicsForDevsLinks(), ...TableLinks()]
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
  return (
    <Grid gutter={32}>
      <Grid.Col md={8}>
        <section>
          <Table
            label="Applications"
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
            columns={["App", "Chain", "Status", ""]}
            paginate={{
              perPage: 10,
            }}
            search
          />
        </section>
      </Grid.Col>
      <Grid.Col md={4}>
        <section>
          <AdEconomicsForDevs />
        </section>
        <section>
          <FeedbackCard />
        </section>
      </Grid.Col>
    </Grid>
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
