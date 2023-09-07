import { Text } from "@pokt-foundation/pocket-blocks"
import { useFetcher } from "@remix-run/react"
import { useCallback } from "react"
import useModals from "~/hooks/useModals"
import { ProcessedEndpoint, RoleName } from "~/models/portal/sdk"

type useTeamModalsProps = {
  endpoint: ProcessedEndpoint
}

const useTeamModals = ({ endpoint }: useTeamModalsProps) => {
  const fetcher = useFetcher()
  const { openConfirmationModal } = useModals()
  const getPortalUserId = useCallback(
    (email: string) => endpoint?.users?.find((u) => u.email === email)?.userID as string,
    [endpoint],
  )

  const removeTeamMember = (email: string) => {
    fetcher.submit(
      {
        "email-address": email,
        "app-name": endpoint.name,
        "portal-user-id": getPortalUserId(email),
        type: "delete",
      },
      {
        method: "POST",
      },
    )
  }

  const changeMemberRole = (email: string, role: RoleName) => {
    fetcher.submit(
      {
        email: email,
        "portal-user-id": getPortalUserId(email),
        roleName: role,
        type: "updateRole",
        transferOwnership: "false",
      },
      {
        method: "POST",
      },
    )
  }

  const openRemoveUserModal = (email: string) =>
    openConfirmationModal({
      title: <Text fw={600}>Remove user</Text>,
      children: <Text>Are you sure you want to remove {email} from your team?</Text>,
      labels: { cancel: "Cancel", confirm: "Remove" },
      confirmProps: { color: "red" },
      onConfirm: () => removeTeamMember(email),
    })

  const openChangeRoleModal = (email: string, role: RoleName) =>
    openConfirmationModal({
      title: <Text fw={600}>Change user role?</Text>,
      children: (
        <Text>
          Are you sure you want to change {email}'s role to{" "}
          <Text display="inline" tt="capitalize">
            {role.toLowerCase()}
          </Text>
          ?
        </Text>
      ),
      labels: { cancel: "Cancel", confirm: "Change" },
      onConfirm: () => changeMemberRole(email, role),
    })

  return { openRemoveUserModal, openChangeRoleModal }
}

export default useTeamModals
