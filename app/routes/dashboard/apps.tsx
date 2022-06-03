import { Grid } from "@mantine/core"
import { json, LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { useTheme } from "@pokt-foundation/ui"
import Advertisement, {
  links as AdvertisementLinks,
} from "~/components/shared/Advertisement"
import type { UserLB } from "~/models/portal.server"
import { getLBUserApplications } from "~/models/portal.server"
import Table, { links as TableLinks } from "~/components/shared/Table"

export const links = () => {
  return [...AdvertisementLinks(), ...TableLinks()]
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
  const theme = useTheme()
  return (
    <Grid gutter={32}>
      <Grid.Col md={8}>
        <section>
          <Table
            label="Applications"
            data={data.userApps.map((app) => ({
              id: app.id,
              app: <Link to={app.id}>{app.name}</Link>,
              chain: app.chain,
              status: app.status,
            }))}
            columns={["App", "Chain", "Status"]}
            paginate={{
              perPage: 10,
            }}
          />
        </section>
      </Grid.Col>
      <Grid.Col md={4}>
        <section>
          <Advertisement
            styles={{
              backgroundImage: `url('/economicsDevs.png'), linear-gradient(180deg, ${theme.surfaceGradient1} 0%, ${theme.surfaceGradient2} 100%)`,
            }}
            content={
              <h3>
                Pocket Economics for <span>App Developers</span>
              </h3>
            }
            action={
              <a
                href="https://medium.com/pocket-network/pocket-economics-for-app-developers-487a6ce290c2"
                className="pokt-ad-action"
              >
                Read More
              </a>
            }
          />
        </section>
      </Grid.Col>
    </Grid>
  )
}

export default Apps
