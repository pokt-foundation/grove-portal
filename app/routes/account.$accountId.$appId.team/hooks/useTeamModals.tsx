import { Text } from "@pokt-foundation/pocket-blocks"
import { useFetcher } from "@remix-run/react"
import useModals from "~/hooks/useModals"
import { RoleName } from "~/models/portal/sdk"

type useTeamModalsProps = {
  appId: string
}

const useTeamModals = ({ appId }: useTeamModalsProps) => {
  const fetcher = useFetcher()
  const { openConfirmationModal } = useModals()

  const removeTeamMember = (userId: string) => {
    fetcher.submit(
      {
        // "app-name": app.name,
        "portal-user-id": userId,
        appId,
        type: "delete",
      },
      {
        method: "POST",
      },
    )
  }

  const leaveTeam = (userId: string) => {
    console.log("Leave team....", userId)
  }

  const changeMemberRole = (userId: string, role: RoleName) => {
    fetcher.submit(
      {
        "portal-user-id": userId,
        roleName: role,
        type: "updateRole",
        transferOwnership: "false",
      },
      {
        method: "POST",
      },
    )
  }

  const openRemoveUserModal = (email: string, userId: string) =>
    openConfirmationModal({
      title: <Text fw={600}>Remove user</Text>,
      children: <Text>Are you sure you want to remove {email} from your team?</Text>,
      labels: { cancel: "Cancel", confirm: "Remove" },
      confirmProps: { color: "red" },
      onConfirm: () => removeTeamMember(userId),
    })

  const openLeaveTeamModal = (email: string, userId: string) =>
    openConfirmationModal({
      title: <Text fw={600}>Leave team</Text>,
      children: <Text>Are you sure you want to leave the team?</Text>,
      labels: { cancel: "Cancel", confirm: "Leave" },
      confirmProps: { color: "red" },
      onConfirm: () => leaveTeam(userId),
    })

  const openChangeRoleModal = (email: string, userId: string, role: RoleName) =>
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
      onConfirm: () => changeMemberRole(userId, role),
    })

  return { openRemoveUserModal, openChangeRoleModal, openLeaveTeamModal }
}

export default useTeamModals
