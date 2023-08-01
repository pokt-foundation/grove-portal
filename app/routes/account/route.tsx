import { Box, Button, Center, Group, Text, Title } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction } from "@remix-run/node"
import { Outlet, useCatch, Link } from "@remix-run/react"
import React from "react"
import { Auth0Profile } from "remix-auth-auth0"

import { EndpointsQuery } from "~/models/portal/sdk"
import { getRequiredClientEnvVar } from "~/utils/environment"

const DASHBOARD_MAINTENANCE = getRequiredClientEnvVar("FLAG_MAINTENANCE_MODE_DASHBOARD")

export interface DashboardLoaderData {
  user: Awaited<Auth0Profile | undefined>
  endpoints: EndpointsQuery | null
  portalUserId: string | null
}

export const loader: LoaderFunction = async ({ request }) => {
  return null
}

export default function Account() {
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
