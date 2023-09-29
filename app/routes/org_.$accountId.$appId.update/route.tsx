import { useLoaderData } from ".pnpm/react-router@6.11.0_react@18.2.0/node_modules/react-router"
import { showNotification } from "@mantine/notifications"
import { Box, LoadingOverlay } from "@pokt-foundation/pocket-blocks"
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { useFetcher } from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import ErrorView from "~/components/ErrorView"
import PortalLoader from "~/components/PortalLoader"
import { initPortalClient } from "~/models/portal/portal.server"
import { PortalApp, UpdatePortalApp } from "~/models/portal/sdk"
import AppForm from "~/routes/org_.$accountId.create/components/AppForm"
import { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Update Application ${seo_title_append}`,
  }
}

type UpdateAppLoaderData = {
  app: PortalApp
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const { accountId, appId } = params

  invariant(appId, "AppId must be set")

  try {
    const getUserPortalAppResponse = await portal
      .getUserPortalApp({ portalAppID: appId })
      .catch((e) => {
        console.log(e)
      })

    if (!getUserPortalAppResponse) {
      return redirect(`/org/${accountId}`)
    }

    return json<DataStruct<UpdateAppLoaderData>>({
      data: {
        app: getUserPortalAppResponse.getUserPortalApp as PortalApp,
      },
      error: false,
    })
  } catch (error) {
    return json<DataStruct<UpdateAppLoaderData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const formData = await request.formData()
  const name = formData.get("app-name")
  const description = formData.get("app-description")
  const appEmoji = formData.get("app-emoji")
  const { accountId, appId } = params

  try {
    invariant(name && typeof name === "string", "app name not found")
    invariant(accountId && typeof accountId === "string", "accountId not found")
    invariant(appId && typeof appId === "string", "appId not found")

    let input: Partial<UpdatePortalApp> = {
      appID: appId,
      name,
    }

    if (typeof description === "string") {
      input.description = description
    }
    if (typeof appEmoji === "string") {
      input.appEmoji = appEmoji
    }

    const updateUserPortalAppResponse = await portal
      .updateUserPortalApp({
        input,
      })
      .catch((err) => {
        console.log(err)
        throw new Error("portal api could not create new endpoint")
      })

    if (!updateUserPortalAppResponse.updateUserPortalApp) {
      throw new Error("portal api could not update new endpoint")
    }

    return redirect(
      `/org/${accountId}/${updateUserPortalAppResponse.updateUserPortalApp.id}`,
    )
  } catch (error) {
    return json({
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function UpdateApp() {
  const fetcher = useFetcher()
  const { data, error, message } = useLoaderData() as DataStruct<UpdateAppLoaderData>

  useEffect(() => {
    if (fetcher.data && fetcher.data.error) {
      showNotification({
        message: fetcher.data.message,
      })
    }
  }, [fetcher])

  if (error) {
    return <ErrorView message={message} />
  }

  const { app } = data

  return fetcher.state === "idle" ? (
    <Box maw={860} mx="auto">
      <AppForm
        app={app}
        onSubmit={(formData) =>
          fetcher.submit(formData, {
            method: "POST",
          })
        }
      />
    </Box>
  ) : (
    <LoadingOverlay
      visible
      loader={<PortalLoader message="Updating your application..." />}
    />
  )
}
