import { Grid } from "@mantine/core"
import { json, LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { useTheme } from "@pokt-foundation/ui"
import Advertisement, {
  links as AdvertisementLinks,
} from "~/components/shared/Advertisement"
import Card, { links as CardLinks } from "~/components/shared/Card"
import type { UserLB } from "~/models/portal.server"
import { getLBUserApplications } from "~/models/portal.server"

export const links = () => {
  return [...CardLinks(), ...AdvertisementLinks()]
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
  let rows = ["name", "chain", "status"]
  return (
    <Grid gutter={32}>
      <Grid.Col md={8}>
        <section>
          <Card>
            <h3>Applications</h3>
            <Grid>
              {rows.map((row) => (
                <Grid.Col xs={4} key={row}>
                  <span>{row}</span>
                </Grid.Col>
              ))}
            </Grid>
            {data.userApps.map((app) => (
              <Link key={app.id} to={app.id}>
                <Grid>
                  {rows.map((row) => (
                    <Grid.Col xs={4} key={row}>
                      <span>{app[row as keyof UserLB]}</span>
                    </Grid.Col>
                  ))}
                </Grid>
              </Link>
            ))}
          </Card>
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
