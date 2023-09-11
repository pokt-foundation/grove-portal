import { Box, Button, Center, Group, Text, Title } from "@pokt-foundation/pocket-blocks"
import { json, LoaderFunction, redirect } from "@remix-run/node"
import { Outlet, useCatch, Link, useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"

import { initAdminPortal } from "~/utils/admin"
import { authenticator, User } from "~/utils/auth.server"
import { getRequiredClientEnvVar } from "~/utils/environment"

const DASHBOARD_MAINTENANCE = getRequiredClientEnvVar("FLAG_MAINTENANCE_MODE_DASHBOARD")

export type AccountOutletContext = {
  user: User
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    return redirect("/api/auth/auth0")
  }

  // handle edge case where user could have signed up via auth0 and yet not have an internal portalUserId
  if (user) {
    const portal = initPortalClient({ token: user?.accessToken })
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
  }

  return json<AccountOutletContext>({
    user,
  })
}

export default function Account() {
  const { user } = useLoaderData<AccountOutletContext>()

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

  return <Outlet context={user} />
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
