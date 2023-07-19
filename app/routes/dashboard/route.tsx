import {
  AppShell,
  Box,
  Button,
  Center,
  Group,
  Text,
  Title,
  Header as AppHeader,
  Container,
  MediaQuery,
  Burger,
  Flex,
} from "@pokt-foundation/pocket-blocks"
import { json, LinksFunction, LoaderFunction } from "@remix-run/node"
import { Outlet, useCatch, Link, useLoaderData } from "@remix-run/react"
import React, { useState } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import invariant from "tiny-invariant"
import styles from "./styles.css"
import { Sidebar } from "~/components/Sidebar"
import { initPortalClient } from "~/models/portal/portal.server"
import { EndpointsQuery } from "~/models/portal/sdk"
import { initAdminPortal } from "~/utils/admin"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { requireUser } from "~/utils/session.server"

const DASHBOARD_MAINTENANCE = getRequiredClientEnvVar("FLAG_MAINTENANCE_MODE_DASHBOARD")

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export interface DashboardLoaderData {
  user: Awaited<Auth0Profile | undefined>
  endpoints: EndpointsQuery | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request, "/api/auth/auth0")
  const portal = initPortalClient({ token: user.accessToken })

  const getPortalUserIdResponse = await portal.getPortalUserID().catch((e) => {
    console.log(e)
  })

  const endpointsResponse = await portal.endpoints().catch((e) => {
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

  const data = {
    user: user?.profile,
    endpoints: endpointsResponse ?? null,
  }

  return json<DashboardLoaderData>(data)
}

export default function Dashboard() {
  const { endpoints } = useLoaderData<DashboardLoaderData>()
  const [opened, setOpened] = useState(false)

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
    <AppShell
      header={
        <AppHeader height={{ base: 50, md: 70 }} p="md">
          {/*    <AppHeader height={70} p="xs">*/}
          {/*      <Header user={user}>*/}
          {/*        <Nav ariaLabel="Main" routes={routes} />*/}
          {/*      </Header>*/}
          {/*    </AppHeader>*/}
          <Flex align="center" h="100%">
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                mr="xl"
                opened={opened}
                size="sm"
                onClick={() => setOpened((o) => !o)}
              />
            </MediaQuery>
            <Link to="/">
              <img
                alt="Pocket network portal logo"
                loading="lazy"
                src="/pni_portal_logo_blue.svg"
                style={{ height: "1.5rem", objectFit: "contain" }}
              ></img>
            </Link>
          </Flex>
        </AppHeader>
      }
      navbar={<Sidebar endpoints={endpoints} hidden={!opened} />}
      navbarOffsetBreakpoint="sm"
      padding="xs"
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Container className="container" size="lg">
        <Outlet />
      </Container>
    </AppShell>
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
