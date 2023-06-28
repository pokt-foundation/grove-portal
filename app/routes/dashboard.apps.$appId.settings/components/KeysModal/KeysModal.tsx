import { Button, IconX } from "@pokt-foundation/pocket-blocks"
import { Auth0Profile } from "remix-auth-auth0"
import Modal, { links as ModalLinks } from "~/components/Modal"
import { EndpointQuery, RoleName } from "~/models/portal/sdk"
import KeysCard, {
  links as KeysCardLinks,
} from "~/routes/dashboard.apps.$appId/components/KeysCard"

export const links = () => {
  return [...ModalLinks(), ...KeysCardLinks()]
}

interface KeysModalProps {
  isKeysModalOpen: boolean
  setIsKeysModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  endpoint: EndpointQuery["endpoint"]
  user: Auth0Profile
}

export function KeysModal({
  isKeysModalOpen,
  setIsKeysModalOpen,
  endpoint,
  user,
}: KeysModalProps) {
  const role = endpoint?.users.find((u) => u.email === user._json?.email)?.roleName
  const isMember = role === RoleName.Member

  return (
    <Modal
      opened={isKeysModalOpen}
      sx={(theme) => ({
        ".mantine-Paper-root.mantine-Modal-modal": {
          background: "transparent",
          "& .mantine-Modal-header": {
            justifyContent: "end",
            marginBottom: "0.5rem",
            "& .mantine-Modal-title button": {
              color: theme.colors.gray[0],
              fontSize: "0.875rem",
            },
          },
        },
        ".pokt-app-keys": {
          width: "100%",
        },
      })}
      title={
        <Button
          rightIcon={<IconX height={12} width={12} />}
          variant="subtle"
          onClick={() => setIsKeysModalOpen(false)}
        >
          Close
        </Button>
      }
      withCloseButton={false}
      onClose={() => setIsKeysModalOpen(false)}
    >
      <KeysCard
        id={endpoint.id}
        isMember={isMember}
        publicKey={endpoint.apps ? endpoint.apps[0]?.publicKey : ""}
        secret={endpoint.gatewaySettings.secretKey}
      />
    </Modal>
  )
}

export default KeysModal
