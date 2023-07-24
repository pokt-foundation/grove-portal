import { Box, Button, Center, Group, Text, Title } from "@pokt-foundation/pocket-blocks"
import { LinksFunction, LoaderFunction, json } from "@remix-run/node"
import { Outlet, useCatch, Link, useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import styles from "./styles.css"
import NotificationMessage from "~/components/NotificationMessage"
import { initPortalClient } from "~/models/portal/portal.server"
import { initAdminPortal } from "~/utils/admin"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { getClientEnv } from "~/utils/environment.server"
import { requireUser } from "~/utils/session.server"

const DASHBOARD_MAINTENANCE = getRequiredClientEnvVar("FLAG_MAINTENANCE_MODE_DASHBOARD")

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

type DashboardLoaderResponse = {
  notice: {
    active: string
    title: string
    message: string
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const NOTICE_ACTIVE = getClientEnv().NOTICE_ACTIVE
  const NOTICE_TITLE = getClientEnv().NOTICE_TITLE
  const NOTICE_MESSAGE = getClientEnv().NOTICE_MESSAGE

  const user = await requireUser(request, "/api/auth/auth0")
  const portal = initPortalClient({ token: user.accessToken })

  const getPortalUserIdResponse = await portal.getPortalUserID().catch((e) => {
    console.log(e)
  })

  const portalUserId = getPortalUserIdResponse?.getPortalUserID

  if (!portalUserId && user) {
    const email = user?.profile?._json?.email
    const providerUserID = user?.profile?.id

    invariant(email, "email is not found")
    invariant(providerUserID, "providerUserID is not found")

    const portalAdmin = await initAdminPortal(portal)

    await portalAdmin.adminCreatePortalUser({
      email,
      providerUserID,
    })
  }

  return json({
    notice: {
      active: NOTICE_ACTIVE,
      title: NOTICE_TITLE,
      message: NOTICE_MESSAGE,
    },
  })
}

export default function Dashboard() {
  const { notice } = useLoaderData() as DashboardLoaderResponse
  if (DASHBOARD_MAINTENANCE === "true") {
    return (
      <Center className="error-container" mt="xl">
        <Box sx={{ maxWidth: "600px", textAlign: "center" }}>
          <Title order={1}>Scheduled Maintenance</Title>
          <Text color="white" size="sm">
            Our platform is currently undergoing scheduled maintenance today. During this
            time, the Portal UI is temporarily unavailable, and users are unable to create
            or edit applications, adjust security settings, or pay plans. However, rest
            assured that all relay requests are being processed as usual.
          </Text>
          <Group position="center">
            <Button component={Link} size="sm" to="/">
              Portal Home
            </Button>
          </Group>
        </Box>
      </Center>
    )
  }

  return (
    <>
      {notice.active === "true" && (
        <Box mb="xl">
          <NotificationMessage isActive={true} title={notice.title} type={"info"}>
            {notice.message}
          </NotificationMessage>
        </Box>
      )}
      <Outlet />
    </>
  )
}

export const CatchBoundary = () => {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <div className="error-container">
        <h1>Dashboard Error</h1>
        <p>{caught.statusText}</p>
      </div>
    )
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h1>Dashboard Error</h1>
      <p>{error.message}</p>
    </div>
  )
}
