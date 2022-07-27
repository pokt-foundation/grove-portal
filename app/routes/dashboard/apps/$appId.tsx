import { Outlet, useCatch, useLoaderData } from "@remix-run/react"
import Nav, { links as NavLinks } from "~/components/shared/Nav"
import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { SESSIONS_PER_DAY } from "~/utils/pocketUtils"
import invariant from "tiny-invariant"
import {
  getLBDailyRelays,
  getLBPreviousSuccessfulRelays,
  getLBPreviousTotalRelays,
  getLBSuccessfulRelays,
  getLBStatus,
  getLBTotalRelays,
  getLBUserApplications,
  UserLB,
} from "~/models/portal.server"
import AppKeysCard, {
  links as AppKeysCardLinks,
} from "~/components/application/AppKeysCard"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
import Grid from "~/components/shared/Grid"
import {
  UserLBDailyRelaysResponse,
  UserLBOnChainDataResponse,
  UserLBPreviousTotalRelaysResponse,
  UserLBPreviousTotalSuccessfulRelaysResponse,
  UserLBTotalRelaysResponse,
  UserLBTotalSuccessfulRelaysResponse,
} from "@pokt-foundation/portal-types"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import { useTranslate } from "~/context/TranslateContext"
import AppRemoveModal, {
  links as AppRemoveModalLinks,
} from "~/components/application/AppRemoveModal"
import { requireUser } from "~/utils/session.server"
import { initPortalClient } from "~/models/portal/portal.server"
import { ProcessedEndpoint } from "~/models/portal/sdk"
import { dayjs } from "~/utils/dayjs"
import { getAppRelays, RelayMetric } from "~/models/relaymeter.server"

export const links = () => {
  return [
    ...NavLinks(),
    ...AppKeysCardLinks(),
    ...AdEconomicsForDevsLinks(),
    ...FeedbackCardLinks(),
    ...AppRemoveModalLinks(),
  ]
}

export const meta: MetaFunction = () => {
  return {
    title: "Application Overview",
  }
}

export type AppIdLoaderData = {
  app: ProcessedEndpoint
  maxDailyRelays: number
  relaysToday: RelayMetric
  relaysYesterday: RelayMetric
  dailyRelaysPerWeek: RelayMetric[]
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  invariant(params.appId, "app id not found")
  const user = await requireUser(request)
  const portal = initPortalClient()
  const { endpoint: app } = await portal.endpoint(
    { endpointID: params.appId },
    {
      Authorization: `Bearer ${user.accessToken}`,
    },
  )
  invariant(app, "app id not found")

  const dailyRelaysPerWeek = await Promise.all(
    [0, 1, 2, 3, 4, 5, 6].map(async (num) => {
      const from = dayjs()
        .utc()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .subtract(num, "day")
        .format()

      // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one day
      const network = await getAppRelays(app.id, from, from)
      return network
    }),
  )

  // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one day
  const today = dayjs().utc().hour(0).minute(0).second(0).millisecond(0).format()
  const relaysToday = await getAppRelays(app.id, today, today)
  const yesterday = dayjs().utc().hour(0).minute(0).second(0).millisecond(0).format()
  const relaysYesterday = await getAppRelays(app.id, yesterday, yesterday)

  const status = await getLBStatus(params.appId, request)
  const maxDailyRelays = status.relays * SESSIONS_PER_DAY

  return json<AppIdLoaderData>(
    {
      app,
      maxDailyRelays,
      relaysToday,
      relaysYesterday,
      dailyRelaysPerWeek,
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

export default function AppIdLayout() {
  const { t } = useTranslate()
  const { app } = useLoaderData() as AppIdLoaderData
  const routes = [
    {
      to: "/dashboard/apps",
      icon: () => <span>{"<"}</span>,
      end: true,
    },
    {
      to: "",
      label: t.appId.routes.overview,
      end: true,
    },
    {
      to: "requests",
      label: t.appId.routes.requests,
    },
    {
      to: "security",
      label: t.appId.routes.security,
    },
    {
      to: "notifications",
      label: t.appId.routes.notifications,
    },
  ]

  return (
    <Grid gutter={32}>
      {app && (
        <Grid.Col xs={12}>
          <div>
            <h1>{app.name}</h1>
            <Nav routes={routes} />
          </div>
        </Grid.Col>
      )}
      <Grid.Col md={8}>
        <Outlet />
      </Grid.Col>
      <Grid.Col md={4}>
        {app && (
          <>
            <section>
              <AppKeysCard
                id={app.id}
                secret={app.gatewaySettings.secretKey ?? ""}
                publicKey={app.apps[0]?.publicKey}
              />
            </section>
            <section>
              <AdEconomicsForDevs />
            </section>
            <section>
              <FeedbackCard />
            </section>
            <section>
              <AppRemoveModal appId={app.id} />
            </section>
          </>
        )}
      </Grid.Col>
    </Grid>
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
