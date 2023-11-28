import { json, LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { User } from "~/models/portal/sdk"
import { requireUser } from "~/utils/user.server"
export type AccountOutletContext = {
  user: User
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)

  return json<AccountOutletContext>({
    user: user.user,
  })
}

export default function Account() {
  const { user } = useLoaderData<AccountOutletContext>()
  return <Outlet context={user} />
}
//
// export const CatchBoundary = () => {
//   const caught = useCatch()
//   if (caught.status === 404) {
//     return (
//       <div className="error-container">
//         <h1>Dashboard Error</h1>
//         <p>{caught.statusText}</p>
//       </div>
//     )
//   }
//   throw new Error(`Unexpected caught response with status: ${caught.status}`)
// }
//
// export const ErrorBoundary = ({ error }: { error: Error }) => {
//   return (
//     <div className="error-container">
//       <h1>Dashboard Error</h1>
//       <p>{error.message}</p>
//     </div>
//   )
// }
