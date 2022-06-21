import { Grid } from "@mantine/core"
import { UserLB } from "@pokt-foundation/portal-types"
import { json, LoaderFunction } from "@remix-run/node"
import { Link, Outlet, useLoaderData } from "@remix-run/react"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import Button from "~/components/shared/Button"
import Card, { links as CardLinks } from "~/components/shared/Card"
import CardList, {
  links as CardListLinks,
  CardListItem,
} from "~/components/shared/CardList"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { getLBUserApplications } from "~/models/portal.server"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { MAX_USER_APPS } from "~/utils/pocketUtils"
import { getUserId } from "~/utils/session.server"

export const links = () => {
  return [
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
