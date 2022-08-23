import { Group, Modal, Text } from "@mantine/core"
import { Form } from "@remix-run/react"
import { useState } from "react"
import styles from "./styles.css"
import Button from "~/components/shared/Button"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface AppRemoveModalProps {
  appId: string
}

export default function AppEndpointCard({ appId }: AppRemoveModalProps) {
  const [opened, setOpened] = useState(false)

  return (
    <div className="pokt-app-remove">
      <Button fullWidth variant="subtle" onClick={() => setOpened(true)}>
        <img
          alt="Remove Application"
          className="pokt-app-remove-delete-icon"
          src="/delete.svg"
        />
        Remove Application
      </Button>
      <Modal
        opened={opened}
        title="You're about to remove this application!"
        onClose={() => setOpened(false)}
      >
        <div>
          <Text>App ID: {appId}</Text>
        </div>
        <Group align="center" position="apart">
          <Form action={`/dashboard/apps/${appId}/remove`} method="post">
            <Button
              type="submit"
              onClick={() => {
                trackEvent(AmplitudeEvents.EndpointRemoval)
              }}
            >
              Remove Application
            </Button>
          </Form>
          <Button variant="subtle" onClick={() => setOpened(false)}>
            Cancel
          </Button>
        </Group>
      </Modal>
    </div>
  )
}
