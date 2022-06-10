import { Container } from "~/components/shared/Container"
import { LinksFunction } from "@remix-run/node"
import { useTranslate } from "~/context/TranslateContext"
import styles from "~/styles/landing.css"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function FAQs() {
  const {
    t: { faq },
  } = useTranslate()

  return (
    <>
      <Container>
        <h1 className="center faqTitle">
          {faq.title}
          <span className="blue block">{faq.subtitle}</span>
        </h1>
        {faq.faqs.map((item) => {
          return (
            <>
              <h2 className="blue faqQuestion">{item.question}</h2>
              <p className="faqAnswer">{item.answer}</p>
            </>
          )
        })}
      </Container>
    </>
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <dialog title="Index Error" color="red">
        {error.message}
      </dialog>
    </div>
  )
}
