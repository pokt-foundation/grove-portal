import {
  Button,
  IconPlus,
  Title,
  IconMoreVertical,
} from "@pokt-foundation/pocket-blocks"
import { Form, useTransition } from "@remix-run/react"
import { Transition } from "@remix-run/react/transition"
import { useState } from "react"

import styles from "./styles.css"
import AppRadioCards, {
  links as AppRadioCardsLinks,
} from "~/components/application/AppRadioCards"
import Card from "~/components/shared/Card"
import Dropdown, { DropdownItem, DropdownTrigger, links as DropdownLinks } from "~/components/shared/Dropdown"
import Loader, { links as LoaderLinks } from "~/components/shared/Loader"
import StatusTag, { links as StatusTagLinks } from "~/components/shared/StatusTag"
import Table, { links as TableLinks } from "~/components/shared/Table"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"

export const links = () => {
  return [
    ...AppRadioCardsLinks(),
    ...TextInputLinks(),
    ...DropdownLinks(),
    ...LoaderLinks(),
    ...StatusTagLinks(),
    ...TableLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

const tiers = [
  {
    cardDescription: "Team Member abilities and manage application access and billing",
    name: "Team Admin",
    value: "ADMIN",
    active: "true",
  },
  {
    cardDescription:
      "View application metrics, manage security and view basic plan details",
    name: "Team Member",
    value: "MEMBER",
    active: "true",
  },
]

type TeamViewProps = {
  state: Transition["state"]
}

function TeamView({ state }: TeamViewProps) {
  const [isInviteNewUserOpen, setInviteNewUserOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [radioSelectedValue, setRadioSelectedValue] = useState("ADMIN")

  const transition = useTransition()

  return (
    <>
      {state === "loading" && <Loader />}
      {isInviteNewUserOpen && (
        <Card>
          <Title order={3}>Invite New User</Title>
          <Form className="invite-new-user__form" method="post">
            <TextInput
              label="Email address"
              name="email-address"
              placeholder="new@server.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AppRadioCards
              currentRadio={radioSelectedValue}
              radioData={tiers}
              setRadio={setRadioSelectedValue}
            />
          </Form>
          <div className="invite-new-user__form__buttons-container">
            <Button variant="outline" onClick={() => setInviteNewUserOpen(false)}>
              Cancel
            </Button>
            <Button disabled={transition.state === "submitting" || email === ""}>
              Send Invite
            </Button>
          </div>
        </Card>
      )}
      <Table
        paginate
        columns={["Email", "Status", "Role", ""]}
        data={[
          {
            id: 1,
            email: "carlos@carlosvq.com",
            status: {
              element: <StatusTag status="EXPIRED" />,
              value: "Expired",
            },
            role: {
              element: (
                <div className="list__role">
                  <Dropdown
                    contentClassName="dropdown-teams__content"
                    label={<DropdownTrigger label="Member" />}
                  >
                    <DropdownItem action={() => {}} label="Send new Invite" />
                    <DropdownItem action={() => {}} label="Remove" variant="green" />
                  </Dropdown>
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
                    <DropdownItem action={() => {}} label="Send new Invite" />
                    <DropdownItem action={() => {}} label="Remove" variant="green" />
                  </Dropdown>
                </div>
              ),
              value: "More",
            },
          },
        ]}
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
