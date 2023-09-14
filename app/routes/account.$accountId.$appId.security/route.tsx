import { MetaFunction } from "@remix-run/node"
import { useOutletContext, useParams } from "@remix-run/react"
import { useEffect } from "react"
import { AppIdOutletContext } from "../account.$accountId.$appId/route"
import SecurityView from "./view"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

export const meta: MetaFunction = () => {
  return {
    title: "Application Security - POKT Portal - Pocket Network",
  }
}

export const AppSecurity = () => {
  const params = useParams()

  useEffect(() => {
    trackEvent(AmplitudeEvents.SecurityDetailsView)
  }, [])

  const { app, blockchains } = useOutletContext<AppIdOutletContext>()

  return <SecurityView app={app} blockchains={blockchains} />
}

export default AppSecurity
