import { Outlet, useCatch, useLoaderData } from "@remix-run/react"
import Nav, { links as NavLinks } from "~/components/shared/Nav"
import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
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
  app: UserLB
  dailyRelays: UserLBDailyRelaysResponse
  status: UserLBOnChainDataResponse
  stakedTokens: number
  maxDailyRelays: number
  previousSeccessfulRelays: UserLBPreviousTotalSuccessfulRelaysResponse
  previousTotalRelays: UserLBPreviousTotalRelaysResponse
  successfulRelays: UserLBTotalSuccessfulRelaysResponse
  totalRelays: UserLBTotalRelaysResponse
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  invariant(params.appId, "app id not found")
  const userApps = await getLBUserApplications(request)
  const app = userApps.find((app) => app.id === params.appId)
  invariant(app, "app id not found")

  const dailyRelays = await getLBDailyRelays(params.appId, request)
  const status = await getLBStatus(params.appId, request)
  const stakedTokens = status.stake
  const maxDailyRelays = status.relays * 24

  const previousSeccessfulRelays = await getLBPreviousSuccessfulRelays(
    params.appId,
    request,
  )
  const previousTotalRelays = await getLBPreviousTotalRelays(params.appId, request)
  const successfulRelays = await getLBSuccessfulRelays(params.appId, request)
  const totalRelays = await getLBTotalRelays(params.appId, request)

  return json<AppIdLoaderData>(
    {
      app,
      dailyRelays,
      status,
      stakedTokens,
      maxDailyRelays,
      previousSeccessfulRelays,
      previousTotalRelays,
      successfulRelays,
      totalRelays,
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
                secret={app.gatewaySettings.secretKey}
                publicKey={app.apps[0].publicKey}
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
