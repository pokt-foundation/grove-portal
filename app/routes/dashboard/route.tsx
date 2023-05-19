import {
  Box,
  Button,
  Center,
  Container,
  Group,
  IconBookOpen,
  IconCircleQuestion,
  IconMail,
  Text,
  Title,
} from "@pokt-foundation/pocket-blocks"
import { LinksFunction, LoaderFunction, json } from "@remix-run/node"
import { Outlet, useCatch, Link, useLoaderData } from "@remix-run/react"
import { useMemo } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import styles from "./styles.css"
import Footer, { links as FooterLinks } from "~/components/Footer"
import Header, { links as HeaderLinks } from "~/components/Header"
import IconApp from "~/components/Icons/IconApp"
import IconNetwork from "~/components/Icons/IconNetwork"
import Nav, { links as NavLinks } from "~/components/Nav"
import { useTranslate } from "~/context/TranslateContext"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { requireUserProfile } from "~/utils/session.server"

const DASHBOARD_MAINTENANCE = getRequiredClientEnvVar("FLAG_MAINTENANCE_MODE_DASHBOARD")

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    ...FooterLinks(),
    ...HeaderLinks(),
    ...NavLinks(),
  ]
}

type DashboardLoaderData = {
  user: Auth0Profile
}
export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUserProfile(request, "/api/auth/auth0")
  return json({ user })
}

export default function Dashboard() {
  const { user } = useLoaderData() as DashboardLoaderData
  const { t } = useTranslate()

  const routes = useMemo(() => {
    enum Protected {
      Public = 0,
      Private = 1,
      PrivateAdmin = 2,
      Admin = 3,
    }

    const allRoutes = [
      {
        to: "/network",
        label: "Network",
        icon: IconNetwork,
        end: true,
        protected: Protected.Public,
      },
      {
        to: "/dashboard/apps",
        label: t.dashboard.routes.apps,
        icon: IconApp,
        protected: Protected.Public, // show this link to all. dashboard layout handles redirect to login.
      },
      {
        to: "/docs",
        label: t.dashboard.routes.docs,
        icon: IconBookOpen,
        protected: Protected.Public,
      },
      {
        to: "/faq",
        label: "FAQs",
        icon: IconCircleQuestion,
        protected: Protected.Public,
      },
      {
        to: "https://support.pokt.network",
        external: true,
        label: "Support",
        icon: IconMail,
        protected: Protected.Public,
      },
    ]

    let protectedLevel = Protected.Public

    if (user) {
      protectedLevel = Protected.Private
    }

    return allRoutes.filter((r) => r.protected <= protectedLevel)
  }, [t, user])

  return (
    <>
      <Header user={user}>
        <Nav ariaLabel="Main" routes={routes} />
      </Header>
      <main>
        <Container className="container" size="lg">
          {DASHBOARD_MAINTENANCE === "true" ? (
            <Center className="error-container" mt="xl">
              <Box sx={{ maxWidth: "600px", textAlign: "center" }}>
                <Title order={1}>Scheduled Maintenance</Title>
                <Text color="white" size="sm">
                  Our platform is currently undergoing scheduled maintenance today. During
                  this time, the Portal UI is temporarily unavailable, and users are
                  unable to create or edit applications, adjust security settings, or pay
                  plans. However, rest assured that all relay requests are being processed
                  as usual.
                </Text>
                <Group position="center">
                  <Button component={Link} size="sm" to="/">
                    Portal Home
                  </Button>
                </Group>
              </Box>
            </Center>
          ) : (
            <Outlet />
          )}
        </Container>
      </main>
      <Footer />
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
