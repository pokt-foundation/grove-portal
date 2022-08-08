// import initializeSentry from "~/utils/sentry"
// import initializeAnalytics from "~/utils/analytics"
import { Alert, Center } from "@mantine/core"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react"
import { LinksFunction, LoaderFunction, MetaFunction, json } from "@remix-run/node"
import { getClientEnv } from "./utils/environment.server"
import { TranslateContextProvider, useTranslate } from "./context/TranslateContext"
import { UserContextProvider } from "./context/UserContext"
import { FeatureFlagsContextProvider } from "./context/FeatureFlagContext"
import normalizeStyles from "~/styles/normalize.css"
import rootStyles from "~/styles/root.css"

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
}

export const loader: LoaderFunction = async ({ request }) => {
  const data = {
    ENV: getClientEnv(),
  }

  return json<RootLoaderData>(data, {
    headers: {
      "Cache-Control": `private, max-age=${
        process.env.NODE_ENV === "production" ? "3600" : "60"
      }`,
    },
  })
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
  const data = useLoaderData<RootLoaderData>()
  // initializeAnalytics()
  // initializeSentry()

  return (
    <WithProviders>
      <Document>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)};`,
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
