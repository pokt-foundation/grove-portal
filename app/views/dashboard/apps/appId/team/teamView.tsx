import { Button, IconPlus, Title, IconMoreVertical } from "@pokt-foundation/pocket-blocks"
import { ButtonProps } from "@pokt-foundation/pocket-blocks/dist/src/package/component/atom/button/button"
import { Form, useTransition } from "@remix-run/react"
import { Transition } from "@remix-run/react/transition"
import { PropsWithChildren, useState } from "react"

import { Auth0Profile } from "remix-auth-auth0"
import styles from "./styles.css"
import AppRadioCards, {
  links as AppRadioCardsLinks,
} from "~/components/application/AppRadioCards"
import Card from "~/components/shared/Card"
import ConfirmationModal, {
  ConfirmationModalPropsType,
  links as ConfirmationModalLinks,
} from "~/components/shared/ConfirmationModal"
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

export const links = () => {
  return [
    ...AppRadioCardsLinks(),
    ...TextInputLinks(),
    ...DropdownLinks(),
    ...LoaderLinks(),
    ...StatusTagLinks(),
    ...TableLinks(),
    ...ConfirmationModalLinks(),
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
  onClick: () => void
  title: string
  variant: PropsWithChildren<ButtonProps["variant"]>
}

function TeamView({ state, endpoint, profile }: TeamViewProps) {
  const [isInviteNewUserOpen, setInviteNewUserOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [radioSelectedValue, setRadioSelectedValue] = useState("ADMIN")
  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ConfirmationModalPropsType>({
      type: "options",
      isActive: false,
    })
  const [confirmationModalTitle, setConfirmationModalTitle] = useState<string>("")
  const [confirmationModalDescription, setConfirmationModalDescription] =
    useState<string>("")
  const [confirmationModalEmail, setConfirmationModalEmail] = useState<string>("")

  const transition = useTransition()

  const handleRemoveCancelClick = () => {
    console.log("cancel")
  }

  const handleRemoveClick = () => {
    console.log("remove")
  }

  const handleRemoveTryAgain = () => {
    console.log("try again")
  }

  const userRole = "ADMIN"

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
        <ConfirmationModal
          confirmationModalProps={confirmationModalProps}
          setConfirmationModalProps={setConfirmationModalProps}
        >
          <div className="confirmation-modal-content">
            <Text className="confirmation-modal-title" weight="700">
              {confirmationModalTitle}
            </Text>
            <Text className="confirmation-modal-description">
              {confirmationModalDescription}
            </Text>
            {confirmationModalProps.type === "options" ? (
              <div className="confirmation-modal-options">
                <Button id="cancel" variant="outline">
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
        </ConfirmationModal>
      </Form>
    </>
  )
}

export default TeamView
