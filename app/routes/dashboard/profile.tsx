import { IconPerson } from "@pokt-foundation/ui"
import type { Auth0Profile } from "remix-auth-auth0"
import type { LinksFunction } from "@remix-run/node"
import Card, { links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import styles from "~/styles/dashboard.profile.css"

export const links: LinksFunction = () => [
  ...CardLinks(),
  ...TextInputLinks(),
  { rel: "stylesheet", href: styles },
]

export default function Profile() {
  const dashboardRoute = useMatchesRoute("routes/dashboard")
  const dashboardData = dashboardRoute?.data.user as Auth0Profile
  const { email_verified: emailVerified = false, nickname = "" } = dashboardData._json

  return (
    <section className="pokt-network-user-profile">
      <h3>User Profile</h3>
      <Card>
        <img
          alt="user profile"
          className="pokt-network-user-profile-img"
          src={dashboardData.photos[0].value}
        />
        <TextInput
          readOnly
          label={
            <>
              <img alt="email" src={"/mail.svg"} />
              Email Address
            </>
          }
          value={dashboardData.emails[0].value}
        />
        <TextInput
          readOnly
          label={
            <>
              <IconPerson />
              Nickname
            </>
          }
          value={nickname}
        />
        <TextInput
          readOnly
          label="Email Verified"
          rightSection={
            <img
              alt={emailVerified ? "Verified" : "Not verified"}
              src={emailVerified ? "/checkmark.svg" : "/cross.svg"}
            />
          }
          value={emailVerified ? "Verified" : "Not verified"}
        />
      </Card>
    </section>
  )
}
