import { Title } from "@mantine/core"
import { useEffect, useState } from "react"
import styles from "./styles.css"
import ContactSalesForm, {
  links as ContactSalesFormLinks,
} from "~/components/application/ContactSalesForm"
import Button, { links as ButtonLinks } from "~/components/shared/Button"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import { useTranslate } from "~/context/TranslateContext"
import { ContactSalesActionData } from "~/routes/dashboard/contact-sales"

/* c8 ignore start */
export const links = () => {
  return [
    ...ButtonLinks(),
    ...ModalLinks(),
    ...ContactSalesFormLinks(),
    {
      rel: "stylesheet",
      href: styles,
    },
  ]
}
/* c8 ignore stop */

export const ContactSalesView = (data: ContactSalesActionData) => {
  const { t } = useTranslate()
  const { result = "error", error = null } = data
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
      <ContactSalesForm />
      <Modal opened={successModalOpened} onClose={() => setSuccessModalOpened(false)}>
        <div className="contact-modal-container">
          <img alt="Success" src="/checkmarkWithCircle.svg" />
          <Title order={2}>{t.ContactSalesView.formSubmitted}</Title>
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
