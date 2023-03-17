import { json, LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useEffect } from "react"
import styles from "./styles.css"
import Remark, { links as RemarkLinks } from "~/components/shared/Remark"
import { initCmsClient } from "~/models/cms/cms.server"
import { getDocsQuery } from "~/models/cms/sdk"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

export const meta: MetaFunction = ({ params }) => {
  return {
    title: `${params.slug} | POKT`,
  }
}

export const links: LinksFunction = () => {
  return [...RemarkLinks(), { rel: "stylesheet", href: styles }]
}

type DocLoaderData = {
  doc: getDocsQuery
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const routelang = params.lang !== undefined ? params.lang : "en-US"
  const cms = initCmsClient()
  const doc = await cms.getDocs({
    filter: { status: { _eq: "published" }, slug: { _eq: "introduction" } },
    sort: ["id"],
    language: routelang,
  })

  console.log(doc.documentation[0].translations)

  return json<DocLoaderData>({
    doc,
  })
}

export default function Docs() {
  const { doc } = useLoaderData() as DocLoaderData

  useEffect(() => {
    // todo: create new event
    // trackEvent(AmplitudeEvents.LandingView)
  }, [])

  return (
    <div>
      <h1>{doc.documentation[0].translations![0]?.title}</h1>
      <Remark>{doc.documentation[0].translations![0]?.body ?? ""}</Remark>
    </div>
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <dialog color="red" title="Index Error">
        {error.message}
      </dialog>
    </div>
  )
}
