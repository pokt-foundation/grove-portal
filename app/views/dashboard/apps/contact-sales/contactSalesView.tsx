import { Grid, Title } from "@mantine/core"
import { Form, useTransition } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import styles from "./styles.css"
import Button, { links as ButtonLinks } from "~/components/shared/Button"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { ContactSalesActionData } from "~/routes/dashboard/contact-sales"

export const links = () => {
  return [
    ...CardLinks(),
    ...TextInputLinks(),
    ...ButtonLinks(),
    ...ModalLinks(),
    {
      rel: "stylesheet",
      href: styles,
    },
  ]
}

const formFields: Array<{
  label: string
  name: string
  placeholder: string
  size?: number
  component: "input" | "textarea"
  type?: "number" | "search" | "text" | "password" | "email" | "tel" | "url" | undefined
  required: boolean
}> = [
  {
    label: "First Name",
    name: "first-name",
    placeholder: "Enter your name",
    size: 6,
    component: "input",
    required: true,
  },
  {
    label: "Last Name",
    name: "last-name",
    placeholder: "Enter your last name",
    size: 6,
    component: "input",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Enter your email",
    component: "input",
    type: "email",
    required: true,
  },
  {
    label: "Company",
    name: "company",
    placeholder: "Enter a company name",
    component: "input",
    required: false,
  },
  {
    label: "Protocol/Chains of interest",
    name: "protocol-chains",
    placeholder: "I'm interested in Chain...",
    component: "textarea",
    required: true,
  },
  {
    label: "Relay Needs",
    name: "relays",
    placeholder: "How many daily relays your application request",
    component: "input",
    type: "number",
    required: true,
  },
  {
    label: "Tell us more about what you are building",
    name: "tell-us-more",
    placeholder: "I'm building a Chain...",
    component: "textarea",
    required: false,
  },
]

export const ContactSalesView = (data: ContactSalesActionData) => {
  const { result = "error" } = data
  let { state: transitionState, submission: transitionSubmission } = useTransition()
  let isAdding =
    transitionState === "submitting" &&
    transitionSubmission?.formData.get("_action") === "create"
  const formRef = useRef<HTMLFormElement>(null)
  const [opened, setOpened] = useState<boolean>(false)

  useEffect(() => {
    if (result === "success") setOpened(true)
    if (!isAdding) formRef.current?.reset()
  }, [result, isAdding])

  return (
    <section>
      <Title order={1}>We have Enterprise solutions for your needs</Title>
      <p>
        Give us some basic information of your request and our solutions team will reach
        out soon to find the best way of service your application.
      </p>

      <Card>
        <Form ref={formRef} method="post">
          <Grid>
            {formFields.map(
              ({
                component,
                label,
                name,
                placeholder,
                size,
                type = "text",
                required,
              }) => (
                <Grid.Col key={name} xl={size ?? 12}>
                  {component === "input" && (
                    <>
                      <label className="label" htmlFor={name}>
                        {label}
                      </label>
                      <TextInput
                        className="input"
                        name={name}
                        placeholder={placeholder}
                        required={required}
                        type={type}
                      />
                    </>
                  )}
                  {component === "textarea" && (
                    <>
                      <label className="label" htmlFor={name}>
                        {label}
                      </label>
                      <textarea
                        className="textarea"
                        name={name}
                        placeholder={placeholder}
                        required={required}
                      />
                    </>
                  )}
                </Grid.Col>
              ),
            )}
          </Grid>

          <div className="button-container">
            <Button
              className="pokt-button button"
              disabled={transitionState === "loading" || transitionState === "submitting"}
              type="submit"
              variant="filled"
            >
              {transitionState === "loading" || transitionState === "submitting"
                ? transitionState
                : "Submit"}
            </Button>
          </div>
        </Form>
      </Card>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <div className="contact-modal-container">
          <img alt="Success" src="/checkmarkWithCircle.svg" />
          <Title order={2}>Form Submitted</Title>
          <Button
            className="pokt-button button"
            type="button"
            variant="filled"
            onClick={() => setOpened(false)}
          >
            Done
          </Button>
        </div>
      </Modal>
    </section>
  )
}

export default ContactSalesView
