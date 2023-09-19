import { ActionFunction, LoaderFunction, json, MetaFunction } from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"
import { useEffect } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import invariant from "tiny-invariant"
import ProfileView from "./view"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { requireUser } from "~/utils/user.server"

type LoaderData = {
  profile: Auth0Profile
}

export const meta: MetaFunction = () => {
  return {
    title: "User Profile",
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  return json<LoaderData>({
    profile: user.profile,
  })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get("email")
  invariant(email, "user email not found")

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
  const { profile } = useLoaderData()
  const actionData = useActionData()

  useEffect(() => {
    trackEvent(AmplitudeEvents.ProfileView)
  }, [])

  return <ProfileView actionData={actionData} profile={profile} />
}
