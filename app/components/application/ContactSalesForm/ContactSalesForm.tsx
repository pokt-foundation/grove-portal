import { Grid } from "@mantine/core"
import { Form, useTransition } from "@remix-run/react"
import { useEffect, useRef } from "react"
import styles from "./styles.css"
import Button, { links as ButtonLinks } from "~/components/shared/Button"
import Card, { links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useTranslate } from "~/context/TranslateContext"

/* c8 ignore start */
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
/* c8 ignore stop */

export default function ContactSalesForm() {
  const { t } = useTranslate()
  const formRef = useRef<HTMLFormElement>(null)
  let transition = useTransition()

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
      label: t.ContactSalesForm.firstName.label,
      name: "first-name",
      placeholder: t.ContactSalesForm.firstName.placeholder,
      size: 6,
      component: "input",
      required: true,
    },
    {
      label: t.ContactSalesForm.lastName.label,
      name: "last-name",
      placeholder: t.ContactSalesForm.lastName.placeholder,
      size: 6,
      component: "input",
      required: true,
    },
    {
      label: t.ContactSalesForm.email.label,
      name: "email",
      placeholder: t.ContactSalesForm.email.placeholder,
      component: "input",
      type: "email",
      required: true,
    },
    {
      label: t.ContactSalesForm.company.label,
      name: "company",
      placeholder: t.ContactSalesForm.company.placeholder,
      component: "input",
      required: false,
    },
    {
      label: t.ContactSalesForm.chains.label,
      name: "protocol-chains",
      placeholder: t.ContactSalesForm.chains.placeholder,
      component: "textarea",
      required: true,
    },
    {
      label: t.ContactSalesForm.relays.label,
      name: "relays",
      placeholder: t.ContactSalesForm.relays.placeholder,
      component: "input",
      type: "number",
      required: true,
    },
    {
      label: t.ContactSalesForm.tellUsMore.label,
      name: "tell-us-more",
      placeholder: t.ContactSalesForm.tellUsMore.placeholder,
      component: "textarea",
      required: false,
    },
  ]

  useEffect(() => {
    if (transition.type === "actionSubmission") formRef.current?.reset()
  }, [transition.type])

  return (
    <div className="contact-sales-form-container">
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
                <Grid.Col
                  key={name}
                  className="contact-sales-form-grid-col"
                  md={size ?? 12}
                >
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
              disabled={
                transition.state === "loading" || transition.state === "submitting"
              }
              type="submit"
              variant="filled"
            >
              {transition.state === "loading" || transition.state === "submitting"
                ? t.ContactSalesForm.submitting
                : t.ContactSalesForm.submit}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
