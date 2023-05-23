import { LoaderFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import NotFound404 from "~/components/NotFound404"
import Remark from "~/components/Remark"
import { initCmsClient } from "~/models/cms/cms.server"
import { documentation } from "~/models/cms/sdk"
import { getClientEnv } from "~/utils/environment.server"

type LoaderData = {
  data: documentation[]
}

export const loader: LoaderFunction = async ({ params }) => {
  const routelang = params.lang !== undefined ? params.lang : "en-US"
  const cms = initCmsClient()
  const showOnlyPublished = getClientEnv().DOCS_STATUS === "published"
  const splatParams = params["*"] as string
  invariant(typeof splatParams === "string", "Undefined splat route")
  const slug = splatParams.split("/").pop()

  try {
    const doc = await cms.getDocs({
      filter: {
        slug: { _eq: slug },
        ...(showOnlyPublished && { status: { _eq: "published" } }),
      },
      sort: ["id"],
      language: routelang,
    })

    const { translations } = doc.documentation[0]
    if (!translations || !translations[0] || translations[0].body?.trim().length === 0) {
      throw new Error("Page must have markdown body")
    }

    if (
      typeof translations[0]?.body !== "string" &&
      typeof translations[0]?.id !== "string" &&
      typeof translations[0]?.title !== "string"
    ) {
      throw new Error("Page must have markdown body")
    }

    return json<LoaderData>({
      data: doc.documentation,
    })
  } catch (e) {
    console.error(`Docs error in ${params.slug}: `, e)
    throw e
  }
}

export default function Docs() {
  const { data }: LoaderData = useLoaderData()

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
