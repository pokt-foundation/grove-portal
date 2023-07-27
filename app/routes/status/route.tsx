import { LoaderFunction, redirect } from "@remix-run/node"

export const loader: LoaderFunction = async ({ request }) => {
  return redirect("https://status.portal.pokt.network")
}
