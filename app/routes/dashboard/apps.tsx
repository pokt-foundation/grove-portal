import { Grid } from "@mantine/core"
import { json, LoaderFunction } from "@remix-run/node"
import { Link, Outlet, useLoaderData } from "@remix-run/react"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import Button, { links as ButtonLinks } from "~/components/shared/Button"
import Card, { links as CardLinks } from "~/components/shared/Card"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { initPortalClient } from "~/models/portal/portal.server"
import { ProcessedEndpoint } from "~/models/portal/sdk"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { MAX_USER_APPS } from "~/utils/pocketUtils"
import { getPoktId, requireUser } from "~/utils/session.server"

export const links = () => {
  return [
    ...ButtonLinks(),
    ...CardLinks(),
    ...CardListLinks(),
    ...FeedbackCardLinks(),
    ...AdEconomicsForDevsLinks(),
  ]
}

export type AllAppsLoaderData = {
  endpoints: ProcessedEndpoint[] | null
  userId: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const endpointsResponse = await portal.endpoints().catch((e) => {
    console.log(e)
  })
  const endpoints = endpointsResponse
    ? (endpointsResponse.endpoints.filter(
        (endpoint) => endpoint !== null,
      ) as ProcessedEndpoint[])
    : null

  return json<AllAppsLoaderData>(
    {
      endpoints,
      userId: getPoktId(user.profile.id),
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
  const { endpoints, userId } = useLoaderData() as AllAppsLoaderData
  const appIdRoute = useMatchesRoute("routes/dashboard/apps/$appId")

  const userAppsStatus: CardListItem[] = [
    {
      label: "Current Apps",
      value: Number(endpoints?.length),
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
          {endpoints && (
            <Card>
              <div className="pokt-card-header">
                <h3>Account</h3>
              </div>
              <CardList items={userAppsStatus} />
              {(endpoints.length < MAX_USER_APPS ||
                getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(userId)) && (
                <Button fullWidth component={Link} mt={32} to="create">
                  Create New Application
                </Button>
              )}
            </Card>
          )}
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

export default Apps

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h3>{error.message}</h3>
      <p>{error.stack}</p>
    </div>
  )
}
