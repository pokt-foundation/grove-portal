import { Button, Grid, Textarea, TextInput } from "@pokt-foundation/pocket-blocks"
import { Form, useNavigation } from "@remix-run/react"
import { useEffect, useRef } from "react"
import styles from "./styles.css"
import Card, { links as CardLinks } from "~/components/shared/Card"
import { useTranslate } from "~/context/TranslateContext"

/* c8 ignore start */
export const links = () => {
  return [
    ...CardLinks(),
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
  let navigation = useNavigation()

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
      size: 6,
      component: "input",
      type: "email",
      required: true,
    },
    {
      label: t.ContactSalesForm.company.label,
      name: "company",
      placeholder: t.ContactSalesForm.company.placeholder,
      size: 6,
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
    if (navigation.state === "submitting") formRef.current?.reset()
  }, [navigation.state])

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
                  sm={size ?? 12}
                >
                  {component === "input" && (
                    <TextInput
                      className="input"
                      label={label}
                      name={name}
                      placeholder={placeholder}
                      required={required}
                      type={type}
                    />
                  )}
                  {component === "textarea" && (
                    <Textarea
                      className="textarea"
                      label={label}
                      name={name}
                      placeholder={placeholder}
                      required={required}
                    />
                  )}
                </Grid.Col>
              ),
            )}
          </Grid>

          <div className="button-container">
            <Button
              className="pokt-button button"
              disabled={
                navigation.state === "loading" || navigation.state === "submitting"
              }
              size="sm"
              type="submit"
              variant="filled"
            >
              {navigation.state === "loading" || navigation.state === "submitting"
                ? t.ContactSalesForm.submitting
                : t.ContactSalesForm.submit}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
