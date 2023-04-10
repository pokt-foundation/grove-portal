import { Button, Title, Text } from "@pokt-foundation/pocket-blocks"
import { useEffect, useState } from "react"
import styles from "./styles.css"
import ContactSalesForm, {
  links as ContactSalesFormLinks,
} from "~/components/application/ContactSalesForm"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import { useTranslate } from "~/context/TranslateContext"
import { ContactSalesActionData, ContactSalesLoaderData } from "~/routes/contact-sales"

/* c8 ignore start */
export const links = () => {
  return [
    ...ModalLinks(),
    ...ContactSalesFormLinks(),
    {
      rel: "stylesheet",
      href: styles,
    },
  ]
}
/* c8 ignore stop */

type ContactSalesViewProps = {
  actionData: ContactSalesActionData
  loaderData: ContactSalesLoaderData
}

export const ContactSalesView = ({ actionData, loaderData }: ContactSalesViewProps) => {
  const { t } = useTranslate()
  const { result, error } = actionData
  const [successModalOpened, setSuccessModalOpened] = useState<boolean>(false)
  const [failedModalOpened, setFailedModalOpened] = useState<boolean>(false)

  useEffect(() => {
    if (result === "success") setSuccessModalOpened(true)
    if (result === "error" && error) setFailedModalOpened(true)
  }, [result, error])

  return (
    <section>
      <Title order={1}>{t.ContactSalesView.title}</Title>
      <p>{t.ContactSalesView.description}</p>
      <ContactSalesForm loaderData={loaderData} />
      <Modal opened={successModalOpened} onClose={() => setSuccessModalOpened(false)}>
        <div className="contact-modal-container">
          <img alt="Success" src="/checkmarkWithCircle.svg" />
          <Title order={2}>{t.ContactSalesView.formSubmitted}</Title>
          <Text>{t.ContactSalesView.formSubmittedDescription}</Text>
          <Button
            className="pokt-button button"
            type="button"
            variant="filled"
            onClick={() => setSuccessModalOpened(false)}
          >
            {t.ContactSalesView.done}
          </Button>
        </div>
      </Modal>
      <Modal opened={failedModalOpened} onClose={() => setFailedModalOpened(false)}>
        <div className="contact-modal-container">
          <img alt="Failure" src="/xWithCircle.svg" />
          <Title order={2}>{t.ContactSalesView.formSubmissionFailed}</Title>
          <Button
            className="pokt-button button"
            type="button"
            variant="filled"
            onClick={() => setFailedModalOpened(false)}
          >
            {t.ContactSalesView.done}
          </Button>
        </div>
      </Modal>
    </section>
  )
}

export default ContactSalesView
