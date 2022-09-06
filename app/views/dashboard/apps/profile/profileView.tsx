import { Button } from "@pokt-foundation/pocket-blocks"
import { LinksFunction } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import styles from "./styles.css"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"

const SUCCESSFUL_CHANGE_PASSWORD_MSG =
  "We've just sent you an email to reset your password."

export const links: LinksFunction = () => [
  ...CardLinks(),
  ...TextInputLinks(),
  ...ModalLinks(),
  { rel: "stylesheet", href: styles },
]

export const ProfileView = () => {
  const actionData = useActionData()
  const dashboardRoute = useMatchesRoute("routes/dashboard")
  const dashboardData = dashboardRoute?.data.user as Auth0Profile
  const { nickname = "", email = "" } = dashboardData._json
  const [open, setOpen] = useState<boolean>(false)

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
      <Modal opened={open} onClose={() => setOpen(false)}>
        <div>
          <h2>Check your email</h2>
          <p>{actionData}</p>
        </div>
      </Modal>
    </section>
  )
}

export default ProfileView
