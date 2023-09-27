import { MetaFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import UserOrganizations from "./view"
import { UserAccountLoaderData } from "~/routes/user/route"
import { seo_title_append } from "~/utils/seo"

export const meta: MetaFunction = () => {
  return {
    title: `User Organizations ${seo_title_append}`,
  }
}

export default function Organizations() {
  const { accounts } = useOutletContext<UserAccountLoaderData>()

  return <UserOrganizations accounts={accounts} />
}
