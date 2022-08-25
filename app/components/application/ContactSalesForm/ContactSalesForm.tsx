import { Grid } from "@mantine/core"
import { Form, useTransition } from "@remix-run/react"
import { useEffect, useRef } from "react"
import styles from "./styles.css"
import Button, { links as ButtonLinks } from "~/components/shared/Button"
import Card, { links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useTranslate } from "~/context/TranslateContext"

export const links = () => {
  return [
    ...CardLinks(),
    ...TextInputLinks(),
    ...ButtonLinks(),
    {
      rel: "stylesheet",
      href: styles,
    },
  ]
}

export default function ContactSalesForm() {
  const { t } = useTranslate()
  const formRef = useRef<HTMLFormElement>(null)
  let { state: transitionState, submission: transitionSubmission } = useTransition()
  let isAdding =
    transitionState === "submitting" &&
    transitionSubmission?.formData.get("_action") === "create"

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

  useEffect(() => {
    if (!isAdding) formRef.current?.reset()
  }, [isAdding])

  return (
    <Card>
      <Form ref={formRef} method="post">
        <Grid>
          {formFields.map(
            ({ component, label, name, placeholder, size, type = "text", required }) => (
              <Grid.Col key={name} xl={size ?? 12}>
                {component === "input" && (
                  <>
                    <label className="label" htmlFor={name}>
                      {label} {required && <span className="required-field">*</span>}
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
                      {label} {required && <span className="required-field">*</span>}
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
              ? t.ContactSalesView.submitting
              : t.ContactSalesView.submit}
          </Button>
        </div>
      </Form>
    </Card>
  )
}
