import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import ErrorView from "~/components/ErrorView"
import { initPortalClient } from "~/models/portal/portal.server"
import { Blockchain, PortalApp, SortOrder } from "~/models/portal/sdk"
import { AccountIdLoaderData } from "~/routes/account.$accountId/route"
import { AppIdLoaderData } from "~/routes/account.$accountId.$appId/route"
import SandboxView from "~/routes/account.$accountId.sandbox/view"
import { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export type SandboxLoaderData = {
  blockchains: Blockchain[]
}

export const meta: MetaFunction = () => {
  return {
    title: `Sandbox ${seo_title_append}`,
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  try {
    const getBlockchainsResponse = await portal.blockchains({ sortOrder: SortOrder.Asc })
    if (!getBlockchainsResponse.blockchains) {
      throw new Error("Blockchains not found")
    }

    return json<DataStruct<SandboxLoaderData>>({
      data: {
        blockchains: getBlockchainsResponse.blockchains as Blockchain[],
      },
      error: false,
    })
  } catch (error) {
    return json<DataStruct<AppIdLoaderData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function Sandbox() {
  const { data, error, message } = useLoaderData() as DataStruct<SandboxLoaderData>
  const { account, userRole } = useOutletContext<AccountIdLoaderData>()

  if (error) {
    return <ErrorView message={message} />
  }

  return (
    <SandboxView
      blockchains={data.blockchains}
      portalApps={account.portalApps as PortalApp[]}
      userRole={userRole}
    />
  )
}
