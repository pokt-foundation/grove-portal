import { json, LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node"
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
import rootStyles from "~/styles/root.css"
import normalizeStyles from "~/styles/normalize.css"
import { Center, Alert } from "@mantine/core"
// import initializeSentry from "~/utils/sentry"
// import initializeAnalytics from "~/utils/analytics"
import { getClientEnv } from "./utils/environment.server"
import { TranslateContextProvider, useTranslate } from "./context/TranslateContext"
import { UserPreferenceContextProvider } from "./context/UserPreferenceContext"
import { FeatureFlagsContextProvider } from "./context/FeatureFlagContext"

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
      <UserPreferenceContextProvider>
        <TranslateContextProvider>{children}</TranslateContextProvider>
      </UserPreferenceContextProvider>
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
            <Alert title={`Application Error: ${caught.status}`} color="red">
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
  console.log(error)
  return (
    <WithProviders>
      <Document title="Uh-oh!">
        <div className="error-container">
          <dialog title="Application Error" color="red">
            {error.message}
          </dialog>
        </div>
      </Document>
    </WithProviders>
  )
}
