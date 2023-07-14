import { Box, Button, Center, Group, Text, Title } from "@pokt-foundation/pocket-blocks"
import { LinksFunction, LoaderFunction } from "@remix-run/node"
import { Outlet, useCatch, Link } from "@remix-run/react"
import invariant from "tiny-invariant"
import styles from "./styles.css"
import { initPortalClient } from "~/models/portal/portal.server"
import { initAdminPortal } from "~/utils/admin"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { requireUser } from "~/utils/session.server"

const DASHBOARD_MAINTENANCE = getRequiredClientEnvVar("FLAG_MAINTENANCE_MODE_DASHBOARD")

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async ({ request }) => {
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

  return null
}

export default function Dashboard() {
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

  return <Outlet />
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
