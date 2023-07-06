import { Badge, Button, Flex, Grid } from "@pokt-foundation/pocket-blocks"
import { json, LoaderFunction } from "@remix-run/node"
import { Link, Outlet, useLoaderData, useNavigation } from "@remix-run/react"
import { PocketUser } from "../api.user/route"
import styles from "./styles.css"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import Card, { links as CardLinks } from "~/components/Card"
import CardList, { CardListItem, links as CardListLinks } from "~/components/CardList"
import Loader, { links as LoaderLinks } from "~/components/Loader"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { initPortalClient } from "~/models/portal/portal.server"
import { EndpointsQuery, PendingEndpointsQuery } from "~/models/portal/sdk"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { MAX_USER_APPS } from "~/utils/pocketUtils"
import {
  getPoktId,
  getUserPermissions,
  Permissions,
  requireUser,
} from "~/utils/session.server"

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
  endpoints: EndpointsQuery | null
  pendingEndpoints: PendingEndpointsQuery | null
  portalUserId: string | undefined
  isEnterprise: boolean
  user: PocketUser
}

export type AllAppsOutletContext = {
  endpoints: EndpointsQuery | null
  pendingEndpoints: PendingEndpointsQuery | null
  portalUserId: string | undefined
}

export const loader: LoaderFunction = async ({ request, context }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const endpointsResponse = await portal.endpoints().catch((e) => {
    console.log(e)
  })

  const userId = user.profile.id ? getPoktId(user.profile.id) : ""

  const getPortalUserIdResponse = await portal.getPortalUserID().catch((e) => {
    console.log(e)
  })

  const portalUserId = getPortalUserIdResponse?.getPortalUserID

  let pendingEndpointsResponse

  if (portalUserId) {
    pendingEndpointsResponse = await portal
      .pendingEndpoints({ portalUserID: portalUserId })
      .catch((e) => {
        console.log(e)
      })
  }

  const permissions = getUserPermissions(user.accessToken)
  const isEnterprise =
    permissions.includes(Permissions.AppsUnlimited) ||
    getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(userId)

  return json<AllAppsLoaderData>({
    endpoints: endpointsResponse ?? null,
    pendingEndpoints: pendingEndpointsResponse ?? null,
    portalUserId: portalUserId,
    isEnterprise,
    user,
  })
}

export const Apps = () => {
  const { endpoints, isEnterprise, pendingEndpoints, portalUserId } =
    useLoaderData() as AllAppsLoaderData
  const appIdRoute = useMatchesRoute("routes/dashboard.apps.$appId")
  const navigation = useNavigation()

  const userAppsStatus: CardListItem[] = [
    {
      label: "Current Apps",
      value: Number(endpoints?.owner.length) || 0,
    },
    {
      label: "Max Apps",
      value: isEnterprise ? "unlimited" : MAX_USER_APPS,
    },
  ]

  if (!appIdRoute) {
    return (
      <Grid gutter={32}>
        <Grid.Col md={8}>
          {navigation.state === "loading" && <Loader />}
          <Outlet context={{ endpoints, pendingEndpoints, portalUserId }} />
        </Grid.Col>
        <Grid.Col md={4}>
          <Card>
            <div className="pokt-card-header">
              <Flex align="center" justify="space-between" w="100%">
                <h3>Account</h3>
                <Badge variant="filled">{isEnterprise ? "Enterprise" : "Free"}</Badge>
              </Flex>
            </div>
            <CardList items={userAppsStatus} />
            {(!endpoints || endpoints.owner.length < MAX_USER_APPS || isEnterprise) && (
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
