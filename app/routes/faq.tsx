import { ManyItems } from "@directus/sdk"
import { json, LinksFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useMemo } from "react"
import { initCmsClient } from "~/models/cms/cms.server"
import { Question } from "~/models/cms/types"
import { groupBy } from "~/utils/utils"
import FaqsView, { links as FaqsViewLinks } from "~/views/faqs/faqsView"

export const links: LinksFunction = () => {
  return [...FaqsViewLinks()]
}

type LoaderData = {
  questions: ManyItems<Question>
}

export const loader: LoaderFunction = async ({ request }) => {
  const cms = initCmsClient()
  const questions = await (await cms)
    .items("questions")
    .readByQuery({ filter: { status: "published" } })

  return json<LoaderData>({
    questions: questions,
  })
}

export default function FAQs() {
  const { questions } = useLoaderData<LoaderData>()

  const categories = useMemo(() => {
    if (questions.data) {
      return groupBy(questions.data, "category")
    }
    return null
  }, [questions.data])

  return <FaqsView categories={categories} />
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
