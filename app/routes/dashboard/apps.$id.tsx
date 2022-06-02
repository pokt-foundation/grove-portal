import { Grid } from "@mantine/core"
import { json, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useTheme } from "@pokt-foundation/ui"
import Advertisement, {
  links as AdvertisementLinks,
} from "~/components/shared/Advertisement"
import Card, { links as CardLinks } from "~/components/shared/Card"
import {
  getLBDailyRelays,
  getLBHourlyLatency,
  getLBOriginClassification,
  getLBPreviousSuccessfulRelays,
  getLBPreviousTotalRelays,
  getLBPSessionRelays,
  getLBPSuccessfulRelays,
  getLBUserApplications,
  UserLB,
} from "~/models/portal.server"
import {
  UserLBDailyRelaysResponse,
  UserLBHistoricalLatencyResponse,
  UserLBOriginBucket,
  UserLBPreviousTotalSuccessfulRelaysResponse,
  UserLBPreviousTotalRelaysResponse,
  UserLBSessionRelaysResponse,
  UserLBTotalSuccessfulRelaysResponse,
} from "@pokt-foundation/portal-types"
import invariant from "tiny-invariant"

export const links = () => {
  return [...CardLinks(), ...AdvertisementLinks()]
}

type LoaderData = {
  app: UserLB
  dailyRelays: UserLBDailyRelaysResponse[]
  hourlyLatency: UserLBHistoricalLatencyResponse[]
  originClassification: UserLBOriginBucket[]
  previousSeccessfulRelays: UserLBPreviousTotalSuccessfulRelaysResponse[]
  previousTotalRelays: UserLBPreviousTotalRelaysResponse[]
  sessionRelays: UserLBSessionRelaysResponse[]
  successfulRelays: UserLBTotalSuccessfulRelaysResponse[]
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  invariant(params.id, "app id not found")

  const userApps = await getLBUserApplications(request)
  const app = userApps.find((app) => app.id === params.id)

  invariant(app, "app id not found")

  const dailyRelays = await getLBDailyRelays(params.id, request)
  const hourlyLatency = await getLBHourlyLatency(params.id, request)
  const originClassification = await getLBOriginClassification(params.id, request)
  const previousSeccessfulRelays = await getLBPreviousSuccessfulRelays(params.id, request)
  const previousTotalRelays = await getLBPreviousTotalRelays(params.id, request)
  const sessionRelays = await getLBPSessionRelays(params.id, request)
  const successfulRelays = await getLBPSuccessfulRelays(params.id, request)

  return json<LoaderData>(
    {
      app,
      dailyRelays,
      hourlyLatency,
      originClassification,
      previousSeccessfulRelays,
      previousTotalRelays,
      sessionRelays,
      successfulRelays,
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

export const Application = () => {
  const data = useLoaderData() as LoaderData
  const theme = useTheme()
  return (
    <Grid gutter={32}>
      <Grid.Col xs={12}>
        <h1>{data.app.name}</h1>
      </Grid.Col>
      <Grid.Col md={8}>
        <section>
          <Card>
            <h3>{data.app.name}</h3>
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

export default Application
