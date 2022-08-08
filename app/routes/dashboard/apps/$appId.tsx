import { LoaderFunction, MetaFunction, json } from "@remix-run/node"
import { Outlet, useCatch, useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
import AppAddressCard, {
  links as AppAddressCardLinks,
} from "~/components/application/AppAddressCard"
import AppKeysCard, {
  links as AppKeysCardLinks,
} from "~/components/application/AppKeysCard"
import AppRemoveModal, {
  links as AppRemoveModalLinks,
} from "~/components/application/AppRemoveModal"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import Grid from "~/components/shared/Grid"
import Nav, { links as NavLinks } from "~/components/shared/Nav"
import { useTranslate } from "~/context/TranslateContext"
import { initPortalClient } from "~/models/portal/portal.server"
import { ProcessedEndpoint } from "~/models/portal/sdk"
import { getAppRelays, RelayMetric } from "~/models/relaymeter.server"
import { dayjs } from "~/utils/dayjs"
import { requireUser } from "~/utils/session.server"

export const links = () => {
  return [
    ...NavLinks(),
    ...AppKeysCardLinks(),
    ...AppAddressCardLinks(),
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
  endpoint: ProcessedEndpoint
  relaysToday: RelayMetric
  relaysYesterday: RelayMetric
  dailyNetworkRelaysPerWeek: RelayMetric[]
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  invariant(params.appId, "app id not found")
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const { endpoint } = await portal.endpoint({
    endpointID: params.appId,
  })
  invariant(endpoint, "app id not found")

  console.log(endpoint.id)

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
      return await getAppRelays(endpoint.id, day, day)
    }),
  )

  // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one full day
  const today = dayjs().utc().format()
  const yesterday = dayjs().utc().subtract(1, "day").format()
  const relaysToday = await getAppRelays(endpoint.id, today, today)
  const relaysYesterday = await getAppRelays(endpoint.id, yesterday, yesterday)

  return json<AppIdLoaderData>(
    {
      endpoint,
      dailyNetworkRelaysPerWeek,
      relaysToday,
      relaysYesterday,
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
  const { endpoint } = useLoaderData() as AppIdLoaderData
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
      {endpoint && (
        <Grid.Col xs={12}>
          <div>
            <h1>{endpoint.name}</h1>
            <Nav routes={routes} />
          </div>
        </Grid.Col>
      )}
      <Grid.Col md={8}>
        <Outlet />
      </Grid.Col>
      <Grid.Col md={4}>
        {endpoint && (
          <>
            <section>
              <AppKeysCard
                id={endpoint.id}
                publicKey={endpoint.apps[0]?.publicKey}
                secret={endpoint.gatewaySettings.secretKey ?? ""}
              />
            </section>
            <section>
              <AppAddressCard apps={endpoint.apps} />
            </section>
            <section>
              <AdEconomicsForDevs />
            </section>
            <section>
              <FeedbackCard />
            </section>
            <section>
              <AppRemoveModal appId={endpoint.id} />
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
