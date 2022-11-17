import { Button, Text } from "@pokt-foundation/pocket-blocks"
import { Form } from "@remix-run/react"
import { useState } from "react"
import styles from "./styles.css"
import Modal, { links as ModalLinks, ModalCTA } from "~/components/shared/Modal"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

/* c8 ignore start */
export const links = () => {
  return [...ModalLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface AppRemoveModalProps {
  appId: string
}

export default function AppEndpointCard({ appId }: AppRemoveModalProps) {
  const [opened, setOpened] = useState(false)

  return (
    <div className="pokt-app-remove">
      <Button fullWidth variant="outline" onClick={() => setOpened(true)}>
        <img
          aria-hidden
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
        <ModalCTA>
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
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
        </ModalCTA>
      </Modal>
    </div>
  )
}
