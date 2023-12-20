import { Text } from "@pokt-foundation/pocket-blocks"
import { useFetcher } from "@remix-run/react"
import React from "react"
import useActionNotification from "~/hooks/useActionNotification"
import useModals from "~/hooks/useModals"
import { Account, AccountUser } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { capitalizeFirstLetter } from "~/utils/utils"

type useTeamModalsProps = {
  account: Account
}

type TeamActionProps = Pick<AccountUser, "email" | "roleName" | "id">
const useTeamModals = ({ account }: useTeamModalsProps) => {
  const fetcher = useFetcher()
  const { openConfirmationModal } = useModals()
  const { id: accountId } = account

  useActionNotification(fetcher.data)

  const removeTeamMember = ({ id, email }: Omit<TeamActionProps, "roleName">) => {
    trackEvent({
      category: AnalyticCategories.account,
      action: AnalyticActions.account_team_remove,
      label: accountId,
    })
    fetcher.submit(
      {
        user_delete: "true",
        user_id: id,
        user_email: email,
        account_name: account.name as string,
      },
      {
        method: "POST",
        action: `/account/${accountId}/settings/members`,
      },
    )
  }

  const leaveTeam = ({ id, email }: Omit<TeamActionProps, "roleName">) => {
    trackEvent({
      category: AnalyticCategories.account,
      action: AnalyticActions.account_team_leave,
      label: accountId,
    })
    fetcher.submit(
      {
        user_leave: "true",
        user_id: id,
        user_email: email,
        account_name: account.name as string,
      },
      {
        method: "POST",
        action: `/account/${accountId}/settings/members`,
      },
    )
  }

  const changeMemberRole = ({ email, id, roleName }: TeamActionProps) => {
    trackEvent({
      category: AnalyticCategories.account,
      action: AnalyticActions.account_team_change_role,
      label: accountId,
    })
    fetcher.submit(
      {
        user_update: "true",
        user_id: id,
        user_role: roleName,
        user_email: email,
        account_name: account.name as string,
      },
      {
        method: "POST",
        action: `/account/${accountId}/settings/members`,
      },
    )
  }

  const resendEmail = ({ email, id, roleName }: TeamActionProps) => {
    trackEvent({
      category: AnalyticCategories.account,
      action: AnalyticActions.account_team_resend,
      label: accountId,
    })
    fetcher.submit(
      {
        user_resend: "true",
        user_email: email,
        account_name: account.name as string,
        user_role: roleName,
        user_id: id,
      },
      {
        method: "POST",
        action: `/account/${accountId}/settings/members`,
      },
    )
  }

  const openRemoveUserModal = ({ id, email }: Omit<TeamActionProps, "roleName">) =>
    openConfirmationModal({
      title: <Text fw={600}>Remove user</Text>,
      children: <Text>Are you sure you want to remove {email} from your team?</Text>,
      labels: { cancel: "Cancel", confirm: "Remove" },
      confirmProps: { color: "red" },
      onConfirm: () => removeTeamMember({ id, email }),
    })

  const openLeaveTeamModal = ({ id, email }: Omit<TeamActionProps, "roleName">) =>
    openConfirmationModal({
      title: <Text fw={600}>Leave team</Text>,
      children: <Text>Are you sure you want to leave the team?</Text>,
      labels: { cancel: "Cancel", confirm: "Leave" },
      confirmProps: { color: "red" },
      onConfirm: () => leaveTeam({ id, email }),
    })

  const openChangeRoleModal = ({ email, id, roleName }: TeamActionProps) =>
    openConfirmationModal({
      title: <Text fw={600}>Change user role?</Text>,
      children: (
        <Text>
          Are you sure you want to change {email}'s role to{" "}
          {capitalizeFirstLetter(roleName)}?
        </Text>
      ),
      labels: { cancel: "Cancel", confirm: "Change" },
      onConfirm: () => changeMemberRole({ email, id, roleName }),
    })

  const openResendEmailModal = ({ email, id, roleName }: TeamActionProps) =>
    openConfirmationModal({
      title: <Text fw={600}>Remove user</Text>,
      children: <Text>Are you sure you want to resend an email to {email}?</Text>,
      labels: { cancel: "Cancel", confirm: "Resend" },
      onConfirm: () => resendEmail({ email, id, roleName }),
    })

  return {
    openRemoveUserModal,
    openChangeRoleModal,
    openLeaveTeamModal,
    openResendEmailModal,
  }
}

export default useTeamModals
