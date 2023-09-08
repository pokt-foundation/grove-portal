import {
  PlasmicRootProvider,
  PlasmicComponent,
  ComponentRenderData,
  ComponentMeta,
} from "@plasmicapp/loader-react"
import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useCatch, useLoaderData } from "@remix-run/react"
import NotFound404, { seo_404_description, seo_404_title } from "~/components/NotFound404"
import { PLASMIC } from "~/models/plasmic/plasmic"
import { seo_title_append } from "~/utils/meta"

type LoaderData = {
  plasmicData: ComponentRenderData
  pageMeta: ComponentMeta & {
    params?: Record<string, string> | undefined
  }
  title: string | null | undefined
  description: string | null | undefined
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `${data?.title ?? seo_404_title} ${seo_title_append}`,
    description: `${data?.description ?? seo_404_description} ${seo_title_append}`,
  }
}

export const loader: LoaderFunction = async () => {
  try {
    const plasmicData = await PLASMIC.fetchComponentData("Homepage")

    if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
      throw new Error("Unable to load page")
    }
    const pageMeta = plasmicData.entryCompMetas[0]

    console.log(pageMeta)

    return json<LoaderData>({
      plasmicData,
      pageMeta,
      title: pageMeta.pageMetadata?.title,
      description: pageMeta.pageMetadata?.description,
    })
  } catch (e) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Cannot find home page",
    })
  }
}

export default function Page() {
  const { plasmicData, pageMeta } = useLoaderData() as LoaderData

  return (
    <PlasmicRootProvider
      loader={PLASMIC}
      pageParams={pageMeta.params}
      prefetchedData={plasmicData}
    >
      <PlasmicComponent component={pageMeta.displayName} />
    </PlasmicRootProvider>
  )
}

export const CatchBoundary = () => {
  const caught = useCatch()

  if (caught.status === 404) {
    return <NotFound404 />
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div>
      <p>{error.name}</p>
      <p>{error.message}</p>
      <p>{error?.stack}</p>
    </div>
  )
}
