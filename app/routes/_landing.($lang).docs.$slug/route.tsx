import { LoaderFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import NotFound404 from "~/components/NotFound404"
import Remark from "~/components/Remark"
import { initCmsClient } from "~/models/cms/cms.server"
import { documentation } from "~/models/cms/sdk"

type LoaderData = {
  data: documentation[]
}

export const loader: LoaderFunction = async ({ params }) => {
  const routelang = params.lang !== undefined ? params.lang : "en-US"
  const cms = initCmsClient()

  try {
    const doc = await cms.getDocs({
      filter: { status: { _eq: "published" }, slug: { _eq: params.slug } },
      sort: ["id"],
      language: routelang,
    })

    if (
      doc.documentation[0].translations &&
      typeof doc.documentation[0]?.translations[0]?.body !== "string" &&
      typeof doc.documentation[0].translations[0]?.id !== "string" &&
      typeof doc.documentation[0].translations[0]?.title !== "string"
    ) {
      throw new Error("Page must have markdown body")
    }

    return json<LoaderData>({
      data: doc.documentation,
    })
  } catch (e) {
    console.error(`Docs error in ${params.slug}: `, e)
    throw new Error(`Error: ${e}`)
  }
}

export default function Docs() {
  const { data }: LoaderData = useLoaderData()

  // Wrap this with Sidebar/Layout
  return (
    <Remark>
      {data &&
      data[0] &&
      data[0].translations &&
      data[0].translations[0] &&
      data[0].translations[0].body
        ? data[0].translations[0].body
        : ""}
    </Remark>
  )
}

export const ErrorBoundary = () => {
  return <NotFound404 />
}
