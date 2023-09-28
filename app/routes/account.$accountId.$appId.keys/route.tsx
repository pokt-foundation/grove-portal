import { MetaFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import { AppIdOutletContext } from "../account.$accountId.$appId/route"
import AppKeys from "~/routes/account.$accountId.$appId.keys/view"
import { seo_title_append } from "~/utils/seo"

export const meta: MetaFunction = () => {
  return {
    title: `Application Keys ${seo_title_append}`,
  }
}

export default function ApplicationKeys() {
  const { app, userRole } = useOutletContext<AppIdOutletContext>()
  return <AppKeys app={app} userRole={userRole} />
}
