import { MetaFunction } from "@remix-run/node"
import { PortalMaintenanceView } from "~/routes/maintenance/view"
import { seo_title_append } from "~/utils/seo"

export const meta: MetaFunction = () => {
  return {
    title: `Scheduled Maintenance ${seo_title_append}`,
  }
}
export default function PortalMaintenance() {
  return <PortalMaintenanceView />
}
