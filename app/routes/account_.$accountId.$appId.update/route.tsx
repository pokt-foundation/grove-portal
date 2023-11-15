import { Box, LoadingOverlay } from "@pokt-foundation/pocket-blocks"
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { useFetcher, useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import ErrorView from "~/components/ErrorView"
import PortalLoader from "~/components/PortalLoader"
import useActionNotification from "~/hooks/useActionNotification"
import { initPortalClient } from "~/models/portal/portal.server"
import { PortalApp, RoleName, UpdatePortalApp } from "~/models/portal/sdk"
import AppForm from "~/routes/account_.$accountId.create/components/AppForm"
import { DataStruct } from "~/types/global"
import { getUserAccountRole } from "~/utils/accountUtils"
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
  invariant(accountId, "AccountId must be set")

  try {
    const getUserPortalAppResponse = await portal
      .getUserPortalApp({ portalAppID: appId, accountID: accountId })
      .catch((e) => {
        console.log(e)
      })

    if (!getUserPortalAppResponse) {
      return redirect(`/account/${accountId}`)
    }

    const getUserAccountResponse = await portal
      .getUserAccount({ accountID: accountId, accepted: true })
      .catch((e) => {
        console.log(e)
      })

    if (!getUserAccountResponse) {
      return redirect(`/account/${params.accountId}`)
    }

    const userRole = getUserAccountRole(
      getUserAccountResponse.getUserAccount.users,
      user.user.portalUserID,
    )

    if (!userRole || userRole === RoleName.Member) {
      return redirect(`/account/${params.accountId}/${appId}`)
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
    invariant(typeof accountId === "string", "accountId not found")
    invariant(typeof appId === "string", "appId not found")

    let input: UpdatePortalApp = {
      appID: appId,
      accountID: accountId,
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
      `/account/${accountId}/${updateUserPortalAppResponse.updateUserPortalApp.id}`,
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

  useActionNotification(fetcher.data)

  if (error) {
    return <ErrorView message={message} />
  }

  const { app } = data

  return fetcher.state === "idle" ? (
    <Box maw={860} mt={90} mx="auto">
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
