import { Button, Group, Menu, Text, TextInput } from "@mantine/core"
import { closeAllModals } from "@mantine/modals"
import { Form } from "@remix-run/react"
import { useState } from "react"
import { LuTrash2 } from "react-icons/lu/index.js"
import useModals from "~/hooks/useModals"
import { PortalApp } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type DeleteApplicationProps = {
  app: PortalApp
}

const DeleteAppForm = ({ app }: { app: PortalApp }) => {
  const [deleteTextInputValue, setDeleteTextInputValue] = useState("")

  return (
    <Form action={`/account/${app.accountID}/${app.id}`} method="post">
      <Text size="sm">
        Please type ‘Delete’ to proceed. This will delete your application and all the
        data related.
      </Text>
      <TextInput
        mt="md"
        name="delete_input"
        onChange={(e) => setDeleteTextInputValue(e.target.value)}
      />
      <input hidden readOnly name="app_name" value={app.name} />
      <input hidden readOnly name="app_emoji" value={app.appEmoji} />
      <Group grow mt={32}>
        <Button
          id="cancel"
          type="button"
          variant="default"
          onClick={() => closeAllModals()}
        >
          Cancel
        </Button>
        <Button
          color="red"
          disabled={deleteTextInputValue.toLowerCase() !== "delete"}
          name="delete_application"
          type="submit"
          value="true"
          onClick={() => {
            closeAllModals()
            trackEvent({
              category: AnalyticCategories.app,
              action: AnalyticActions.app_delete,
              label: app.id,
            })
          }}
        >
          Delete
        </Button>
      </Group>
    </Form>
  )
}

const DeleteApplication = ({ app }: DeleteApplicationProps) => {
  const { openContentModal } = useModals()

  const openDeleteModal = () => {
    openContentModal({
      title: <Text fw={600}>Delete application?</Text>,
      children: <DeleteAppForm app={app} />,
    })
  }

  return (
    <Menu.Item icon={<LuTrash2 size={18} />} onClick={openDeleteModal}>
      Delete application
    </Menu.Item>
  )
}

export default DeleteApplication
