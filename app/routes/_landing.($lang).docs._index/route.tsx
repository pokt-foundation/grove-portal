import { LoaderFunction, redirect } from "@remix-run/node"

export const loader: LoaderFunction = async ({ request, params }) => {
  return redirect("/docs/introduction")
}
