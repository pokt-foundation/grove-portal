import { Text, Title } from "@mantine/core"
import { LinksFunction } from "@remix-run/node"
import { Form } from "@remix-run/react"
import Button from "~/components/shared/Button"
import Container from "~/components/shared/Container"
import Grid from "~/components/shared/Grid"
import styles from "~/styles/validate.css"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function ValidateEmail() {
  return (
    <div className="pokt-validate">
      <Container>
        <Grid align="center">
          <Grid.Col sm={7} xs={12}>
            <Title order={1}>Account Verification Pending</Title>
            <Text>
              We sent you an email with a link to verify your account. Please complete
              this action to proceed with login.
            </Text>
            <Form action="/api/auth/auth0" method="post">
              <Button type="submit" variant="outline">
                Login
              </Button>
            </Form>
          </Grid.Col>
          <Grid.Col sm={5} xs={12}>
            <img alt="Pocket Network Portal icon" src="/portal_logo.svg" />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  )
}
