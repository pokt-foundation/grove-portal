import { MetaFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import { ErrorBoundaryView } from "~/components/ErrorBoundaryView"
import { PortalApp } from "~/models/portal/sdk"
import { AccountIdLoaderData } from "~/routes/account.$accountId/route"
import SandboxView from "~/routes/account.$accountId.sandbox/view"
import { seo_title_append } from "~/utils/seo"

export const meta: MetaFunction = () => {
  return [
    {
      title: `Sandbox ${seo_title_append}`,
    },
  ]
}

export default function Sandbox() {
  const { account, blockchains, userRole } = useOutletContext<AccountIdLoaderData>()

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
