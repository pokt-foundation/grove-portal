import { createEmotionCache } from "@mantine/core"
import { LinksFunction, LoaderFunction, json, MetaFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import Document from "~/root/components/Document"
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
  ]
}

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
  },
  {
    description:
      "Grove Portal, your gateway to Web3 done right. The Grove Portal acts as your one-stop-shop to manage, and monitor your application's connection to blockchain data.",
    viewport: "width=device-width,initial-scale=1",
  },
]

export interface RootLoaderData {
  ENV: ReturnType<typeof getClientEnv>
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<RootLoaderData>({
    ENV: getClientEnv(),
  })
}

createEmotionCache({ key: "pni" })

export default function App() {
  const { ENV } = useLoaderData<RootLoaderData>()

  return (
    <Document>
      <Outlet />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(ENV)};`,
        }}
      />
    </Document>
  )
}

// export const CatchBoundary = () => {
//   const caught = useCatch()
//
//   if (caught.status === 404) {
//     return (
//       <Document title={`Portal Error ${seo_title_append}`}>
//         <Center className="error-container" mt="xl">
//           <Alert color="red" title={`Application Error: ${caught.status}`}>
//             {caught.statusText}
//           </Alert>
//         </Center>
//       </Document>
//     )
//   }
//   throw new Error(`Unexpected caught response with status: ${caught.status}`)
// }
//
// export const ErrorBoundary = ({ error }: { error: Error }) => {
//   return (
//     <Document title={`Portal Error ${seo_title_append}`}>
//       <div className="error-container">
//         <dialog color="red" title="Application Error">
//           {error.message}
//         </dialog>
//       </div>
//     </Document>
//   )
// }
