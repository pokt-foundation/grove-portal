import { Button } from "@pokt-foundation/pocket-blocks"
import type { ActionFunction, LinksFunction } from "@remix-run/node"
import { Form, useActionData, useCatch } from "@remix-run/react"
import { useEffect, useState } from "react"
import type { Auth0Profile } from "remix-auth-auth0"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import styles from "~/styles/dashboard.profile.css"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getRequiredServerEnvVar } from "~/utils/environment"

const SUCCESSFUL_CHANGE_PASSWORD_MSG =
  "We've just sent you an email to reset your password."

export const links: LinksFunction = () => [
  ...CardLinks(),
  ...TextInputLinks(),
  ...ModalLinks(),
  { rel: "stylesheet", href: styles },
]

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get("email")

  try {
    const res = await fetch(
      `https://${getRequiredServerEnvVar("AUTH0_DOMAIN")}/dbconnections/change_password`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          client_id: getRequiredServerEnvVar("AUTH0_CLIENT_ID"),
          email,
          connection: getRequiredServerEnvVar("AUTH0_CONNECTION"),
        }),
      },
    )

    return res
  } catch (e) {
    return e
  }
}

export default function Profile() {
  const actionData = useActionData()
  const dashboardRoute = useMatchesRoute("routes/dashboard")
  const dashboardData = dashboardRoute?.data.user as Auth0Profile
  const { nickname = "", email = "" } = dashboardData._json
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    trackEvent(AmplitudeEvents.ProfileView)
  }, [])

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

export const CatchBoundary = () => {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <div className="error-container">
        <h1>Profile Catch Error</h1>
        <p>{caught.statusText}</p>
      </div>
    )
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h1>Profile Error</h1>
      <p>{error.message}</p>
    </div>
  )
}
