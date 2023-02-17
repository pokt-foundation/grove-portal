import { Button, IconPlus, Title, IconMoreVertical } from "@pokt-foundation/pocket-blocks"
import { Form, useActionData, useTransition } from "@remix-run/react"
import { Transition } from "@remix-run/react/transition"
import { useState } from "react"

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
import Loader, { links as LoaderLinks } from "~/components/shared/Loader"
import NotificationMessage, {
  links as NotificationMessageLinks,
} from "~/components/shared/NotificationMessage"
import StatusTag, { links as StatusTagLinks } from "~/components/shared/StatusTag"
import Table, { links as TableLinks } from "~/components/shared/Table"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { RoleName } from "~/models/portal/sdk"

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
}

function TeamView({ state }: TeamViewProps) {
  const actionData = useActionData()
  console.log(actionData)
  const [isInviteNewUserOpen, setInviteNewUserOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [radioSelectedValue, setRadioSelectedValue] = useState("ADMIN")

  const transition = useTransition()

  const mockedData = [
    {
      email: "testadmin@pokt.network",
      roleName: "ADMIN",
      accepted: true,
    },
    {
      email: "testowner@pokt.network",
      roleName: "OWNER",
      accepted: true,
    },
    {
      email: "test2@pokt.network",
      roleName: "MEMBER",
      accepted: true,
    },
  ]

  const userRole = "ADMIN"

  return (
    <>
      {state === "loading" && <Loader />}
      {actionData && (
        <>
          <NotificationMessage
            notificationMessage={{
              type: "success",
              isActive: !actionData.error,
              title: "Invite sent",
              description:
                "We have sent an invitation to ricardo.souza@pokt.network. You can review the invite status below.",
            }}
            setNotificationMessage={() => null}
          />
          <NotificationMessage
            notificationMessage={{
              type: "error",
              isActive: actionData.error,
              title: "Invite error",
              description: "We had some issues with the invite. Please try again later.",
            }}
            setNotificationMessage={() => null}
          />
        </>
      )}
      {isInviteNewUserOpen && (
        <Card>
          <Title order={3}>Invite New User</Title>
          <Form className="invite-new-user__form" method="post">
            <TextInput
              label="Email address"
              name="email-address"
              placeholder="new@server.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                disabled={transition.state === "submitting" || email === ""}
                type="submit"
              >
                Send Invite
              </Button>
            </div>
          </Form>
        </Card>
      )}
      <Table
        paginate
        columns={["Email", "Status", "Role", ""]}
        data={mockedData.map(({ email, roleName, accepted }) => {
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
                  {userRole === "ADMIN" || userRole === "OWNER" ? (
                    <Dropdown
                      contentClassName="dropdown-teams__content"
                      label={<DropdownTrigger label={roleName} />}
                    >
                      <DropdownItem action={() => {}} label="Admin" />
                    </Dropdown>
                  ) : (
                    roleName
                  )}
                </div>
              ),
              value: "Role",
            },
            action: {
              element: (
                <div className="list__more-actions">
                  <Dropdown
                    contentClassName="dropdown-teams__content"
                    label={<IconMoreVertical fill="#A9E34B" />}
                  >
                    {!accepted && (
                      <DropdownItem action={() => {}} label="Send new Invite" />
                    )}
                    <DropdownItem action={() => {}} label="Remove" variant="green" />
                  </Dropdown>
                </div>
              ),
              value: "More",
            },
          }
        })}
        label="Users"
        rightComponent={
          <Button
            rightIcon={<IconPlus fill="var(--color-white-light)" />}
            variant="outline"
            onClick={() => setInviteNewUserOpen(true)}
          >
            Invite new user
          </Button>
        }
      />
    </>
  )
}

export default TeamView
