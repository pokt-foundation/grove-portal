import { MetaFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import UserOrganizations from "./view"
import ErrorView from "~/components/ErrorView"
import { UserAccountLoaderData } from "~/routes/user/route"
import { DataStruct } from "~/types/global"
import { seo_title_append } from "~/utils/seo"

export const meta: MetaFunction = () => {
  return {
    title: `User Organizations ${seo_title_append}`,
  }
}

export default function Organizations() {
  const { data, error, message } = useOutletContext<DataStruct<UserAccountLoaderData>>()

  if (error) {
    return <ErrorView message={message} />
  }

  const { accounts, user } = data

  return <UserOrganizations accounts={accounts} user={user} />
}
