import { LoaderFunction, MetaFunction, json } from "@remix-run/node"
import { Outlet, useCatch, useLoaderData, useOutletContext } from "@remix-run/react"
import Stripe from "stripe"
import invariant from "tiny-invariant"
import { AccountIdLoaderData } from "../account.$accountId/route"
import AppIdLayoutView from "./view"
import ErrorView from "~/components/ErrorView"
import { initPortalClient } from "~/models/portal/portal.server"
import { Blockchain, PortalApp, RoleNameV2 } from "~/models/portal/sdk"
import { getErrorMessage } from "~/utils/catchError"
import { LoaderDataStruct } from "~/utils/loader"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: "Application Overview",
  }
}

export type AppIdLoaderData = {
  app: PortalApp
  blockchains: Blockchain[]
  subscription: Stripe.Subscription | undefined

  // relaysToday: RelayMetric
  // relaysYesterday: RelayMetric
  // dailyNetworkRelaysPerWeek: RelayMetric[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  const { appId } = params
  invariant(appId, "app id not found")

  try {
    const getUserPortalAppResponse = await portal.getUserPortalApp({ portalAppID: appId })
    if (!getUserPortalAppResponse.getUserPortalApp) {
      throw new Error(`Account ${params.appId} not found for user ${user.portalUserId}`)
    }

    const getBlockchainsResponse = await portal.blockchains()
    if (!getBlockchainsResponse.blockchains) {
      throw new Error("Blockchains not found")
    }

    // TODO: Fix app subscription fetching
    // const subscription = await getSubscription(uEmail, appId, userId)
    const subscription = undefined

    return json<LoaderDataStruct<AppIdLoaderData>>({
      data: {
        app: getUserPortalAppResponse.getUserPortalApp as PortalApp,
        blockchains: getBlockchainsResponse.blockchains as Blockchain[],
        subscription,
      },
      error: false,
    })
  } catch (error) {
    return json<LoaderDataStruct<AppIdLoaderData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export type AppIdOutletContext = AppIdLoaderData & {
  userRole: RoleNameV2
}

export default function AppIdLayout() {
  const { data, error, message } = useLoaderData() as LoaderDataStruct<AppIdLoaderData>
  const { userRoles } = useOutletContext<AccountIdLoaderData>()

  if (error) {
    return <ErrorView message={message} />
  }

  const { app, blockchains, subscription } = data

  return (
    <AppIdLayoutView app={app} subscription={subscription}>
      <Outlet
        context={{
          app,
          blockchains,
          userRole: userRoles.find((r) => r.portalAppID === app.id)?.roleName,
        }}
      />
    </AppIdLayoutView>
  )
}

export const CatchBoundary = () => {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <div className="error-container">
        <h1>App Catch Error</h1>
        <p>{caught.statusText}</p>
      </div>
    )
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h1>App Error</h1>
      <p>{error.message}</p>
    </div>
  )
}
