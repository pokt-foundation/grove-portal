import {
  Button,
  IconPlus,
  IconMoreVertical,
  Grid,
  Box,
  Text,
} from "@pokt-foundation/pocket-blocks"
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react"
import { Transition } from "@remix-run/react/transition"
import clsx from "clsx"
import { useEffect, useState } from "react"
import styles from "./styles.css"
import AppRadioCards, {
  links as AppRadioCardsLinks,
} from "~/components/application/AppRadioCards"
import Card from "~/components/shared/Card"
import Dropdown, {
  DropdownItem,
  DropdownTrigger,
  links as DropdownLinks,
} from "~/components/shared/Dropdown"
import ErrorIcon from "~/components/shared/Icons/ErrorIcon"
import Loader, { links as LoaderLinks } from "~/components/shared/Loader"
import Modal from "~/components/shared/Modal"
import NotificationMessage, {
  links as NotificationMessageLinks,
  NotificationMessageType,
} from "~/components/shared/NotificationMessage"
import StatusTag, { links as StatusTagLinks } from "~/components/shared/StatusTag"
import Table, { links as TableLinks } from "~/components/shared/Table"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { EndpointQuery, RoleName } from "~/models/portal/sdk"
import { ActionData, TeamLoaderData } from "~/routes/dashboard/apps/$appId/team"

export const links = () => {
  return [
    ...AppRadioCardsLinks(),
    ...TextInputLinks(),
    ...DropdownLinks(),
    ...LoaderLinks(),
    ...StatusTagLinks(),
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
    useState<NotificationMessageType>({
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

  const transition = useTransition()
  const actionData = useActionData<ActionData>()
  const { profile } = useLoaderData<TeamLoaderData>()

  const isAdminUser = endpoint?.users?.some(
    ({ email, roleName }) => email === profile._json.email && roleName === "ADMIN",
  )

  const isOwnerUser = endpoint?.users?.some(
    ({ email, roleName }) => email === profile._json.email && roleName === "OWNER",
  )

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
        setConfirmationModalProps({ ...confirmationModalProps, isActive: false })

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

        setInviteEmail("")
      } else if (actionData.type === "update role") {
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
  }, [actionData, confirmationModalProps])

  return (
    <>
      {state === "loading" && <Loader />}
      {actionData && (
        <>
          <NotificationMessage
            notificationMessage={{
              type: notificationMessageProps.type,
              isActive: notificationMessageProps.isActive,
              title: notificationMessageProps.title,
              description: notificationMessageProps.description,
            }}
            setNotificationMessage={setNotificationMessageProps}
          />
        </>
      )}
      {isInviteNewUserOpen && (isAdminUser || isOwnerUser) ? (
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
            <AppRadioCards
              currentRadio={radioSelectedValue}
              radioData={tiers}
              setRadio={setRadioSelectedValue}
            />

            <div className="invite-new-user__form__buttons-container">
              <Button variant="outline" onClick={() => setInviteNewUserOpen(false)}>
                Cancel
              </Button>
              <Button
                disabled={transition.state === "submitting" || inviteEmail === ""}
                name="type"
                type="submit"
                value="invite"
              >
                Send Invite
              </Button>
            </div>
          </Form>
        </Card>
      ) : null}
      <Table
        columns={["Email", "Status", "Role", ""]}
        data={endpoint?.users?.map(({ email, roleName, accepted }) => {
          return {
            id: email,
            email: email,
            status: {
              element: <StatusTag accepted={accepted} />,
              value: accepted ? "ACCEPTED" : "PENDING",
            },
            role: {
              element: (
                <div className="list__role">
                  {isOwnerUser && email !== profile?._json.email && (
                    <Dropdown
                      contentClassName="dropdown-teams__content"
                      label={<DropdownTrigger label={roleName} />}
                    >
                      <DropdownItem
                        action={() => handleUpdateRoleSubmit(email, roleName, true)}
                        label="Transfer Ownership"
                      />
                      <DropdownItem
                        action={() => handleUpdateRoleSubmit(email, roleName)}
                        label={roleName === RoleName.Admin ? "MEMBER" : "ADMIN"}
                      />
                    </Dropdown>
                  )}

                  {isAdminUser &&
                    email !== profile?._json.email &&
                    roleName === RoleName.Member && (
                      <Dropdown
                        contentClassName="dropdown-teams__content"
                        label={<DropdownTrigger label={roleName} />}
                      >
                        <DropdownItem
                          action={() => handleUpdateRoleSubmit(email, roleName)}
                          label="Admin"
                        />
                      </Dropdown>
                    )}

                  {((!isOwnerUser && !isAdminUser) ||
                    email === profile?._json.email ||
                    roleName === RoleName.Owner) && (
                    <Text
                      sx={{
                        fontSize: "inherit",
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
                isAdminUser || isOwnerUser || email === profile?._json.email ? (
                  <Box
                    className="list__more-actions"
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Dropdown
                      contentClassName="dropdown-teams__content"
                      label={<IconMoreVertical fill="var(--color-primary-main)" />}
                    >
                      {!accepted && (isAdminUser || isOwnerUser) ? (
                        <DropdownItem action={() => {}} label="Send new Invite" />
                      ) : null}
                      {isAdminUser || isOwnerUser || email === profile?._json.email ? (
                        <DropdownItem
                          action={() => {
                            setConfirmationModalProps({ type: "options", isActive: true })
                            setConfirmationModalTitle(
                              "Do you want to remove this user from this app team?",
                            )
                            setConfirmationModalDescription(
                              "That user will completely lose access to the current application.",
                            )
                            setConfirmationModalEmail(email)
                          }}
                          label={email === profile?._json.email ? "Leave team" : "Remove"}
                          variant="green"
                        />
                      ) : (
                        <></>
                      )}
                    </Dropdown>
                  </Box>
                ) : (
                  <></>
                ),
              value: "More",
            },
          }
        })}
        label="Users"
        paginate={endpoint.users.length > 10 ? { perPage: 10 } : false}
        rightComponent={
          isAdminUser || isOwnerUser ? (
            <Button
              rightIcon={<IconPlus fill="var(--color-white-light)" />}
              variant="outline"
              onClick={() => setInviteNewUserOpen(true)}
            >
              Invite new user
            </Button>
          ) : null
        }
      />
      <Modal
        opened={confirmationModalProps.isActive}
        padding={20}
        title="Deleting an user"
        onClose={() =>
          setConfirmationModalProps({ ...confirmationModalProps, isActive: false })
        }
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
              name="email"
              style={{ display: "none" }}
              value={confirmationModalEmail}
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
              <Button name="type" type="submit" value="update role" variant="filled">
                Change
              </Button>
            </div>

            <input name="email" type="hidden" value={updateRoleModalData.email} />
            <input name="roleName" type="hidden" value={updateRoleModalData.roleName} />
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
