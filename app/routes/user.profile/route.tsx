import { ActionFunction, LoaderFunction, json, MetaFunction } from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import { ActionPassword, actionPassword } from "./utils/actionPassword"
import { ActionUser, actionUser } from "./utils/actionUser"
import ProfileView from "./view"
import { initPortalClient } from "~/models/portal/portal.server"
import { UpdateUser, User } from "~/models/portal/sdk"
import { DataStruct } from "~/types/global"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `User Profile ${seo_title_append}`,
  }
}

type LoaderData = {
  user: User
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)

  return json<LoaderData>({
    user: user.user,
  })
}

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  const formData = await request.formData()
  const type = formData.get("type")

  invariant(typeof type === "string", "Type must be set")

  let response

  switch (type) {
    case "password":
      const email = formData.get("email")
      invariant(typeof email === "string", "user email not found")
      response = await actionPassword(email)
      break
    default:
      const checkbox = formData.get("checkbox")
      invariant(typeof checkbox === "string", "checkbox value not found")

      let input: Partial<UpdateUser> = {}

      if (type === "check-product") {
        input.updatesProduct = checkbox === "on"
      }
      if (type === "check-marketing") {
        input.updatesMarketing = checkbox === "on"
      }
      if (type === "check-beta") {
        input.betaTester = checkbox === "on"
      }

      response = await actionUser(portal, input)
      break
  }

  return response
}

export default function Profile() {
  const { user } = useLoaderData() as LoaderData
  const actionData = useActionData() as DataStruct<ActionUser | ActionPassword>

  return <ProfileView actionData={actionData} user={user} />
}
