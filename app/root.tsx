import { StylesPlaceholder } from "@mantine/remix"
import {
  Alert,
  Center,
  createEmotionCache,
  Global,
  IconBookOpen,
  IconCircleQuestion,
  IconMail,
  MantineProvider,
  MantineThemeOverride,
  theme,
} from "@pokt-foundation/pocket-blocks"
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
import React, { useEffect, useMemo } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import analyticsInit from "./utils/analytics"
import { authenticator } from "./utils/auth.server"
import Footer, { links as FooterLinks } from "~/components/Footer"
import Header, { links as HeaderLinks } from "~/components/Header"
import { IconApp, IconNetwork } from "~/components/Icons"
import Nav, { links as NavLinks } from "~/components/Nav"
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
    "Pocket Portal, your gateway to Web3 done right. The Portal acts as your one-stop-shop to manage, and monitor your application's connection to blockchain data.",
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

createEmotionCache({ key: "pni" })

export const portalTheme: MantineThemeOverride = {
  ...theme,
  primaryColor: "blue",
  components: {
    ...theme.components,
    Paper: {
      styles: {
        root: {
          overflow: "visible !important",
        },
      },
    },
    Card: {
      styles: (theme) => ({
        root: {
          padding: "32px",
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.navy[5] : theme.colors.gray[1],
        },
      }),
    },
    Tabs: {
      styles: (theme) => ({
        tabsList: {
          borderBottom: "2px solid transparent",
          marginBottom: theme.spacing.md,
        },
        tab: {
          paddingRight: theme.spacing.xs,
          paddingLeft: theme.spacing.xs,
          transition: "border-color ease-in-out 0.3s, color ease-in-out 0.3s",
          "&[data-active]": {
            borderColor: theme.colors[theme.primaryColor][6],
          },
          "&:hover": {
            backgroundColor: "transparent",
            borderColor: "transparent",
            color: theme.colors[theme.primaryColor][8],
          },
          "&[data-active]:hover": {
            borderColor: theme.colors[theme.primaryColor][8],
          },
          "&:not(:last-child)": {
            marginRight: theme.spacing.md,
          },
        },
      }),
    },
    TextInput: {
      styles: {
        input: {
          backgroundColor: "transparent",
        },
      },
    },
    Textarea: {
      styles: {
        input: {
          backgroundColor: "transparent",
        },
      },
    },
    MultiSelect: {
      styles: {
        input: {
          backgroundColor: "transparent",
        },
      },
    },
  },
}

const WithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={portalTheme}
    >
      <FeatureFlagsContextProvider>
        <UserContextProvider>
          <TranslateContextProvider>{children}</TranslateContextProvider>
        </UserContextProvider>
      </FeatureFlagsContextProvider>
    </MantineProvider>
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
        <StylesPlaceholder />
        <Global
          styles={(theme) => ({
            body: {
              ...theme.fn.fontStyles(),
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.navy[7]
                  : theme.colors.gray[2],
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.gray[0]
                  : theme.colors.navy[9],
              lineHeight: theme.lineHeight,
            },
          })}
        />
        <Meta />
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

  useEffect(() => {
    analyticsInit({ id: user?.id ?? "" })
  }, [user])

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
        to: "https://docs.pokt.network/",
        external: true,
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
    <WithProviders>
      <Document>
        <Header user={user}>
          <Nav ariaLabel="Main" routes={routes} />
        </Header>
        <main>
          <Outlet />
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
