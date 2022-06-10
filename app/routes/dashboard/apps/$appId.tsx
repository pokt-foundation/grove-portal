import { Outlet, useCatch, useLoaderData } from "@remix-run/react"
import Nav, { links as NavLinks } from "~/components/shared/Nav"
import { json, LoaderFunction } from "@remix-run/node"
import invariant from "tiny-invariant"
import {
  getLBDailyRelays,
  getLBStatus,
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
} from "@pokt-foundation/portal-types"

export const links = () => {
  return [...NavLinks(), ...AppKeysCardLinks(), ...AdEconomicsForDevsLinks()]
}

export type AppIdLoaderData = {
  app: UserLB
  dailyRelays: UserLBDailyRelaysResponse
  status: UserLBOnChainDataResponse
  stakedTokens: number
  maxDailyRelays: number
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

  return json<AppIdLoaderData>(
    { app, dailyRelays, status, stakedTokens, maxDailyRelays },
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
  const { app } = useLoaderData() as AppIdLoaderData
  const routes = [
    {
      to: "/dashboard/apps",
      icon: () => <span>{"<"}</span>,
      end: true,
    },
    {
      to: "",
      label: "Overview",
      end: true,
    },
    {
      to: "requests",
      label: "Requests",
    },
    {
      to: "security",
      label: "Security",
    },
    {
      to: "notifications",
      label: "Notifications",
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
