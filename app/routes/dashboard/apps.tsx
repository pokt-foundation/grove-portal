import { Grid } from "@mantine/core"
import { json, LoaderFunction } from "@remix-run/node"
import { Link, Outlet, useLoaderData } from "@remix-run/react"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import NetworkRelayPerformanceCard, {
  links as NetworkRelayPerformanceCardLinks,
} from "~/components/application/NetworkRelayPerformanceCard"
import Button, { links as ButtonLinks } from "~/components/shared/Button"
import Card, { links as CardLinks } from "~/components/shared/Card"
import CardList, {
  links as CardListLinks,
  CardListItem,
} from "~/components/shared/CardList"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { initPortalClient } from "~/models/portal/portal.server"
import { EndpointsQuery } from "~/models/portal/sdk"
import { getUserRelays, RelayMetric } from "~/models/relaymeter.server"
import { dayjs } from "~/utils/dayjs"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { MAX_USER_APPS } from "~/utils/pocketUtils"
import { getUserId, requireUser } from "~/utils/session.server"

export const links = () => {
  return [
    ...ButtonLinks(),
    ...CardLinks(),
    ...CardListLinks(),
    ...FeedbackCardLinks(),
    ...AdEconomicsForDevsLinks(),
    ...NetworkRelayPerformanceCardLinks(),
  ]
}

export type AppsLayoutLoaderData = {
  endpoints: EndpointsQuery["endpoints"]
  userId: string
  dailyNetworkRelays: RelayMetric
  weeklyNetworkRelays: RelayMetric
  monthlyNetworkRelays: RelayMetric
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  const userId = await getUserId(request)
  const portal = initPortalClient()
  const { endpoints } = await portal.endpoints(
    {},
    {
      Authorization: `Bearer ${user.accessToken}`,
    },
  )

  // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one day
  const fromToday = dayjs().utc().hour(0).minute(0).second(0).millisecond(0).format()
  const dailyNetworkRelays = await getUserRelays(userId, fromToday, fromToday)

  const weeklyNetworkRelays = await getUserRelays(userId)

  const fromMonth = dayjs()
    .utc()
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .subtract(1, "month")
    .format()
  const toMonth = dayjs().utc().hour(0).minute(0).second(0).millisecond(0).format()
  const monthlyNetworkRelays = await getUserRelays(userId, fromMonth, toMonth)

  return json<AppsLayoutLoaderData>(
    {
      endpoints,
      userId: user.profile.id.replace(/auth0\|/g, ""),
      dailyNetworkRelays,
      weeklyNetworkRelays,
      monthlyNetworkRelays,
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

export const AppsLayout = () => {
  const {
    endpoints,
    userId,
    dailyNetworkRelays,
    weeklyNetworkRelays,
    monthlyNetworkRelays,
  } = useLoaderData() as AppsLayoutLoaderData
  const appIdRoute = useMatchesRoute("routes/dashboard/apps/$appId")

  const userAppsStatus: CardListItem[] = [
    {
      label: "Current Apps",
      value: endpoints.length,
    },
    {
      label: "Max Apps",
      value: getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(userId)
        ? "unlimited"
        : MAX_USER_APPS,
    },
  ]

  if (!appIdRoute) {
    return (
      <Grid gutter={32}>
        <Grid.Col md={8}>
          <Outlet />
        </Grid.Col>
        <Grid.Col md={4}>
          <Card>
            <div className="pokt-card-header">
              <h3>Account</h3>
            </div>
            <CardList items={userAppsStatus} />
            {(endpoints.length < MAX_USER_APPS ||
              getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(userId)) && (
              <Button component={Link} to="create" fullWidth mt={32}>
                Create New Application
              </Button>
            )}
          </Card>
          <section>
            <NetworkRelayPerformanceCard
              today={dailyNetworkRelays}
              week={weeklyNetworkRelays}
              month={monthlyNetworkRelays}
            />
          </section>
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

  return <Outlet />
}

export default AppsLayout

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h3>{error.message}</h3>
      <p>{error.stack}</p>
    </div>
  )
}
