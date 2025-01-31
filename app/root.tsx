import "~/styles/normalize.css"
import "@mantine/core/styles.layer.css"
import "@mantine/notifications/styles.layer.css"
import "@mantine/dates/styles.layer.css"
import "mantine-datatable/styles.layer.css"
import "@mantine/nprogress/styles.layer.css"
import "~/styles/root.css"

import { cssBundleHref } from "@remix-run/css-bundle"
import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { Outlet, useFetchers, useLoaderData } from "@remix-run/react"
import { ErrorBoundaryView } from "~/components/ErrorBoundaryView"
import Document from "~/root/components/Document"
import { getColorSchemeSession } from "~/utils/colorScheme.server"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { getClientEnv } from "~/utils/environment.server"
import { seo_title_append } from "~/utils/seo"

export const links: LinksFunction = () => {
  return [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ]
}

export const meta: MetaFunction = () => [
  {
    description:
      "Grove Portal, your gateway to Web3 done right. The Grove Portal acts as your one-stop-shop to manage, and monitor your application's connection to blockchain data.",
  },
  {
    name: "robots",
    content: "noindex,nofollow",
  }
]

export type ColorScheme = "light" | "dark"

export interface RootLoaderData {
  ENV: ReturnType<typeof getClientEnv>
  colorScheme: ColorScheme
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { url } = request
  const MAINTENANCE_MODE = getRequiredServerEnvVar("FLAG_MAINTENANCE_MODE")
  if (MAINTENANCE_MODE === "true" && !url.endsWith("/maintenance")) {
    return redirect("/maintenance")
  }
  const themeSession = await getColorSchemeSession(request)
  const systemPreferredColorScheme = request.headers.get(
    "Sec-CH-Prefers-Color-Scheme",
  ) as ColorScheme

  const sessionColorScheme = themeSession.getColorScheme()

  const colorScheme = sessionColorScheme || systemPreferredColorScheme || "dark"
  return json<RootLoaderData>({
    ENV: getClientEnv(),
    colorScheme,
  })
}

export default function App() {
  const { ENV } = useLoaderData<RootLoaderData>()
  const colorScheme = useColorScheme()
  return (
    <Document colorScheme={colorScheme}>
      <Outlet />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(ENV)};`,
        }}
      />
    </Document>
  )
}

export function ErrorBoundary() {
  return (
    <Document title={`Portal Error ${seo_title_append}`}>
      <ErrorBoundaryView />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(ENV)};`,
        }}
      />
    </Document>
  )
}

const useColorScheme = () => {
  const { colorScheme } = useLoaderData<RootLoaderData>()
  const fetchers = useFetchers()
  const colorSchemeFetcher = fetchers.find(
    (fetcher) => fetcher.key === "color-scheme-fetcher",
  )

  const optimisticColorScheme = colorSchemeFetcher?.formData?.get(
    "color-scheme",
  ) as ColorScheme

  if (optimisticColorScheme === "light" || optimisticColorScheme === "dark") {
    return optimisticColorScheme
  }

  return colorScheme
}
