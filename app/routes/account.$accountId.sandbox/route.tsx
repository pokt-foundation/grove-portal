import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import { ErrorBoundaryView } from "~/components/ErrorBoundaryView"
import { initPortalClient } from "~/models/portal/portal.server"
import { Blockchain, PortalApp, SortOrder } from "~/models/portal/sdk"
import { AccountIdLoaderData } from "~/routes/account.$accountId/route"
import SandboxView from "~/routes/account.$accountId.sandbox/view"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export type SandboxLoaderData = {
  blockchains: Blockchain[]
}

export const meta: MetaFunction = () => {
  return [
    {
      title: `Sandbox ${seo_title_append}`,
    },
  ]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  try {
    const getBlockchainsResponse = await portal.blockchains({ sortOrder: SortOrder.Asc })
    return json<SandboxLoaderData>({
      blockchains: getBlockchainsResponse.blockchains as Blockchain[],
    })
  } catch (error) {
    throw new Response(getErrorMessage(error), {
      status: 500,
    })
  }
}

export default function Sandbox() {
  const { blockchains } = useLoaderData<SandboxLoaderData>()
  const { account, userRole } = useOutletContext<AccountIdLoaderData>()

  return (
    <SandboxView
      blockchains={blockchains}
      portalApps={account.portalApps as PortalApp[]}
      userRole={userRole}
    />
  )
}

export function ErrorBoundary() {
  return <ErrorBoundaryView />
}
