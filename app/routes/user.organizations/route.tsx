import { MetaFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import UserOrganizations from "./view"
import { UserAccountLoaderData } from "~/routes/user/route"

export const meta: MetaFunction = () => {
  return {
    title: "Organizations",
  }
}

export default function Organizations() {
  const { accounts } = useOutletContext<UserAccountLoaderData>()

  return <UserOrganizations accounts={accounts} />
}
