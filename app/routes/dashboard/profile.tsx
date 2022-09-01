import type { LinksFunction } from "@remix-run/node"
import { useEffect } from "react"
import type { Auth0Profile } from "remix-auth-auth0"
import Card, { links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import styles from "~/styles/dashboard.profile.css"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

export const links: LinksFunction = () => [
  ...CardLinks(),
  ...TextInputLinks(),
  { rel: "stylesheet", href: styles },
]

export default function Profile() {
  const dashboardRoute = useMatchesRoute("routes/dashboard")
  const dashboardData = dashboardRoute?.data.user as Auth0Profile
  const { nickname = "" } = dashboardData._json

  useEffect(() => {
    trackEvent(AmplitudeEvents.ProfileView)
  }, [])

  return (
    <section className="pokt-network-user-profile">
      <h1>User Profile</h1>
      <Card>
        <TextInput
          readOnly
          label="Email Address"
          placeholder="username@pokt.network"
          value={dashboardData.emails[0].value}
        />
        <TextInput readOnly label="User Name" placeholder="Jacksmith" value={nickname} />
      </Card>
    </section>
  )
}
