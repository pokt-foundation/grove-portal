import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { seo_title_append } from "~/utils/seo"

export const meta: MetaFunction = () => {
  return {
    title: `Application Logs ${seo_title_append}`,
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { appId, accountId } = params
  return redirect(`/account/${accountId}/${appId}`)
}
