import { Box, Button, Center, Group, Text, Title } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import React from "react"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

type NotFound404Props = {
  message?: string
}

export const seo_404_title = "Page Not Found"
export const seo_404_description =
  "Uh, oh. We can't seem to find the page you're looking for. Try going back to the previous page or these links below."

export default function NotFound404({ message }: NotFound404Props) {
  return (
    <Center className="error-container" mt="xl">
      <Box sx={{ maxWidth: "600px", textAlign: "center" }}>
        <Title order={1}>{seo_404_title}</Title>
        <Text>{seo_404_description}</Text>
        <Group position="center">
          <Button component={Link} size="sm" to="/">
            Portal Home
          </Button>
          <Button component={Link} size="sm" to="/account">
            Application Dashboard
          </Button>
        </Group>
      </Box>
    </Center>
  )
}
