import { useMatches } from "@remix-run/react"
/*import AppRequestsRateCard, {
  links as AppRequestsRateCardLinks,
} from "~/components/application/AppRequestsRateCard" */
import { links as AppRequestsRateCardLinks } from "~/components/application/AppRequestsRateCard"
// import { useMatchesRoute } from "~/hooks/useMatchesRoute"
//import { AppIdIndexLoaderData } from "./index"

export const links = () => {
  return [...AppRequestsRateCardLinks()]
}

export default function AppSecurity() {
  const matches = useMatches()
  console.log(matches)
  // const appIdIndexRoute = useMatchesRoute("routes/dashboard/apps/$appId/index")
  // const data = appIdIndexRoute?.data as AppIdIndexLoaderData
  return (
    <>
      <h3>Requests</h3>
      {/* {data.previousSeccessfulRelays &&
        data.previousTotalRelays &&
        data.successfulRelays &&
        data.totalRelays && (
          <section>
            <AppRequestsRateCard
              previousRelays={data.previousTotalRelays.total_relays}
              previousSuccessfulRelays={data.previousSeccessfulRelays.successful_relays}
              successfulRelays={data.successfulRelays.successful_relays}
              totalRelays={data.totalRelays.total_relays}
            />
          </section>
        )} */}
    </>
  )
}
