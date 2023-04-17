import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useCatch, useLoaderData } from "@remix-run/react"
import NotFound404, {
  seo_404_title,
  seo_404_description,
} from "~/components/shared/NotFound404"
import Remark from "~/components/shared/Remark"
import { initCmsClient } from "~/models/cms/cms.server"
import { seo_title_append } from "~/utils/meta"

type LoaderData = {
  description: string
  markdown: string
  title: string
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `${data?.title ?? seo_404_title} ${seo_title_append}`,
    description: `${data?.description ?? seo_404_description} ${seo_title_append}`,
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const routelang = params.lang !== undefined ? params.lang : "en-US"
  const cms = initCmsClient()

  console.log(params.page)

  try {
    let description
    let markdown
    let title

    if (typeof params.page !== "string") {
      throw new Error("Page slug param must be a string")
    }

    const generic = await cms.getGeneric({
      filter: { status: { _eq: "published" }, slug: { _eq: params.page } },
      language: routelang,
    })

    if (generic.generic_pages.length === 0) {
      throw new Error("Page slug was not found in directus")
    }

    if (
      generic.generic_pages[0].translations &&
      typeof generic.generic_pages[0].translations[0]?.body === "string" &&
      typeof generic.generic_pages[0].translations[0]?.seo_description === "string" &&
      typeof generic.generic_pages[0].translations[0]?.seo_title === "string"
    ) {
      description = generic.generic_pages[0].translations[0]?.seo_description
      markdown = generic.generic_pages[0].translations[0]?.body
      title = generic.generic_pages[0].translations[0]?.seo_title
    } else {
      throw new Error("Page must have markdown body")
    }

    return json<LoaderData>({
      description,
      markdown,
      title,
    })
  } catch (e) {
    throw new Response("Not Found", {
      status: 404,
      statusText: params.page,
    })
  }
}

export default function Page() {
  const { markdown } = useLoaderData<LoaderData>()

  return <Remark>{markdown}</Remark>
}

// handles 404
export const CatchBoundary = () => {
  const caught = useCatch()

  if (caught.status === 404) {
    return <NotFound404 />
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}
