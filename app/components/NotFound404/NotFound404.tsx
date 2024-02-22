import { Button, Image, Stack, Text, Title } from "@mantine/core"
import { Link } from "@remix-run/react"
import React from "react"
import useCommonStyles from "~/styles/commonStyles"

type NotFound404Props = {
  message?: string
}

export const seo_404_title = "Page Not Found"
export const seo_404_description =
  "Uh, oh. We can't seem to find the page you're looking for. Try going back to the previous page or these links below."

export default function NotFound404({ message }: NotFound404Props) {
  const { classes: commonClasses } = useCommonStyles()

  return (
    <Stack align="center" mt={120}>
      <Image withPlaceholder alt="Page not found" src="/page-not-found.svg" width={250} />
      <Stack align="center" spacing="xs">
        <Title order={3}>{seo_404_title}</Title>
        <Text align="center">
          We can’t seem to find the page you are looking for.
          <br />
          Try going back or to your Portal Overview.
        </Text>
      </Stack>
      <Button
        className={commonClasses.grayOutline}
        color="gray"
        component={Link}
        mt="xl"
        size="sm"
        to="/account"
        variant="outline"
      >
        Back to Overview
      </Button>
    </Stack>
  )
}
