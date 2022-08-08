import { Grid } from "@mantine/core"
import { UserLB } from "@pokt-foundation/portal-types"
import { LoaderFunction, json } from "@remix-run/node"
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
import { getLBUserApplications } from "~/models/portal.server"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { MAX_USER_APPS } from "~/utils/pocketUtils"
import { getUserId } from "~/utils/session.server"

export const links = () => {
  return [
    ...ButtonLinks(),
    ...CardLinks(),
    ...CardListLinks(),
    ...FeedbackCardLinks(),
    ...AdEconomicsForDevsLinks(),
  ]
}

type LoaderData = {
  apps: UserLB[]
  userId: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  const apps = await getLBUserApplications(request)

  return json<LoaderData>(
    {
      apps,
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
  const { apps, userId } = useLoaderData() as LoaderData
  const appIdRoute = useMatchesRoute("routes/dashboard/apps/$appId")

  const userAppsStatus: CardListItem[] = [
    {
      label: "Current Apps",
      value: apps.length,
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
            {(apps.length < MAX_USER_APPS ||
              getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(userId)) && (
              <Button fullWidth component={Link} mt={32} to="create">
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
