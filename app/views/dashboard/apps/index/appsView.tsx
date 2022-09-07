import { CaretRight } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import styles from "./styles.css"
import UsageChartCard, {
  links as UsageCardLinks,
} from "~/components/application/UsageChartCard"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { EndpointsQuery, ProcessedEndpoint } from "~/models/portal/sdk"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { dayjs } from "~/utils/dayjs"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { getPlanName } from "~/utils/utils"

/* c8 ignore start */
export const links = () => {
  return [
    ...TableLinks(),
    ...CardLinks(),
    ...UsageCardLinks(),
    { rel: "stylesheet", href: styles },
  ]
}
/* c8 ignore stop */

type AppsViewProps = {
  userId: string
  endpoints: EndpointsQuery["endpoints"] | null
  dailyNetworkRelaysPerWeek: RelayMetric[] | null
}

export const AppsView = ({
  endpoints,
  dailyNetworkRelaysPerWeek,
  userId,
}: AppsViewProps) => {
  return (
    <div className="pokt-apps-view">
      <section>
        {endpoints && endpoints.length > 0 ? (
          <Table
            search
            columns={["App", "Created", "Plan", ""]}
            data={(endpoints as unknown as ProcessedEndpoint[]).map((app) => ({
              id: app.id,
              app: {
                value: app.name,
                element: <Link to={app.id}>{app.name}</Link>,
              },
              created: dayjs(app.createdAt).format("MM/DD/YY"),
              plan: getPlanName(app.appLimits.planType),
              action: {
                value: "",
                element: (
                  <Link to={app.id}>
                    <CaretRight className="pokt-icon" />
                  </Link>
                ),
              },
            }))}
            label="Applications"
            paginate={
              getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(userId)
                ? {
                    perPage: 10,
                  }
                : undefined
            }
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
          <UsageChartCard
            emptyLabel="Your applications do not have relay data yet."
            relays={dailyNetworkRelaysPerWeek}
            title="Total User Relay Counts"
          />
        </section>
      )}
    </div>
  )
}

export default AppsView
