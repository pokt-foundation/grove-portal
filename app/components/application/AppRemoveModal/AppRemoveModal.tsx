import styles from "./styles.css"
import { useState } from "react"
import { Group, Modal, Text } from "@mantine/core"
import Button from "~/components/shared/Button"
import { Form } from "@remix-run/react"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface AppRemoveModalProps {
  appId: string
}

export default function AppEndpointCard({ appId }: AppRemoveModalProps) {
  const [opened, setOpened] = useState(false)

  return (
    <div className="pokt-app-remove">
      <Button variant="subtle" fullWidth onClick={() => setOpened(true)}>
        <img
          className="pokt-app-remove-delete-icon"
          src="/delete.svg"
          alt="Remove Application"
        />
        Remove Application
      </Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="You're about to remove this application!"
      >
        <div>
          <Text>App ID: {appId}</Text>
        </div>
        <Group align="center" position="apart">
          <Form method="post" action={`/dashboard/apps/${appId}/remove`}>
            <Button type="submit">Remove Application</Button>
          </Form>
          <Button variant="subtle" onClick={() => setOpened(false)}>
            Cancel
          </Button>
        </Group>
      </Modal>
    </div>
  )
}
