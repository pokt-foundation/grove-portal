import { Container, Grid, Button, Text, Title, Box } from "@pokt-foundation/pocket-blocks"
import { LinksFunction } from "@remix-run/node"
import { useFetcher } from "@remix-run/react"

import styles from "~/styles/validate.css"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function ValidateEmail() {
  const fetcher = useFetcher()

  return (
    <div className="pokt-validate">
      <Container mt={72} size="lg">
        <Grid grow align="center" gutter="lg" justify="center">
          <Grid.Col className="pokt-validate__content" sm={7} xs={12}>
            <Box className="pokt-validate__title">
              <Title order={1} style={{ fontWeight: 500 }}>
                Email Verification{" "}
                <Title
                  order={1}
                  style={{ color: "var(--color-secondary-main)", fontWeight: 700 }}
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
              <Button
                size="md"
                type="submit"
                onClick={() => fetcher.load("/api/auth/auth0")}
              >
                Login
              </Button>
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
