import { LoaderFunction, json } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
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
      filter: { status: { _eq: "published" } },
      sort: ["id"],
      language: routelang,
    })

    return json<LoaderData>({
      data: doc.documentation,
    })
  } catch (e) {
    console.error(`Docs error in ${params.slug}: `, e)
    throw new Error(`Error: ${e}`)
  }
}

export default function DocsLayout() {
  const { data }: LoaderData = useLoaderData()

  // Wrap with Layout/Sidenar
  return (
    <div>
      <ul>
        {data.map((doc) => (
          <li key={doc.id}>{doc && doc.translations && doc.translations[0]?.title}</li>
        ))}
      </ul>
      <Outlet />
    </div>
  )
}
