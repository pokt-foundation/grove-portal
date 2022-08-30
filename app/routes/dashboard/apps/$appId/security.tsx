import { MetaFunction } from "@remix-run/node"
import { useParams } from "@remix-run/react"
import { useEffect } from "react"
import { AppIdLoaderData } from "../$appId"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import SecurityView, {
  links as SecurityViewLinks,
} from "~/views/dashboard/apps/appId/security/securityView"

export const meta: MetaFunction = () => {
  return {
    title: "Application Security - POKT Portal - Pocket Network",
  }
}

export const links = () => {
  return [...SecurityViewLinks()]
}

export const AppSecurity = () => {
  const appIDRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  const params = useParams()

  useEffect(() => {
    trackEvent(AmplitudeEvents.SecurityDetailsView)
  }, [])

  const { endpoint, blockchains } = appIDRoute?.data as AppIdLoaderData

  return (
    <SecurityView appId={params.appId} blockchains={blockchains} endpoint={endpoint} />
  )
}

export default AppSecurity
