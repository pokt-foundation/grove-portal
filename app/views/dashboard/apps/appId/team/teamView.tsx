import { Button, IconPlus, Title, IconMoreVertical } from "@pokt-foundation/pocket-blocks"
import { Form, useActionData, useTransition } from "@remix-run/react"
import { Transition } from "@remix-run/react/transition"
import { useState } from "react"

import { Auth0Profile } from "remix-auth-auth0"
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
import StatusTag, { links as StatusTagLinks } from "~/components/shared/StatusTag"
import Table, { links as TableLinks } from "~/components/shared/Table"
import Text from "~/components/shared/Text"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { EndpointQuery } from "~/models/portal/sdk"
import Modal from "~/components/shared/Modal"

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
  endpoint: EndpointQuery["endpoint"]
  profile: Auth0Profile
}

type ConfirmationModalOptionsType = {
  type: "options" | "error"
  isActive: boolean
}

function TeamView({ state, endpoint, profile }: TeamViewProps) {
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

  const transition = useTransition()
  const actionData = useActionData()
  console.log(actionData)

  return (
    <>
      <Form method="post">
        {state === "loading" && <Loader />}
        {isInviteNewUserOpen && (
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
            </Form>
            <div className="invite-new-user__form__buttons-container">
              <Button variant="outline" onClick={() => setInviteNewUserOpen(false)}>
                Cancel
              </Button>
              <Button disabled={transition.state === "submitting" || inviteEmail === ""}>
                Send Invite
              </Button>
            </div>
          </Card>
        )}
        <Table
          paginate
          columns={["Email", "Status", "Role", ""]}
          data={endpoint.users.map(({ email, roleName, accepted }) => {
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
                    <Dropdown
                      contentClassName="dropdown-teams__content"
                      label={<DropdownTrigger label={roleName} />}
                    >
                      <DropdownItem action={() => {}} label="Admin" />
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
                        label="Remove"
                        variant="green"
                      />
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
        <Modal
          title="Deleting a user"
          opened={confirmationModalProps.isActive}
          onClose={() =>
            setConfirmationModalProps({ ...confirmationModalProps, isActive: false })
          }
          size={429}
          padding={20}
        >
          <div className="confirmation-modal-content">
            <Text className="confirmation-modal-title" weight={700} mb="2em">
              {confirmationModalTitle}
            </Text>
            <Text className="confirmation-modal-description" weight={400} mb="2em">
              {confirmationModalDescription}
            </Text>
            {confirmationModalProps.type === "options" ? (
              <div className="confirmation-modal-options">
                <Button
                  id="cancel"
                  variant="outline"
                  onClick={() =>
                    setConfirmationModalProps({
                      ...confirmationModalProps,
                      isActive: false,
                    })
                  }
                  mr="1em"
                >
                  Cancel
                </Button>
                <Button
                  color="red"
                  name="email"
                  type="submit"
                  value={confirmationModalEmail}
                  variant="filled"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="confirmation-modal-options">
                <Button>Try again</Button>
              </div>
            )}
          </div>
        </Modal>
      </Form>
    </>
  )
}

export default TeamView
