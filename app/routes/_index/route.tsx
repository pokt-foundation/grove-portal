import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import LandingView from "~/routes/_index/view"
import { getUserProfile } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Grove Portal`,
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserProfile(request)

  if (user) {
    return redirect("/account")
  }

  return null
}

export default function Landing() {
  return <LandingView />
}
