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
  links as CardListLinks,
  CardListItem,
} from "~/components/shared/CardList"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { initPortalClient } from "~/models/portal/portal.server"
import { ProcessedEndpoint } from "~/models/portal/sdk"
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
  ]
}

export type AllAppsLoaderData = {
  endpoints: ProcessedEndpoint[]
  userId: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  const userId = await getUserId(request)
  const portal = initPortalClient(user.accessToken)
  const { endpoints } = await portal.endpoints()

  return json<AllAppsLoaderData>(
    {
      endpoints: endpoints.filter((endpoint) => endpoint !== null) as ProcessedEndpoint[],
      userId,
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
