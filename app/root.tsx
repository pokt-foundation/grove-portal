import { Alert, Center, createEmotionCache } from "@pokt-foundation/pocket-blocks"
import { LinksFunction, LoaderFunction, MetaFunction, json } from "@remix-run/node"
import { Outlet, useCatch, useLoaderData } from "@remix-run/react"
import React, { useMemo } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import invariant from "tiny-invariant"
import { authenticator } from "./utils/auth.server"
import { links as FooterLinks } from "~/components/Footer"
import { links as NavLinks } from "~/components/Nav"
import RootAppShell from "~/components/RootAppShell/RootAppShell"
import { initPortalClient } from "~/models/portal/portal.server"
import { EndpointsQuery } from "~/models/portal/sdk"
import Document from "~/root/components/Document"
import PlasmicContainer from "~/root/components/PlasmicContainer"
import RootProviders from "~/root/components/RootProviders"
import { useRoot } from "~/root/hooks/useRoot"
import normalizeStyles from "~/styles/normalize.css"
import rootStyles from "~/styles/root.css"
import { initAdminPortal } from "~/utils/admin"
import { getClientEnv } from "~/utils/environment.server"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: normalizeStyles },
    { rel: "stylesheet", href: rootStyles },
    { rel: "icon", href: "/favicon.ico" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    ...FooterLinks(),
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
  endpoints: EndpointsQuery | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)

  let endpointsResponse
  let portalUserId

  if (user) {
    const portal = initPortalClient({ token: user?.accessToken })
    endpointsResponse = await portal.endpoints().catch((e) => {
      console.log(e)
    })

    const getPortalUserIdResponse = await portal.getPortalUserID().catch((e) => {
      console.log(e)
    })

    portalUserId = getPortalUserIdResponse?.getPortalUserID

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
  }

  return json<RootLoaderData>({
    ENV: getClientEnv(),
    user: user?.profile,
    endpoints: endpointsResponse ?? null,
  })
}

createEmotionCache({ key: "pni" })

export type GlobalOutletContext = {
  endpoints: EndpointsQuery | null
  portalUserId: string | undefined
}

export default function App() {
  const { ENV, user, endpoints } = useLoaderData<RootLoaderData>()
  const { isPlasmic } = useRoot({ user })
  const shouldRenderApp = useMemo(
    () => Boolean(endpoints) && Boolean(user),
    [endpoints, user],
  )
  return (
    <>
      {isPlasmic ? (
        <PlasmicContainer />
      ) : (
        <RootProviders>
          <Document>
            {shouldRenderApp ? (
              <RootAppShell
                endpoints={endpoints as EndpointsQuery}
                user={user as Auth0Profile}
              >
                <Outlet />
              </RootAppShell>
            ) : (
              <div> Loading ...</div>
            )}
            <script
              dangerouslySetInnerHTML={{
                __html: `window.ENV = ${JSON.stringify(ENV)};`,
              }}
            />
          </Document>
        </RootProviders>
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
