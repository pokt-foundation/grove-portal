import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { useEffect } from "react"
import { AllAppsLoaderData } from "../apps"
import UsageChartCard, {
  links as UsageCardLinks,
} from "~/components/application/UsageChartCard"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { getRelays, RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { dayjs } from "~/utils/dayjs"
import { getPoktId, requireUser } from "~/utils/session.server"

export const links = () => {
  return [...TableLinks(), ...CardLinks(), ...UsageCardLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: "Applications Page",
  }
}

export type AppsLoaderData = {
  dailyNetworkRelaysPerWeek: RelayMetric[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  const userId = getPoktId(user.profile.id)

  const dailyNetworkRelaysPerWeek = await Promise.all(
    [0, 1, 2, 3, 4, 5, 6].map(async (num) => {
      const day = dayjs()
        .utc()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .subtract(num, "day")
        .format()

      // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one full day
      return await getRelays("users", day, day, userId)
    }),
  )

  return json<AppsLoaderData>(
    {
      dailyNetworkRelaysPerWeek,
    },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

export const Apps = () => {
  const allAppsRoute = useMatchesRoute("routes/dashboard/apps")
  const { endpoints } = allAppsRoute?.data as AllAppsLoaderData
  const { dailyNetworkRelaysPerWeek } = useLoaderData() as AppsLoaderData

  useEffect(() => {
    trackEvent(AmplitudeEvents.AllAppsView)
  }, [])

  return (
    <>
      <section>
        {endpoints && endpoints.length > 0 ? (
          <Table
            search
            columns={["App", "Chain", "Status", ""]}
            data={endpoints.map((app) => ({
              id: app.id,
              app: {
                value: app.name,
                element: <Link to={app.id}>{app.name}</Link>,
              },
              chain: app.chain,
              status: app.status,
              action: {
                value: "",
                element: <Link to={app.id}>...</Link>,
              },
            }))}
            label="Applications"
            paginate={{
              perPage: 10,
            }}
          />
        ) : (
          <Card>
            <div className="pokt-card-header">
              <h3>Applications</h3>
            </div>
          </Card>
        )}
      </section>
      {dailyNetworkRelaysPerWeek && (
        <section>
          <UsageChartCard relays={dailyNetworkRelaysPerWeek} />
        </section>
      )}
    </>
  )
}

export default Apps

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h3>{error.message}</h3>
      <p>{error.stack}</p>
    </div>
  )
}
