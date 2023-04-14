import { MetaFunction } from "@remix-run/node"
import { useOutletContext, useParams } from "@remix-run/react"
import { useEffect } from "react"
import { AppIdLoaderData, AppIdOutletContext } from "../dashboard.apps.$appId/route"
import SecurityView, { links as SecurityViewLinks } from "./view"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

export const meta: MetaFunction = () => {
  return {
    title: "Application Security - POKT Portal - Pocket Network",
  }
}

export const links = () => {
  return [...SecurityViewLinks()]
}

export const AppSecurity = () => {
  const params = useParams()

  useEffect(() => {
    trackEvent(AmplitudeEvents.SecurityDetailsView)
  }, [])

  const { blockchains, endpoint } = useOutletContext<AppIdOutletContext>()

  return (
    <SecurityView appId={params.appId} blockchains={blockchains} endpoint={endpoint} />
  )
}

export default AppSecurity
