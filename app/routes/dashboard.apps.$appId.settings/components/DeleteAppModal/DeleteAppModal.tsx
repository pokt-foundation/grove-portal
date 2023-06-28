import { Button, Flex, Text } from "@pokt-foundation/pocket-blocks"
import { Form } from "@remix-run/react"
import Modal, { links as ModalLinks } from "~/components/Modal"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

export const links = () => {
  return [...ModalLinks()]
}

interface DeleteAppModalProps {
  isRemoveAppOpened: boolean
  setIsRemoveAppOpened: React.Dispatch<React.SetStateAction<boolean>>
  endpointID: string
}

export function DeleteAppModal({
  isRemoveAppOpened,
  setIsRemoveAppOpened,
  endpointID,
}: DeleteAppModalProps) {
  return (
    <Modal
      opened={isRemoveAppOpened}
      title="Are you sure you want to delete your App?"
      onClose={() => setIsRemoveAppOpened(false)}
    >
      <Text>
        Any applications using this App's keys will no longer be able to access the API.
        This can not be undone.
      </Text>

      <Flex
        gap={8}
        justify="space-between"
        sx={{
          form: {
            width: "45%",
          },
        }}
      >
        <Button
          sx={{ width: "45%" }}
          variant="outline"
          onClick={() => setIsRemoveAppOpened(false)}
        >
          Cancel
        </Button>
        <Form action={`/api/${endpointID}/remove`} method="post">
          <Button
            color="red"
            sx={{
              width: "100%",
            }}
            type="submit"
            onClick={() => {
              trackEvent(AmplitudeEvents.EndpointRemoval)
            }}
          >
            Delete
          </Button>
        </Form>
      </Flex>
    </Modal>
  )
}

export default DeleteAppModal
