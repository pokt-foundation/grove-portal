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
  Grid,
  Group,
} from "@pokt-foundation/pocket-blocks"
import { Form, Link, useActionData } from "@remix-run/react"
import { useEffect, useMemo, useState } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import styles from "./styles.css"
import { EndpointsQuery, ProcessedEndpoint } from "~/models/portal/sdk"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { dayjs } from "~/utils/dayjs"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { getPlanName } from "~/utils/utils"
import ErrorIcon from "~/components/Icons/ErrorIcon"
import NotificationMessage, {
  NotificationType,
  links as NotificationMessageLinks,
} from "~/components/NotificationMessage"
import UsageChartCard, { links as UsageCardLinks } from "~/components/UsageChartCard"
import Table, { links as TableLinks } from "~/components/Table"
import Card, { links as CardLinks } from "~/components/Card"
import Modal, { links as ModalLinks } from "~/components/Modal"

/* c8 ignore start */
export const links = () => {
  return [
    ...CardLinks(),
    ...TableLinks(),
    ...UsageCardLinks(),
    ...ModalLinks(),
    ...NotificationMessageLinks(),
    { rel: "stylesheet", href: styles },
  ]
}
/* c8 ignore stop */

type AppsViewProps = {
  userId: string
  endpoints: EndpointsQuery | null
  dailyNetworkRelaysPerWeek: RelayMetric[] | null
  searchParams: URLSearchParams
  profile: Auth0Profile
}

export const AppsView = ({
  endpoints,
  dailyNetworkRelaysPerWeek,
  searchParams,
  userId,
  profile,
}: AppsViewProps) => {
  const uEmail = profile?._json?.email
  const [showErrorModal, setShowErrorModal] = useState(false)
  const notOwnerEndpoints = useMemo(() => {
    return endpoints
      ? [...endpoints.admin, ...endpoints.member, ...endpoints.pending]
      : []
  }, [endpoints])
  const userDataByEndpoint = useMemo(() => {
    return notOwnerEndpoints.map((endpoint) =>
      endpoint?.users.find((u) => u.email === uEmail),
    )
  }, [notOwnerEndpoints, uEmail])
  const [pendingEndpoints, setPendingEndpoints] = useState<
    EndpointsQuery["pending"] | null
  >(null)

  const [notificationMessageProps, setNotificationMessageProps] =
    useState<NotificationType>({
      type: "info",
      title: "",
      description: "",
      isActive: false,
    })
  const [optionsEndpointId, setOptionsEndpointId] = useState<string>("")
  const [isDeleteModalOptions, setIsDeleteModalOptions] = useState({
    title: "Do you want to leave this app?",
    description: "You will completely lose access to the current application.",
    error: false,
    isOpen: false,
  })
  const [appTodeleteID, setAppToDeleteID] = useState("")
  const actionData = useActionData()

  useEffect(() => {
    const error = searchParams.get("error")
    if (error === "true") {
      const path = window.location.pathname
      window.history.replaceState({}, document.title, path)
      setShowErrorModal(true)
    }
  }, [searchParams])

  useEffect(() => {
    let hasPending = false
    if (endpoints && endpoints.pending) {
      endpoints.pending.forEach((endpoint) => {
        endpoint?.users.forEach((user) => {
          if (user.email === uEmail && user.accepted === false) {
            hasPending = true
          }
        })
      })
      if (hasPending) {
        setPendingEndpoints(endpoints.pending)
      }
    }
  }, [endpoints])

  useEffect(() => {
    if (pendingEndpoints && pendingEndpoints.length > 0) {
      setNotificationMessageProps({
        type: "options",
        title: `You have been invited to ${pendingEndpoints[0]?.name}`,
        description: "Do you wish to accept?",
        isActive: true,
      })
      setOptionsEndpointId(pendingEndpoints[0]?.id || "")
    }
  }, [pendingEndpoints])

  const handleLocallyAcceptInvite = (id: string) => {
    setPendingEndpoints((endpoints) =>
      endpoints ? endpoints.filter((e) => e && e.id !== id) : null,
    )
  }

  useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        if (actionData.type === "leaveApp") {
          setIsDeleteModalOptions((prevOptions) => ({
            ...prevOptions,
            isOpen: true,
            description: "Please, try again",
            title: "Error leaving app",
          }))
          return
        }
        setNotificationMessageProps({
          type: "error",
          title: "There was an error accepting your invite",
          description: "",
          isActive: true,
        })
      } else if (!actionData.error) {
        if (actionData.type === "leaveApp") {
          setIsDeleteModalOptions((prevOptions) => ({
            ...prevOptions,
            isOpen: false,
            title: "Do you want to leave this app?",
            description: "You will completely lose access to the current application.",
          }))
          return
        }
        setNotificationMessageProps({
          type: "success",
          title: "You accepted the invite.",
          description: "",
          isActive: true,
        })
      }
    }
  }, [actionData])

  return (
    <div className="pokt-apps-view">
      {notificationMessageProps.isActive && (
        <section>
          <div style={{ width: "100%", marginBottom: "1em" }}>
            <Form
              method="post"
              style={{ width: "100%" }}
              onSubmit={() => handleLocallyAcceptInvite(optionsEndpointId)}
            >
              <NotificationMessage
                withCloseButton
                isActive={notificationMessageProps.isActive}
                title={notificationMessageProps.title}
                type={notificationMessageProps.type}
                onClose={() =>
                  setNotificationMessageProps({
                    ...notificationMessageProps,
                    isActive: false,
                  })
                }
              >
                {notificationMessageProps.description && (
                  <Text color="white" size="sm">
                    {notificationMessageProps.description}
                  </Text>
                )}
                {notificationMessageProps.type === "options" && (
                  <Group mt={8}>
                    <Button
                      id="accept"
                      name="type"
                      size="xs"
                      type="submit"
                      value="accept"
                      variant="filled"
                    >
                      Accept
                    </Button>
                    <Button
                      id="decline"
                      name="type"
                      size="xs"
                      type="submit"
                      value="decline"
                      variant="outline"
                    >
                      Decline
                    </Button>
                  </Group>
                )}
              </NotificationMessage>
              <input hidden readOnly name="appId" value={optionsEndpointId} />
              <input hidden readOnly name="email" value={profile._json?.email} />
            </Form>
          </div>
        </section>
      )}
      <section>
        <Card>
          <Tabs color="green" defaultValue="applications">
            <Tabs.List>
              <Tabs.Tab value="applications">My Applications</Tabs.Tab>
              {notOwnerEndpoints &&
                notOwnerEndpoints.length > 0 &&
                userDataByEndpoint.length > 0 && <Tabs.Tab value="teams">Teams</Tabs.Tab>}
            </Tabs.List>

            <Tabs.Panel value="applications">
              {endpoints && endpoints.owner.length > 0 ? (
                <Table
                  columns={["App", "Created", "Plan", ""]}
                  data={(endpoints.owner as ProcessedEndpoint[]).map((app) => ({
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
                          <Link to={app.id}>
                            <IconCaretRight className="pokt-icon" />
                          </Link>
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

            {notOwnerEndpoints &&
              notOwnerEndpoints.length > 0 &&
              userDataByEndpoint.length > 0 && (
                <Tabs.Panel value="teams">
                  <Table
                    columns={["App", "Invite status", "Role", ""]}
                    data={(notOwnerEndpoints as ProcessedEndpoint[]).map((team, idx) => ({
                      id: team.id,
                      app: {
                        value: team.name,
                        element: userDataByEndpoint[idx]?.accepted ? (
                          <Link to={team.id.toString()}>{team.name}</Link>
                        ) : (
                          <Text>{team.name}</Text>
                        ),
                      },
                      inviteStatus: {
                        value: userDataByEndpoint[idx]?.accepted ? "Accepted" : "Pending",
                        element: userDataByEndpoint[idx]?.accepted ? (
                          <Link to={team.id.toString()}>
                            <Badge
                              color={
                                userDataByEndpoint[idx]?.accepted ? "green" : "orange"
                              }
                              variant="outline"
                            >
                              {userDataByEndpoint[idx]?.accepted ? "Accepted" : "Pending"}
                            </Badge>
                          </Link>
                        ) : (
                          <Badge
                            color={userDataByEndpoint[idx]?.accepted ? "green" : "orange"}
                            variant="outline"
                          >
                            {userDataByEndpoint[idx]?.accepted ? "Accepted" : "Pending"}
                          </Badge>
                        ),
                      },
                      role: {
                        value: userDataByEndpoint[idx]?.roleName ?? "",
                        element: (
                          <Link to={team.id.toString()}>
                            <Text
                              sx={{
                                margin: "0",
                                fontSize: "inherit",
                                textTransform: "lowercase",
                                "&:first-letter": { textTransform: "uppercase" },
                              }}
                            >
                              {userDataByEndpoint[idx]?.roleName ?? ""}
                            </Text>
                          </Link>
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
                              <Menu.Dropdown
                                sx={{
                                  minWidth: "unset",
                                  width: "unset",
                                }}
                              >
                                {userDataByEndpoint[idx]?.accepted ? (
                                  <Menu.Item>
                                    <Link to={team.id.toString()}>View App</Link>
                                  </Menu.Item>
                                ) : (
                                  <Menu.Item>
                                    <Form
                                      className="apps-dropdown-accept-invite-form"
                                      method="post"
                                    >
                                      <Button size="sm" type="submit">
                                        Accept Invite
                                      </Button>
                                      <input name="type" type="hidden" value="accept" />
                                      <input name="email" type="hidden" value={uEmail} />
                                      <input name="appId" type="hidden" value={team.id} />
                                    </Form>
                                  </Menu.Item>
                                )}
                                <Menu.Item
                                  color="green"
                                  onClick={() => {
                                    setAppToDeleteID(team.id)
                                    setIsDeleteModalOptions((prevOptions) => ({
                                      ...prevOptions,
                                      isOpen: true,
                                    }))
                                  }}
                                >
                                  {userDataByEndpoint[idx]?.accepted
                                    ? "Leave team"
                                    : "Decline invite"}
                                </Menu.Item>
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

      <Modal
        opened={isDeleteModalOptions.isOpen}
        padding={20}
        title="Deleting a user"
        onClose={() => {
          setAppToDeleteID("")
          setIsDeleteModalOptions((prevOptions) => ({ ...prevOptions, isOpen: false }))
        }}
      >
        <Form method="post">
          <div>
            {isDeleteModalOptions.error && (
              <Grid mb="1.6em">
                <ErrorIcon />
              </Grid>
            )}
            <Text mb="1.6em" weight={700}>
              {isDeleteModalOptions.title}
            </Text>
            <Text className="confirmation-modal-description" mb="1.6em" weight={400}>
              {isDeleteModalOptions.description}
            </Text>
            <input name="email" type="hidden" value={uEmail} />
            <input name="appId" type="hidden" value={appTodeleteID} />

            <div className="confirmation-modal-options">
              <Button
                id="cancel"
                mr="1em"
                variant="outline"
                onClick={() =>
                  setIsDeleteModalOptions((prevOptions) => ({
                    ...prevOptions,
                    isOpen: false,
                  }))
                }
              >
                Cancel
              </Button>
              <Button
                color="red"
                name="type"
                type="submit"
                value="leaveApp"
                variant="filled"
              >
                {isDeleteModalOptions.error ? "Try again" : "Leave"}
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default AppsView
