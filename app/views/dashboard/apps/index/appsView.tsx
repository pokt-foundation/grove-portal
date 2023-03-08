import {
  IconCaretRight,
  IconMoreVertical,
  Title,
  Text,
  Tabs,
  Menu,
  Button,
  Badge,
  Anchor,
  Box,
  theme,
} from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { useEffect, useState } from "react"
import styles from "./styles.css"
import UsageChartCard, {
  links as UsageCardLinks,
} from "~/components/application/UsageChartCard"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import StatusTag, { links as StatusTagLinks } from "~/components/shared/StatusTag"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { teamsMockData } from "~/models/portal/portal.data"
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
    ...StatusTagLinks(),
    { rel: "stylesheet", href: styles },
  ]
}
/* c8 ignore stop */

type AppsViewProps = {
  userId: string
  endpoints: EndpointsQuery["endpoints"] | null
  dailyNetworkRelaysPerWeek: RelayMetric[] | null
  searchParams: URLSearchParams
  teams: typeof teamsMockData
}

export const AppsView = ({
  endpoints,
  dailyNetworkRelaysPerWeek,
  searchParams,
  userId,
  teams,
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
        <Card>
          <Tabs color="green" defaultValue="applications">
            <Tabs.List>
              <Tabs.Tab value="applications">My Applications</Tabs.Tab>
              {endpoints && endpoints.length > 0 && (
                <Tabs.Tab value="teams">Teams</Tabs.Tab>
              )}
            </Tabs.List>

            <Tabs.Panel value="applications">
              {endpoints && endpoints.length > 0 ? (
                <Table
                  columns={["App", "Created", "Plan", ""]}
                  data={(endpoints as ProcessedEndpoint[]).map((app) => ({
                    id: app.id,
                    app: {
                      value: app.name,
                      element: <Link to={app.id}>{app.name}</Link>,
                    },
                    created: {
                      value: dayjs(app.createdAt).format("MM/DD/YY"),
                      element: (
                        <Link to={app.id}>{dayjs(app.createdAt).format("MM/DD/YY")}</Link>
                      ),
                    },
                    plan: {
                      value: getPlanName(app.appLimits.planType),
                      element: (
                        <Link to={app.id}>{getPlanName(app.appLimits.planType)}</Link>
                      ),
                    },
                    action: {
                      value: "",
                      element: (
                        <Box sx={{ textAlign: "right" }}>
                          <Anchor component={Link} to={app.id}>
                            <IconCaretRight />
                          </Anchor>
                        </Box>
                      ),
                    },
                  }))}
                  paginate={
                    getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(userId)
                      ? { perPage: 5 }
                      : undefined
                  }
                />
              ) : (
                <Box>
                  <div className="pokt-card-header">
                    <Title order={3}>Applications</Title>
                  </div>
                  <Text>
                    Get started by{" "}
                    <Link className="empty-apps-link" to="/dashboard/create">
                      creating your first application
                    </Link>
                    .
                  </Text>
                </Box>
              )}
            </Tabs.Panel>

            {endpoints && endpoints.length > 0 && (
              <Tabs.Panel value="teams">
                <Table
                  columns={["App", "Invite status", "Role", ""]}
                  data={teams.map((team) => ({
                    id: team.id,
                    app: {
                      value: team.app,
                      element: <Link to={team.id.toString()}>{team.app}</Link>,
                    },
                    inviteStatus: {
                      value: team.accepted ? "Accepted" : "Pending",
                      element: (
                        <Badge
                          color={team.accepted ? "green" : "orange"}
                          variant="outline"
                        >
                          {team.accepted ? "Accepted" : "Pending"}
                        </Badge>
                      ),
                    },
                    role: {
                      value: team.roleName,
                      element: (
                        <Text
                          m="0"
                          sx={{
                            textTransform: "lowercase",
                            "&:first-letter": { textTransform: "uppercase" },
                          }}
                        >
                          {team.roleName}
                        </Text>
                      ),
                    },
                    action: {
                      value: "More",
                      element: (
                        <Box sx={{ textAlign: "right" }}>
                          <Menu>
                            <Menu.Target>
                              <Anchor>
                                <IconMoreVertical />
                              </Anchor>
                            </Menu.Target>
                            <Menu.Dropdown className="dropdown-teams__content">
                              {team.accepted ? (
                                <Menu.Item>View App</Menu.Item>
                              ) : (
                                <Menu.Item>Accept Invite</Menu.Item>
                              )}
                              <Menu.Item color="green">Leave App</Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Box>
                      ),
                    },
                  }))}
                  paginate={
                    getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(userId)
                      ? { perPage: 5 }
                      : undefined
                  }
                />
              </Tabs.Panel>
            )}
          </Tabs>
        </Card>
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
