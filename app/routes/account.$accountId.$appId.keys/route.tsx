import { useOutletContext } from "@remix-run/react"
import { AppIdOutletContext } from "../account.$accountId.$appId/route"
import AppKeys from "~/routes/account.$accountId.$appId.keys/view"

export default function ApplicationKeys() {
  const { app, userRole } = useOutletContext<AppIdOutletContext>()
  return <AppKeys app={app} userRole={userRole} />
}
