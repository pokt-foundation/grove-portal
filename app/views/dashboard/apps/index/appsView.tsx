import { IconCaretRight, Title, Text, Anchor } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { useEffect, useState } from "react"
import styles from "./styles.css"
import UsageChartCard, {
  links as UsageCardLinks,
} from "~/components/application/UsageChartCard"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { EndpointsQuery, ProcessedEndpoint } from "~/models/portal/sdk"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { dayjs } from "~/utils/dayjs"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { getPlanName } from "~/utils/utils"

/* c8 ignore start */
export const links = () => {
  return [
    ...CardLinks(),
    ...TableLinks(),
    ...UsageCardLinks(),
    ...ModalLinks(),
    { rel: "stylesheet", href: styles },
  ]
}
/* c8 ignore stop */

type AppsViewProps = {
  userId: string
  endpoints: EndpointsQuery["endpoints"] | null
  dailyNetworkRelaysPerWeek: RelayMetric[] | null
  searchParams: URLSearchParams
}

export const AppsView = ({
  endpoints,
  dailyNetworkRelaysPerWeek,
  searchParams,
  userId,
}: AppsViewProps) => {
  const [showErrorModal, setShowErrorModal] = useState(false)

  useEffect(() => {
    const error = searchParams.get("error")
    if (error === "true") {
      const path = window.location.pathname
      window.history.replaceState({}, document.title, path)
      setShowErrorModal(true)
    }
  }, [searchParams])

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
                    <IconCaretRight className="pokt-icon" />
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
              <Title order={3}>Applications</Title>
            </div>
            <Text>
              Get started by{" "}
              <Anchor className="empty-apps-link" component={Link} to="/dashboard/create">
                creating your first application
              </Anchor>
              .
            </Text>
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
      <Modal
        opened={showErrorModal}
        title="These are not the droids you are looking for."
        onClose={() => setShowErrorModal(false)}
      >
        <div>
          <p>Sorry, you do not have access to this appplication.</p>
        </div>
      </Modal>
    </div>
  )
}

export default AppsView
