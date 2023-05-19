import { LoaderFunction, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import NotFound404 from "~/components/NotFound404"
import Remark from "~/components/Remark"
import { initCmsClient } from "~/models/cms/cms.server"
import { documentation } from "~/models/cms/sdk"
import { organizeData } from "~/utils/docs"
import { getClientEnv } from "~/utils/environment.server"

type LoaderData = {
  data: documentation
}

export const loader: LoaderFunction = async ({ params }) => {
  console.log("HELLLLLLLO???????")
  const routeLang = params.lang !== undefined ? params.lang : "en-US"
  const cms = initCmsClient()
  const showOnlyPublished = getClientEnv().DOCS_STATUS === "published"
  const splatParams = params["*"] as string
  invariant(typeof splatParams === "string", "Undefined splat route")
  const splittedParams = splatParams.split("/")
  const slug = splittedParams[splittedParams.length - 1]

  try {
    // const doc = await cms.getDocs({
    //   filter: {
    //     slug: { _eq: slug },
    //     ...(showOnlyPublished && { status: { _eq: "published" } }),
    //   },
    //   sort: ["id"],
    //   language: routelang,
    // })

    const doc = await cms.getDocs({
      filter: {
        ...(showOnlyPublished && { status: { _eq: "published" } }),
      },
      sort: ["id"],
      language: routeLang,
    })
    console.log("doc: ", doc)
    const currentDoc = doc.documentation.find((d) => d.slug?.includes(slug))
    console.log("currentDoc: ", currentDoc)
    if (!currentDoc) {
      throw new Error("Page must have markdown body")
    }

    const fmtDocData = organizeData([currentDoc])
    console.log("fmtDocData: ", fmtDocData)
    if (fmtDocData[0] && fmtDocData[0].links.length > 0) {
      return redirect(fmtDocData[0].links[0].link)
    }

    if (
      currentDoc.translations &&
      typeof currentDoc.translations[0]?.body !== "string" &&
      typeof currentDoc.translations[0]?.id !== "string" &&
      typeof currentDoc.translations[0]?.title !== "string"
    ) {
      throw new Error("Page must have markdown body")
    }

    return json<LoaderData>({
      data: currentDoc,
    })
  } catch (e) {
    console.error(`Docs error in ${params.slug}: `, e)
    throw e
  }
}

export default function Docs() {
  const { data }: LoaderData = useLoaderData()
  console.log("MOMENTO")
  return (
    <Remark>
      {data && data.translations && data.translations[0] && data.translations[0].body
        ? data.translations[0].body
        : ""}
    </Remark>
  )
}

export const ErrorBoundary = () => {
  return <NotFound404 />
}
