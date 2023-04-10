import { json, LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useMemo } from "react"
import { initCmsClient } from "~/models/cms/cms.server"
import { getQuestionsQuery } from "~/models/cms/sdk"
import { seo_title_append } from "~/utils/meta"
import { groupBy } from "~/utils/utils"
import FaqsView, { links as FaqsViewLinks } from "~/views/faqs/faqsView"

export const links: LinksFunction = () => {
  return [...FaqsViewLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: `Frequently Asked Questions ${seo_title_append}`,
  }
}

type LoaderData = {
  questions: getQuestionsQuery
}

export const loader: LoaderFunction = async ({ request }) => {
  const cms = initCmsClient()
  const questions = await cms.getQuestions({
    filter: { status: { _eq: "published" } },
    sort: ["id"],
    language: "en-US",
  })

  return json<LoaderData>({
    questions: questions,
  })
}

export default function FAQs() {
  const { questions } = useLoaderData<LoaderData>()

  const categories = useMemo(() => {
    if (questions.questions) {
      const newArr = questions.questions.reduce((prev: any, curr) => {
        return [
          ...prev,
          {
            ...curr,
            categoryName: curr.category?.translations![0]?.name ?? "",
          },
        ]
      }, [])
      return groupBy(newArr, "categoryName")
    }
    return null
  }, [questions])

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
