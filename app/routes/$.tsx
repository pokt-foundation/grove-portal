import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import NotFound404, {
  seo_404_description,
  seo_404_title,
} from "~/components/shared/NotFound404"
import { seo_title_append } from "~/utils/meta"

type LoaderData = {
  param?: string
}

export const meta: MetaFunction = () => {
  return {
    title: `${seo_404_title} ${seo_title_append}`,
    description: `${seo_404_description} ${seo_title_append}`,
  }
}

export const loader: LoaderFunction = ({ params }) => {
  return {
    param: params["*"],
  }
}

export default function Route404() {
  const data = useLoaderData() as LoaderData
  return <NotFound404 message={data.param} />
}
