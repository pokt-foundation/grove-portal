import { Button, Grid } from "@pokt-foundation/pocket-blocks"
import { json, LoaderFunction } from "@remix-run/node"
import { Link, Outlet, useLoaderData, useTransition } from "@remix-run/react"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import Card, { links as CardLinks } from "~/components/shared/Card"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"
import Loader, { links as LoaderLinks } from "~/components/shared/Loader"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { initPortalClient } from "~/models/portal/portal.server"
import { EndpointsQuery, ProcessedEndpoint } from "~/models/portal/sdk"
import styles from "~/styles/dashboard.apps.css"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { MAX_USER_APPS } from "~/utils/pocketUtils"
import { getPoktId, requireUser } from "~/utils/session.server"

export const links = () => {
  return [
    ...CardLinks(),
    ...CardListLinks(),
    ...FeedbackCardLinks(),
    ...LoaderLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export type AllAppsLoaderData = {
  endpoints: EndpointsQuery["endpoints"] | null
  userId: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const endpointsResponse = await portal.endpoints().catch((e) => {
    console.log(e)
  })

  return json<AllAppsLoaderData>({
    endpoints: endpointsResponse ? endpointsResponse.endpoints : null,
    userId: getPoktId(user.profile.id),
  })
}

export const Apps = () => {
  const { endpoints, userId } = useLoaderData() as AllAppsLoaderData
  const appIdRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  const { state } = useTransition()

  const userAppsStatus: CardListItem[] = [
    {
      label: "Current Apps",
      value: Number(endpoints?.length) || 0,
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
          {state === "loading" && <Loader />}
          <Outlet />
        </Grid.Col>
        <Grid.Col md={4}>
          <Card>
            <div className="pokt-card-header">
              <h3>Account</h3>
            </div>
            <CardList items={userAppsStatus} />
            {(!endpoints ||
              endpoints.length < MAX_USER_APPS ||
              getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(userId)) && (
              <Button fullWidth component={Link} mt={32} to="/dashboard/create">
                Create New Application
              </Button>
            )}
          </Card>
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
