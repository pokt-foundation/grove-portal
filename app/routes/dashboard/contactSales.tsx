import { Grid, Title } from "@mantine/core"
import { ActionFunction, MetaFunction } from "@remix-run/node"
import { Form } from "@remix-run/react"
import Button, { links as ButtonLinks } from "~/components/shared/Button"
import Card, { links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import styles from "~/styles/dashboard.apps.contactSales.css"

export const meta: MetaFunction = () => {
  return {
    title: "Contact Sales",
  }
}

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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const firstName = formData.get("first-name")
  const lastName = formData.get("last-name")
  const email = formData.get("email")
  const company = formData.get("company")
  const protocolChains = formData.get("protocol-chains")
  const relays = formData.get("relays")
  const tellUsMore = formData.get("tell-us-more")
}

const formFields: Array<{
  label: string
  name: string
  placeholder: string
  size?: number
  component: "input" | "textarea"
}> = [
  {
    label: "First Name",
    name: "first-name",
    placeholder: "Enter your name",
    size: 6,
    component: "input",
  },
  {
    label: "Last Name",
    name: "last-name",
    placeholder: "Enter your last name",
    size: 6,
    component: "input",
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Enter your email",
    component: "input",
  },
  {
    label: "Company",
    name: "company",
    placeholder: "Enter a company name",
    component: "input",
  },
  {
    label: "Protocol/Chains of interest",
    name: "protocol-chains",
    placeholder: "I'm interested in Chain...",
    component: "textarea",
  },
  {
    label: "Relay Needs",
    name: "relays",
    placeholder: "How many daily relays your application request",
    component: "input",
  },
  {
    label: "Tell us more about what you are building",
    name: "tell-us-more",
    placeholder: "I'm building a Chain...",
    component: "textarea",
  },
]

export default function ContactSales() {
  return (
    <section>
      <Title order={1}>We have Enterprise solutions for your needs</Title>
      <p>
        Give us some basic information of your request and our solutions team will reach
        out soon to find the best way of service your application.
      </p>

      <Card>
        <Form method="post">
          <Grid>
            {formFields.map(({ component, label, name, placeholder, size }) => (
              <Grid.Col key={name} xl={size ?? 12}>
                {component === "input" && (
                  <>
                    <label className="label" htmlFor={name}>
                      {label}
                    </label>
                    <TextInput className="input" name={name} placeholder={placeholder} />
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
                    />
                  </>
                )}
              </Grid.Col>
            ))}
          </Grid>

          <div className="button-container">
            <Button className="pokt-button button" type="submit" variant="filled">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </section>
  )
}
