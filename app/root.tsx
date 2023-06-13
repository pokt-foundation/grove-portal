import {
  Alert,
  Center,
  Container,
  createEmotionCache,
} from "@pokt-foundation/pocket-blocks"
import { LinksFunction, LoaderFunction, MetaFunction, json } from "@remix-run/node"
import { Outlet, useCatch, useLoaderData } from "@remix-run/react"
import React from "react"
import { Auth0Profile } from "remix-auth-auth0"
import { authenticator } from "./utils/auth.server"
import Footer, { links as FooterLinks } from "~/components/Footer"
import Header, { links as HeaderLinks } from "~/components/Header"
import Nav, { links as NavLinks } from "~/components/Nav"
import Document from "~/root/components/Document"
import PlasmicContainer from "~/root/components/PlasmicContainer"
import RootProviders from "~/root/components/RootProviders"
import { useRoot } from "~/root/hooks/useRoot"
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

export default function App() {
  const { ENV, user } = useLoaderData<RootLoaderData>()
  const { isDashboard, routes } = useRoot({ user })
  return (
    <>
      {isDashboard ? (
        <RootProviders>
          <Document>
            <Header user={user}>
              <Nav ariaLabel="Main" routes={routes} />
            </Header>
            <main>
              <Container fluid className="container">
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
        </RootProviders>
      ) : (
        <PlasmicContainer />
      )}
    </>
  )
}

export const CatchBoundary = () => {
  const caught = useCatch()

  if (caught.status === 404) {
    return (
      <RootProviders>
        <Document title={`${caught.status} ${caught.statusText}`}>
          <Center className="error-container" mt="xl">
            <Alert color="red" title={`Application Error: ${caught.status}`}>
              {caught.statusText}
            </Alert>
          </Center>
        </Document>
      </RootProviders>
    )
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <RootProviders>
      <Document title="Uh-oh!">
        <div className="error-container">
          <dialog color="red" title="Application Error">
            {error.message}
          </dialog>
        </div>
      </Document>
    </RootProviders>
  )
}
