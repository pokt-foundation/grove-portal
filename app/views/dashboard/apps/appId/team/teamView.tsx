import {
  Button,
  IconPlus,
  IconMoreVertical,
  Grid,
  Menu,
  Select,
  Anchor,
  Badge,
  Text,
  Box,
} from "@pokt-foundation/pocket-blocks"
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "@remix-run/react"
import { Transition } from "@remix-run/react/dist/transition"
import clsx from "clsx"
import { useEffect, useMemo, useState } from "react"
import styles from "./styles.css"
import AppRadioCards, {
  links as AppRadioCardsLinks,
} from "~/components/application/AppRadioCards"
import Card from "~/components/shared/Card"
import ErrorIcon from "~/components/shared/Icons/ErrorIcon"
import Loader, { links as LoaderLinks } from "~/components/shared/Loader"
import Modal from "~/components/shared/Modal"
import NotificationMessage, {
  links as NotificationMessageLinks,
  NotificationType,
} from "~/components/shared/NotificationMessage"
import Table, { links as TableLinks } from "~/components/shared/Table"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { EndpointQuery, RoleName } from "~/models/portal/sdk"
import { ActionData, TeamLoaderData } from "~/routes/dashboard/apps/$appId/team"

export const links = () => {
  return [
    ...AppRadioCardsLinks(),
    ...TextInputLinks(),
    ...LoaderLinks(),
    ...TableLinks(),
    ...NotificationMessageLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

const tiers: {
  cardDescription: string
  name: string
  value: RoleName
  active: string
}[] = [
  {
    cardDescription: "Team Member abilities and manage application access and billing",
    name: "Team Admin",
    value: RoleName.Admin,
    active: "true",
  },
  {
    cardDescription:
      "View application metrics, manage security and view basic plan details",
    name: "Team Member",
    value: RoleName.Member,
    active: "true",
  },
]

type TeamViewProps = {
  state: Transition["state"]
  endpoint: EndpointQuery["endpoint"]
}

type ConfirmationModalOptionsType = {
  type: "options" | "error"
  isActive: boolean
}

function TeamView({ state, endpoint }: TeamViewProps) {
  const [isInviteNewUserOpen, setInviteNewUserOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [radioSelectedValue, setRadioSelectedValue] = useState("ADMIN")
  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ConfirmationModalOptionsType>({
      type: "options",
      isActive: false,
    })
  const [confirmationModalTitle, setConfirmationModalTitle] = useState<string>("")
  const [confirmationModalDescription, setConfirmationModalDescription] =
    useState<string>("")
  const [confirmationModalEmail, setConfirmationModalEmail] = useState<string>("")
  const [notificationMessageProps, setNotificationMessageProps] =
    useState<NotificationType>({
      type: "info",
      title: "",
      description: "",
      isActive: false,
    })
  const [isUpdateRoleModalOpened, setIsUpdateRoleModalOpened] = useState<boolean>(false)
  const [updateRoleModalData, setUpdateRoleModalData] = useState({
    email: "",
    roleName: "",
    transferOwnership: false,
  })

  const navigation = useNavigation()
  const actionData = useActionData<ActionData>()
  const { profile } = useLoaderData<TeamLoaderData>()
  const inviteFetcher = useFetcher()

  const handleResendInviteEmail = (email: string, app: string) => {
    inviteFetcher.submit(
      {
        "email-address": email,
        "app-name": app,
        type: "resend",
      },
      {
        method: "post",
      },
    )
  }

  const userRole = useMemo(() => {
    return (
      endpoint?.users?.find(({ email }) => email === profile?._json?.email)?.roleName ??
      RoleName.Member
    )
  }, [endpoint])

  const isAdminUser = useMemo(
    () =>
      endpoint?.users?.some(
        ({ email, roleName }) => email === profile?._json?.email && roleName === "ADMIN",
      ),
    [endpoint],
  )

  const isOwnerUser = useMemo(
    () =>
      endpoint?.users?.some(
        ({ email, roleName }) => email === profile?._json?.email && roleName === "OWNER",
      ),
    [endpoint],
  )

  const isMember = !isAdminUser && !isOwnerUser

  const handleUpdateRoleSubmit = (
    email: string,
    roleName: RoleName,
    transferOwnership: boolean = false,
  ) => {
    setUpdateRoleModalData({
      email,
      roleName,
      transferOwnership,
    })
    setIsUpdateRoleModalOpened(true)
  }

  const handleLeaveRemoveUser = (email: string) => {
    setConfirmationModalProps({ type: "options", isActive: true })
    setConfirmationModalTitle("Do you want to remove this user from this app team?")
    setConfirmationModalDescription(
      "That user will completely lose access to the current application.",
    )
    setConfirmationModalEmail(email)
  }

  const getRolesSelectData = useMemo(() => {
    let array = []
    if (isOwnerUser) {
      array = Object.values(RoleName)
    } else {
      array = Object.values(RoleName).filter((r) => r !== RoleName.Owner)
    }
    return array.map((role) => ({
      value: role,
      label: role,
    }))
  }, [isOwnerUser])

  useEffect(() => {
    if (actionData) {
      if (actionData.type === "delete") {
        if (actionData.error) {
          setNotificationMessageProps({
            type: "error",
            title: "Error deleting the user",
            description: "Please, try again",
            isActive: true,
          })
          setConfirmationModalProps({ type: "error", isActive: true })
          return
        }
        setConfirmationModalProps((prevConfirmationModalProps) => ({
          ...prevConfirmationModalProps,
          isActive: false,
        }))

        setNotificationMessageProps({
          type: "success",
          isActive: true,
          title: "User removed",
          description: `We have sent a confirmation to ${actionData.email}.`,
        })
      } else if (actionData.type === "invite") {
        if (actionData.error) {
          setNotificationMessageProps({
            type: "error",
            isActive: true,
            title: "Invite error",
            description: "We had some issues with the invite. Please try again later.",
          })
          return
        }

        setNotificationMessageProps({
          type: "success",
          isActive: true,
          title: "Invite sent",
          description: `We have sent an invitation to ${actionData.email}. You can review the invite status below.`,
        })

        setInviteNewUserOpen(false)
        setInviteEmail("")
      } else if (actionData.type === "updateRole") {
        if (actionData.error) {
          return
        }

        setIsUpdateRoleModalOpened(false)
        setUpdateRoleModalData({
          email: "",
          roleName: "",
          transferOwnership: false,
        })
      }
    }
  }, [actionData])

  return (
    <>
      {state === "loading" && <Loader />}
      {actionData && (
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
          <Text color="white" size="sm">
            {notificationMessageProps.description}
          </Text>
        </NotificationMessage>
      )}
      {isInviteNewUserOpen && !isMember ? (
        <Card>
          <div className="pokt-card-header">
            <h3>Invite New User</h3>
          </div>
          <Form className="invite-new-user__form" method="post">
            <TextInput
              label="Email address"
              name="email-address"
              placeholder="new@server.com"
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <input
              hidden
              readOnly
              name="app-name"
              style={{ display: "none" }}
              value={endpoint.name}
            />
            <AppRadioCards
              currentRadio={radioSelectedValue}
              radioData={tiers}
              setRadio={setRadioSelectedValue}
            />

            <div className="invite-new-user__form__buttons-container">
              <Button
                color="gray"
                size="sm"
                variant="outline"
                onClick={() => setInviteNewUserOpen(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={navigation.state === "submitting" || inviteEmail === ""}
                name="type"
                size="sm"
                type="submit"
                value="invite"
              >
                Send Invite
              </Button>
            </div>
          </Form>
        </Card>
      ) : null}
      <Card>
        <Table
          columns={["Email", "Status", "Role", ""]}
          data={endpoint?.users?.map(({ email, roleName, accepted }) => {
            return {
              id: email,
              email: email,
              status: {
                element: (
                  <Badge color={accepted ? "green" : "orange"} variant="outline">
                    {accepted ? "Accepted" : "Pending"}
                  </Badge>
                ),
                value: accepted ? "ACCEPTED" : "PENDING",
              },
              role: {
                element: (
                  <div className="list__role">
                    {isOwnerUser || (isAdminUser && roleName !== RoleName.Owner) ? (
                      <Select
                        data={getRolesSelectData}
                        defaultValue={roleName}
                        onChange={(value) =>
                          handleUpdateRoleSubmit(email, value as RoleName)
                        }
                      />
                    ) : (
                      <Text
                        sx={{
                          textTransform: "lowercase",
                          "&:first-letter": { textTransform: "uppercase" },
                        }}
                      >
                        {roleName}
                      </Text>
                    )}
                  </div>
                ),
                value: "Role",
              },
              action: {
                element:
                  isOwnerUser || isAdminUser || email === profile?._json?.email ? (
                    <Box sx={{ textAlign: "right" }}>
                      {!isOwnerUser && roleName === RoleName.Owner ? null : (
                        <Menu>
                          <Menu.Target>
                            <Anchor>
                              <IconMoreVertical />
                            </Anchor>
                          </Menu.Target>
                          <Menu.Dropdown className="dropdown-teams__content">
                            {!accepted && (isOwnerUser || isAdminUser) && (
                              <Menu.Item>Send new Invite</Menu.Item>
                            )}
                            <Menu.Item
                              color="green"
                              onClick={() => {
                                setConfirmationModalProps({
                                  type: "options",
                                  isActive: true,
                                })
                                setConfirmationModalTitle(
                                  "Do you want to remove this user from this app team?",
                                )
                                setConfirmationModalDescription(
                                  "That user will completely lose access to the current application.",
                                )
                                setConfirmationModalEmail(email)
                              }}
                            >
                              {email === profile?._json?.email ? "Leave team" : "Remove"}
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      )}
                    </Box>
                  ) : (
                    <></>
                  ),
                value: "More",
              },
            }
          })}
          label="Users"
          paginate={endpoint.users.length > 10 ? { perPage: 10 } : undefined}
          rightComponent={
            isOwnerUser || isAdminUser ? (
              <Button
                rightIcon={<IconPlus height={18} width={18} />}
                size="xs"
                variant="outline"
                onClick={() => setInviteNewUserOpen(true)}
              >
                Invite new user
              </Button>
            ) : null
          }
        />
      </Card>
      <Modal
        opened={confirmationModalProps.isActive}
        padding={20}
        size={429}
        title="Deleting a user"
        onClose={() => {
          setConfirmationModalProps({ ...confirmationModalProps, isActive: false })
        }}
      >
        <Form method="post">
          <div
            className={clsx({
              "confirmation-modal-content": true,
              [confirmationModalProps.type]: true,
            })}
          >
            {confirmationModalProps.type === "error" ? (
              <Grid mb="1.6em">
                <ErrorIcon />
              </Grid>
            ) : null}
            <Text className="confirmation-modal-title" mb="1.6em" weight={700}>
              {confirmationModalTitle}
            </Text>
            <Text className="confirmation-modal-description" mb="1.6em" weight={400}>
              {confirmationModalDescription}
            </Text>
            <input
              hidden
              readOnly
              name="email-address"
              style={{ display: "none" }}
              value={confirmationModalEmail}
            />
            <input
              hidden
              readOnly
              name="app-name"
              style={{ display: "none" }}
              value={endpoint.name}
            />
            {confirmationModalProps.type === "options" ? (
              <div className="confirmation-modal-options">
                <Button
                  id="cancel"
                  mr="1em"
                  variant="outline"
                  onClick={() =>
                    setConfirmationModalProps({
                      ...confirmationModalProps,
                      isActive: false,
                    })
                  }
                >
                  Cancel
                </Button>
                <Button
                  color="red"
                  name="type"
                  type="submit"
                  value="delete"
                  variant="filled"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="confirmation-modal-options">
                <Button name="type" type="submit" value="delete">
                  Try again
                </Button>
              </div>
            )}
          </div>
        </Form>
      </Modal>

      <Modal
        opened={isUpdateRoleModalOpened}
        size={429}
        title="Change User Role"
        onClose={() => setIsUpdateRoleModalOpened(false)}
      >
        <Form className="change-role-modal-form" method="post">
          <div className="change-role-modal-content">
            <Text>Are you sure you want to change {updateRoleModalData.email} role?</Text>
            <div className="change-role-modal-options">
              <Button
                id="cancel"
                mr="1em"
                variant="outline"
                onClick={() => setIsUpdateRoleModalOpened(false)}
              >
                Cancel
              </Button>
              <Button name="type" type="submit" value="updateRole" variant="filled">
                Change
              </Button>
            </div>

            <input name="email" type="hidden" value={updateRoleModalData.email} />
            <input name="roleName" type="hidden" value={updateRoleModalData.roleName} />
            <input hidden value={endpoint.name} />
            <input
              name="transferOwnership"
              type="hidden"
              value={String(updateRoleModalData.transferOwnership)}
            />
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default TeamView
