import { redirect } from ".pnpm/react-router@6.11.0_react@18.2.0/node_modules/react-router"
import { showNotification } from "@mantine/notifications"
import { LoaderFunction, MetaFunction, json, ActionFunction } from "@remix-run/node"
import {
  Outlet,
  useActionData,
  useCatch,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import { AccountIdLoaderData } from "../org.$accountId/route"
import AppIdLayoutView from "./view"
import ErrorView from "~/components/ErrorView"
import { initPortalClient } from "~/models/portal/portal.server"
import { Blockchain, PortalApp, RoleNameV2 } from "~/models/portal/sdk"
import { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Application Overview ${seo_title_append}`,
  }
}

export type AppIdLoaderData = {
  app: PortalApp
  blockchains: Blockchain[]
  // relaysToday: RelayMetric
  // relaysYesterday: RelayMetric
  // dailyNetworkRelaysPerWeek: RelayMetric[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  const { accountId, appId } = params
  invariant(accountId, "account id not found")
  invariant(appId, "app id not found")

  try {
    const getUserPortalAppResponse = await portal.getUserPortalApp({ portalAppID: appId })
    if (!getUserPortalAppResponse.getUserPortalApp) {
      throw new Error(
        `Account ${params.appId} not found for user ${user.user.portalUserID}`,
      )
    }

    const getBlockchainsResponse = await portal.blockchains()
    if (!getBlockchainsResponse.blockchains) {
      throw new Error("Blockchains not found")
    }

    return json<DataStruct<AppIdLoaderData>>({
      data: {
        app: getUserPortalAppResponse.getUserPortalApp as PortalApp,
        blockchains: getBlockchainsResponse.blockchains as Blockchain[],
      },
      error: false,
    })
  } catch (error) {
    /**
     * Handle when an invalid app is manually entered & the case when the
     * an application is deleted
     */
    if (getErrorMessage(error).includes("portal app not found")) {
      return redirect(`/org/${accountId}`)
    }

    return json<DataStruct<AppIdLoaderData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export type AppIdActionData = {
  success: boolean
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const formData = await request.formData()
  const { accountId, appId } = params
  invariant(typeof accountId === "string", "accountId must be set")
  invariant(typeof appId === "string", "appId must be set")

  try {
    const delete_application = formData.get("delete_application")

    if (delete_application === "true") {
      // delete application via api
      //
      const deleteAppResponse = await portal.deleteUserPortalApp({ portalAppID: appId })

      if (!deleteAppResponse.deleteUserPortalApp) {
        throw new Error(`Error deleting application: ${appId}`)
      }
    }

    // app no longer exists to redirect back to account
    return redirect(`/org/${accountId}`)
  } catch (error) {
    return json<DataStruct<AppIdActionData>>({
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
  const { data, error, message } = useLoaderData() as DataStruct<AppIdLoaderData>
  const { userRoles } = useOutletContext<AccountIdLoaderData>()
  const actionData = useActionData() as DataStruct<AppIdActionData>

  // handle all notifications at the layout level
  useEffect(() => {
    if (!actionData) return

    if (actionData.message) {
      showNotification({
        message: actionData.message,
      })
    }
  }, [actionData])

  if (error) {
    return <ErrorView message={message} />
  }

  const { app, blockchains } = data

  return (
    <AppIdLayoutView app={app}>
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
