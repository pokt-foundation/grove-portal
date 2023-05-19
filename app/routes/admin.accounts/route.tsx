import { LinksFunction } from "@remix-run/node"

// type LoaderData = {
//   admin: Awaited<Auth0Profile>
// }

// export const loader: LoaderFunction = async ({ request }) => {
//   return json<LoaderData>({
//     admin: await requireAdmin(request),
//   })
// }

export default function Analytics() {
  return <div>Accounts</div>
}
