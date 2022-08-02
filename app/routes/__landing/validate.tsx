import { Form } from "@remix-run/react"
import Button from "~/components/shared/Button"
import Container from "~/components/shared/Container"
import Grid from "~/components/shared/Grid"
import { Text, Title } from "@mantine/core"
import { LinksFunction } from "@remix-run/node"
import styles from "~/styles/validate.css"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function ValidateEmail() {
  return (
    <div className="pokt-validate">
      <Container>
        <Grid align="center">
          <Grid.Col xs={12} sm={7}>
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
          <Grid.Col xs={12} sm={5}>
            <img src="/portal_logo.svg" alt="Pocket Network Portal icon" />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  )
}
