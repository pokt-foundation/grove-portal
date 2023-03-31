import { Container, Grid, Button, Text, Title, Box } from "@pokt-foundation/pocket-blocks"
import { LinksFunction } from "@remix-run/node"
import { Form } from "@remix-run/react"

import styles from "~/styles/validate.css"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function ValidateEmail() {
  return (
    <div className="pokt-validate">
      <Container mt={72} size="lg">
        <Grid grow align="center" gutter="lg" justify="center">
          <Grid.Col className="pokt-validate__content" sm={7} xs={12}>
            <Box className="pokt-validate__title">
              <Title order={1} sx={{ fontWeight: "normal" }}>
                Email Verification{" "}
                <Title
                  order={1}
                  sx={{
                    color: "var(--mantine-color-blue-6)",
                    fontWeight: "bold",
                  }}
                >
                  Sent
                </Title>
              </Title>
            </Box>

            <Text className="pokt-validate__description" mt={32}>
              We sent you an email with a link to verify your account. Please complete
              this action to proceed with login.
            </Text>

            <Box className="pokt-validate__button">
              <Form action="/api/auth/auth0" method="post">
                <Button size="md" type="submit">
                  Login
                </Button>
              </Form>
            </Box>
          </Grid.Col>

          <Grid.Col className="pokt-validate__logo" sm={5} xs={12}>
            <img alt="Pocket Network Portal icon" src="/portal_logo.svg" />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  )
}
