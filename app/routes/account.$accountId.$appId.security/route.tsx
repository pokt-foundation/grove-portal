import { ActionFunction, json, MetaFunction } from "@remix-run/node"
import { useActionData, useOutletContext } from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import { AppIdOutletContext } from "../account.$accountId.$appId/route"
import SecurityView from "./view"
import { initPortalClient } from "~/models/portal/portal.server"
import { PortalApp, UpdatePortalApp, WhitelistsObject } from "~/models/portal/sdk"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getErrorMessage } from "~/utils/catchError"
import { LoaderDataStruct } from "~/utils/loader"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: "Application Security",
  }
}

export type SecurityActionData = {
  app: PortalApp
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const formData = await request.formData()

  const { appId } = params
  invariant(typeof appId === "string", "appId must be set")

  let input: Partial<UpdatePortalApp> = {
    appID: appId,
  }

  const secretKeyRequired = formData.get("secretKeyRequired")
  const whitelistJson = formData.get("whitelist")

  if (secretKeyRequired) {
    invariant(typeof secretKeyRequired === "string", "secretKeyRequired not found")

    input.appSettings = {
      secretKeyRequired: secretKeyRequired === "on",
    }
  }

  if (whitelistJson) {
    invariant(typeof whitelistJson === "string", "whitelist not found")
    const whitelist: WhitelistsObject = JSON.parse(whitelistJson)
    input.whitelists = whitelist
  }

  try {
    const response = await portal.updateUserPortalApp({ input })

    return json<LoaderDataStruct<SecurityActionData>>({
      data: {
        app: response.updateUserPortalApp as PortalApp,
      },
      error: false,
    })
  } catch (error) {
    return json<LoaderDataStruct<SecurityActionData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export const AppSecurity = () => {
  const actionData = useActionData() as LoaderDataStruct<SecurityActionData>

  useEffect(() => {
    trackEvent(AmplitudeEvents.SecurityDetailsView)
  }, [])

  const { app, blockchains } = useOutletContext<AppIdOutletContext>()

  return <SecurityView actionData={actionData} app={app} blockchains={blockchains} />
}

export default AppSecurity
