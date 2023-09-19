import { useOutletContext } from "@remix-run/react"
import UserOrganizations from "./view"
import { UserAccountLoaderData } from "~/routes/user/route"

export default function Profile() {
  const { accounts } = useOutletContext<UserAccountLoaderData>()

  return <UserOrganizations accounts={accounts} />
}
