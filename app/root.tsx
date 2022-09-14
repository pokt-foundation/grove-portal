import { Alert, Center, Container, Book } from "@pokt-foundation/pocket-blocks"
import { LinksFunction, LoaderFunction, MetaFunction, json } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react"
import { useEffect, useMemo } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import { authenticator } from "./utils/auth.server"
import Footer, { links as FooterLinks } from "~/components/shared/Footer"
import Header, { links as HeaderLinks } from "~/components/shared/Header"
import { IconApp, IconNetwork } from "~/components/shared/Icons"
import Nav, { links as NavLinks } from "~/components/shared/Nav"
import { FeatureFlagsContextProvider } from "~/context/FeatureFlagContext"
import { TranslateContextProvider, useTranslate } from "~/context/TranslateContext"
import { UserContextProvider } from "~/context/UserContext"
import normalizeStyles from "~/styles/normalize.css"
import rootStyles from "~/styles/root.css"
import { getClientEnv } from "~/utils/environment.server"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: normalizeStyles },
    { rel: "stylesheet", href: rootStyles },
    { rel: "icon", href: "/favicon.ico" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap",
    },
    ...FooterLinks(),
    ...HeaderLinks(),
    ...NavLinks(),
  ]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  description:
    "Pocket Explorer helps you to explore and search the Pocket blockchain for transactions, addresses, tokens, prices and other activities taking place on the Pocket Network (POKT).",
  viewport: "width=device-width,initial-scale=1",
})

export interface RootLoaderData {
  ENV: ReturnType<typeof getClientEnv>
  user: Awaited<Auth0Profile | undefined>
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)

  const data = {
    ENV: getClientEnv(),
    user: user?.profile,
  }

  return json<RootLoaderData>(data)
}

const WithProviders: React.FC = ({ children }) => {
  return (
    <FeatureFlagsContextProvider>
      <UserContextProvider>
        <TranslateContextProvider>{children}</TranslateContextProvider>
      </UserContextProvider>
    </FeatureFlagsContextProvider>
  )
}

const Document = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  const { language } = useTranslate()
  const [params] = useSearchParams()

  useEffect(() => {
    const referral = params.get("rid")
    if (referral) {
      window.localStorage.setItem("rid", referral)
    }
  }, [params])

  return (
    <html lang={language}>
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  const { ENV, user } = useLoaderData<RootLoaderData>()
  const { t } = useTranslate()

  enum Protected {
    Public = 0,
    Private = 1,
    Admin = 2,
  }

  const routes = useMemo(() => {
    const allRoutes = [
      {
        to: "/explorer",
        label: "Explorer",
        icon: IconNetwork,
        protected: Protected.Private,
        children: [
          {
            to: "/explorer/transactions",
            label: "Transactions",
            protected: Protected.Private,
          },
          {
            to: "/explorer/transactions",
            label: "Blocks",
            protected: Protected.Private,
          },
        ],
      },
      {
        to: "/dashboard",
        label: "Dashboard",
        icon: IconNetwork,
        protected: Protected.Private,
        children: [
          {
            to: "/dashboard/apps",
            label: t.dashboard.routes.apps,
            icon: IconApp,
            protected: Protected.Private,
          },
          {
            to: "/dashboard/nodes",
            label: "Nodes",
            icon: IconNetwork,
            protected: Protected.Private,
          },
        ],
      },
      {
        to: "/docs",
        label: t.dashboard.routes.docs,
        protected: Protected.Public,
      },
      {
        to: "/faq",
        label: "FAQs",
        protected: Protected.Public,
      },
      {
        to: "https://www.pokt.network/",
        external: true,
        label: "About Pocket",
        protected: Protected.Public,
      },
      {
        to: "/admin",
        label: "Admin",
        protected: Protected.Admin,
      },
    ]
    const protectedLevel = user ? Protected.Private : Protected.Public
    return allRoutes.filter((r) => r.protected <= protectedLevel)
  }, [Protected, t, user])

  return (
    <WithProviders>
      <Document>
        <Header user={user}>
          <Nav routes={routes} />
        </Header>
        <main>
          <Container className="container" size="lg">
            <Outlet />
          </Container>
        </main>
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)};`,
          }}
        />
      </Document>
    </WithProviders>
  )
}

export const CatchBoundary = () => {
  const caught = useCatch()

  if (caught.status === 404) {
    return (
      <WithProviders>
        <Document title={`${caught.status} ${caught.statusText}`}>
          <Center className="error-container" mt="xl">
            <Alert color="red" title={`Application Error: ${caught.status}`}>
              {caught.statusText}
            </Alert>
          </Center>
        </Document>
      </WithProviders>
    )
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <WithProviders>
      <Document title="Uh-oh!">
        <div className="error-container">
          <dialog color="red" title="Application Error">
            {error.message}
          </dialog>
        </div>
      </Document>
    </WithProviders>
  )
}
