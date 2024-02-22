import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { PortalMaintenanceView } from "~/routes/maintenance/view"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { seo_title_append } from "~/utils/seo"

export const loader: LoaderFunction = async () => {
  const MAINTENANCE_MODE = getRequiredServerEnvVar("FLAG_MAINTENANCE_MODE")
  if (MAINTENANCE_MODE === "false") {
    return redirect("/")
  }
  return null
}

export const meta: MetaFunction = () => {
  return [
    {
      title: `Scheduled Maintenance ${seo_title_append}`,
    },
  ]
}
export default function PortalMaintenance() {
  return <PortalMaintenanceView />
}
