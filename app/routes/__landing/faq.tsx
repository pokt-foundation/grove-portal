import { LinksFunction } from "@remix-run/node"
import { Container } from "@pokt-foundation/pocket-blocks"
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
      <Container size="lg">
        <div className="container__content">
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
        </div>
      </Container>
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
