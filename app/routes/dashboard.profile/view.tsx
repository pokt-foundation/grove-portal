import { Button, Card } from "@pokt-foundation/pocket-blocks"
import { LinksFunction } from "@remix-run/node"
import { Form } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import styles from "./styles.css"
import Modal, { links as ModalLinks } from "~/components/Modal"
import TextInput from "~/components/TextInput"

export const SUCCESSFUL_CHANGE_PASSWORD_MSG =
  "We've just sent you an email to reset your password."

/* c8 ignore start */
export const links: LinksFunction = () => [
  ...ModalLinks(),
  { rel: "stylesheet", href: styles },
]
/* c8 ignore stop */

type ProfileViewProps = {
  profile: Auth0Profile
  actionData?: string
}

export const ProfileView = ({ profile, actionData }: ProfileViewProps) => {
  const { nickname, email } = profile._json || { nickname: "", email: "" }
  const [open, setOpen] = useState<boolean>(false)

  const closeModal = () => setOpen(false)

  useEffect(() => {
    if (actionData === SUCCESSFUL_CHANGE_PASSWORD_MSG) setOpen(true)
  }, [actionData])

  return (
    <section className="pokt-network-user-profile">
      <h1>User Profile</h1>
      <Card>
        <TextInput
          readOnly
          label="Email Address"
          placeholder="username@pokt.network"
          value={email}
        />
        <TextInput readOnly label="User Name" placeholder="Jacksmith" value={nickname} />
      </Card>
      <h2>Account Management</h2>
      <Card>
        <div className="change-password-container">
          <h3>Change password</h3>
          <Form method="post">
            <Button name="email" type="submit" value={email} variant="outline">
              Change password
            </Button>
          </Form>
        </div>
      </Card>
      <Modal opened={open} onClose={() => closeModal()}>
        <div>
          <h2>Check your email</h2>
          <p>{actionData}</p>
          <Button variant="filled" onClick={() => closeModal()}>
            Done
          </Button>
        </div>
      </Modal>
    </section>
  )
}

export default ProfileView
