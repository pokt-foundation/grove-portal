import { json, LoaderFunction, redirect } from "@remix-run/node"
import { Outlet, useCatch, useLoaderData } from "@remix-run/react"
import { User } from "~/models/portal/sdk"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { requireUser } from "~/utils/user.server"
export type AccountOutletContext = {
  user: User
}

export const loader: LoaderFunction = async ({ request }) => {
  const MAINTENANCE_MODE = getRequiredServerEnvVar("FLAG_MAINTENANCE_MODE")
  if (MAINTENANCE_MODE === "true") {
    return redirect("/maintenance")
  }

  const user = await requireUser(request)

  return json<AccountOutletContext>({
    user: user.user,
  })
}

export default function Account() {
  const { user } = useLoaderData<AccountOutletContext>()
  return <Outlet context={user} />
}

export const CatchBoundary = () => {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <div className="error-container">
        <h1>Dashboard Error</h1>
        <p>{caught.statusText}</p>
      </div>
    )
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h1>Dashboard Error</h1>
      <p>{error.message}</p>
    </div>
  )
}
