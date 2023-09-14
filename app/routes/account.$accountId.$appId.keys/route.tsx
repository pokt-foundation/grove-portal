import { useOutletContext } from "@remix-run/react"
import { AppIdOutletContext } from "../account.$accountId.$appId/route"
import AppKeys from "~/routes/account.$accountId.$appId.keys/view"

export default function ApplicationKeys() {
  const { endpoint, user } = useOutletContext<AppIdOutletContext>()
  const userRole = endpoint?.users.find((u) => u.email === user._json?.email)?.roleName
  return <AppKeys endpoint={endpoint} role={userRole} />
}
