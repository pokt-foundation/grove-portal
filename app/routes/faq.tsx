import { ManyItems } from "@directus/sdk"
import { json, LinksFunction, LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import Remark, { links as RemarkLinks } from "~/components/shared/Remark"
import { useTranslate } from "~/context/TranslateContext"
import { initCmsClient } from "~/models/cms/directus.server"
import { Question } from "~/models/cms/types"
import styles from "~/styles/landing.css"

export const links: LinksFunction = () => {
  return [...RemarkLinks(), { rel: "stylesheet", href: styles }]
}

type LoaderData = {
  questions: ManyItems<Question>
}

export const loader: LoaderFunction = async ({ request }) => {
  const cms = initCmsClient()
  const questions = await (await cms).items("questions").readByQuery()
  console.log(questions)

  return json<LoaderData>({
    questions: questions,
  })
}

export default function FAQs() {
  const {
    t: { faq },
  } = useTranslate()
  const { questions } = useLoaderData<LoaderData>()

  return (
    <>
      <div className="container__content">
        <h1 className="center faqTitle">
          {faq.title}
          <span className="blue block">{faq.subtitle}</span>
        </h1>
        {questions.data &&
          questions.data.map((item) => {
            return (
              <>
                <h2 className="blue faqQuestion">{item.question}</h2>
                <Remark>{item.answer}</Remark>
              </>
            )
          })}
      </div>
    </>
  )
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
