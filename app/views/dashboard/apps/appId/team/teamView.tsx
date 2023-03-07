import {
  Button,
  IconPlus,
  Title,
  IconMoreVertical,
  Grid,
  Menu,
} from "@pokt-foundation/pocket-blocks"
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react"
import { Transition } from "@remix-run/react/dist/transition"
import clsx from "clsx"
import { useEffect, useState } from "react"

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
  NotificationMessageType,
} from "~/components/shared/NotificationMessage"
import StatusTag, { links as StatusTagLinks } from "~/components/shared/StatusTag"
import Table, { links as TableLinks } from "~/components/shared/Table"
import Text from "~/components/shared/Text"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { EndpointQuery, RoleName } from "~/models/portal/sdk"
import { ActionData, TeamLoaderData } from "~/routes/dashboard/apps/$appId/team"

export const links = () => {
  return [
    ...AppRadioCardsLinks(),
    ...TextInputLinks(),
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
  const [notificationMessageTitle, setNotificationMessageTitle] = useState<string>("")
  const [notificationMessageDescription, setNotificationMessageDescription] =
    useState<string>("")
  const [notificationMessageIsActive, setNotificationMessageIsActive] =
    useState<NotificationMessageType["isActive"]>(false)
  const [notificationMessageType, setNotificationMessageType] =
    useState<NotificationMessageType["type"]>("success")

  const transition = useTransition()
  const actionData = useActionData<ActionData>()
  const { profile } = useLoaderData<TeamLoaderData>()

  const isAdminUser = endpoint?.users?.some(
    ({ email, roleName }) =>
      email === profile._json?.email && (roleName === "OWNER" || roleName === "ADMIN"),
  )

  useEffect(() => {
    if (actionData) {
      if (actionData.type === "delete") {
        if (actionData.error && confirmationModalProps.type !== "error") {
          setConfirmationModalProps({ type: "error", isActive: true })
          setConfirmationModalTitle("Error deleting the user")
          setConfirmationModalDescription("Please, try again")
        } else if (!actionData.error && notificationMessageTitle !== "User removed") {
          setConfirmationModalProps({ ...confirmationModalProps, isActive: false })
        }
        setNotificationMessageIsActive(true)
        setNotificationMessageType("success")
        setNotificationMessageTitle("User removed")
        setNotificationMessageDescription(
          `We have sent a confirmation to ${actionData.email}.`,
        )
      } else if (actionData.type === "invite") {
        if (actionData.error) {
          setNotificationMessageIsActive(true)
          setNotificationMessageType("error")
          setNotificationMessageTitle("Invite error")
          setNotificationMessageDescription(
            "We had some issues with the invite. Please try again later.",
          )
          return
        }
        setNotificationMessageIsActive(true)
        setNotificationMessageType("success")
        setNotificationMessageTitle("Invite sent")
        setNotificationMessageDescription(
          `We have sent an invitation to ${actionData.email}. You can review the invite status below.`,
        )
      }
    }
  }, [actionData, confirmationModalProps, notificationMessageTitle])

  return (
    <>
      {state === "loading" && <Loader />}
      {actionData && (
        <>
          <NotificationMessage
            notificationMessage={{
              type: notificationMessageType,
              isActive: notificationMessageIsActive,
              title: notificationMessageTitle,
              description: notificationMessageDescription,
            }}
            setNotificationMessageIsActive={setNotificationMessageIsActive}
          />
        </>
      )}
      {isInviteNewUserOpen && isAdminUser ? (
        <Card>
          <Title order={3}>Invite New User</Title>
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
        paginate
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
                  {isAdminUser ? (
                    <Menu>
                      <Menu.Target>
                        <Button>{roleName}</Button>
                      </Menu.Target>
                      <Menu.Dropdown className="dropdown-teams__content">
                        <Menu.Item>Admin</Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  ) : (
                    <Text>{roleName}</Text>
                  )}
                </div>
              ),
              value: "Role",
            },
            action: {
              element:
                isAdminUser || email === profile?._json?.email ? (
                  <div className="list__more-actions">
                    <Menu>
                      <Menu.Target>
                        <IconMoreVertical fill="#A9E34B" />
                      </Menu.Target>
                      <Menu.Dropdown className="dropdown-teams__content">
                        {!accepted && isAdminUser ? (
                          <Menu.Item>Send new Invite</Menu.Item>
                        ) : null}
                        {isAdminUser ||
                          (email === profile?._json?.email && (
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
                              {email === profile?._json.email ? "Leave team" : "Remove"}
                            </Menu.Item>
                          ))}
                      </Menu.Dropdown>
                    </Menu>
                  </div>
                ) : (
                  <></>
                ),
              value: "More",
            },
          }
        })}
        label="Users"
        rightComponent={
          isAdminUser ? (
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
        size={429}
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
    </>
  )
}

export default TeamView
