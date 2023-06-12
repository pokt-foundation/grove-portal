import { ActionFunction, json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { initCmsClient } from "~/models/cms/cms.server"
import { documentation } from "~/models/cms/sdk"

type LoaderData = {
  data: documentation[]
}

export const action: ActionFunction = async ({ request, params }) => {
  const routeLang = params.lang ?? "en-US"

  const formData = await request.formData()
  const searchTerm = formData.get("searchTerm")

  invariant(typeof searchTerm === "string", "search term must be a string")
  const cms = initCmsClient()

  try {
    const doc = await cms.searchDocs({
      language: routeLang,
      search: searchTerm,
      filter: {
        status: { _eq: "published" },
        is_parent: { _neq: true },
      },
    })

    return json<LoaderData>({
      data: doc.documentation ? doc.documentation : [],
    })
  } catch (e) {
    throw new Error(`Error: ${e}`)
  }
}
