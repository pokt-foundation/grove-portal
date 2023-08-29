import { Image, Text, Stack, Button } from "@pokt-foundation/pocket-blocks"
import { Link, useParams } from "@remix-run/react"

export const EmptyState = () => {
  const { accountId } = useParams()

  return (
    <Stack align="center" justify="center">
      <Image
        withPlaceholder
        alt="Empty overview placeholder"
        height={210}
        src="/overview-empty-state.png"
        width={210}
      />
      <Text fw={600} fz="xl">
        Create your first application
      </Text>
      <Text fw={400} fz="sm">
        Applications connect your project to the blockchain. Set up your first one now.
      </Text>
      <Button
        component={Link}
        mt="xs"
        prefetch="intent"
        to={`/account/${accountId}/create`}
      >
        New Application
      </Button>
    </Stack>
  )
}

export default EmptyState
