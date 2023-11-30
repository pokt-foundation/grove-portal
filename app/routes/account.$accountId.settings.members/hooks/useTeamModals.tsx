import { Text } from "@mantine/core"
import { useFetcher } from "@remix-run/react"
import React from "react"
import useActionNotification, {
  ActionNotificationData,
} from "~/hooks/useActionNotification"
import useModals from "~/hooks/useModals"
import { Account, RoleName } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { capitalizeFirstLetter } from "~/utils/utils"

type useTeamModalsProps = {
  account: Account
}

const useTeamModals = ({ account }: useTeamModalsProps) => {
  const fetcher = useFetcher()
  const { openConfirmationModal } = useModals()
  const { id: accountId } = account
  const fetcherData = fetcher.data as ActionNotificationData

  useActionNotification(fetcherData)

  const removeTeamMember = (userId: string, email: string) => {
    trackEvent({
      category: AnalyticCategories.account,
      action: AnalyticActions.account_team_remove,
      label: accountId,
    })
    fetcher.submit(
      {
        user_delete: "true",
        user_id: userId,
        user_email: email,
        account_name: account.name as string,
      },
      {
        method: "POST",
        action: `/account/${accountId}/settings/members`,
      },
    )
  }

  const changeMemberRole = (userId: string, role: RoleName, email: string) => {
    trackEvent({
      category: AnalyticCategories.account,
      action: AnalyticActions.account_team_change_role,
      label: accountId,
    })
    fetcher.submit(
      {
        user_update: "true",
        user_id: userId,
        user_role: role,
        user_email: email,
        account_name: account.name as string,
      },
      {
        method: "POST",
        action: `/account/${accountId}/settings/members`,
      },
    )
  }

  const resendEmail = (email: string) => {
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
      },
      {
        method: "POST",
        action: `/account/${accountId}/settings/members`,
      },
    )
  }

  const openRemoveUserModal = (email: string, userId: string) =>
    openConfirmationModal({
      title: <Text fw={600}>Remove user</Text>,
      children: <Text>Are you sure you want to remove {email} from your team?</Text>,
      labels: { cancel: "Cancel", confirm: "Remove" },
      confirmProps: { color: "red" },
      onConfirm: () => removeTeamMember(userId, email),
    })

  const openLeaveTeamModal = (email: string, userId: string) =>
    openConfirmationModal({
      title: <Text fw={600}>Leave team</Text>,
      children: <Text>Are you sure you want to leave the team?</Text>,
      labels: { cancel: "Cancel", confirm: "Leave" },
      confirmProps: { color: "red" },
      onConfirm: () => removeTeamMember(userId, email),
    })

  const openChangeRoleModal = (email: string, userId: string, role: RoleName) =>
    openConfirmationModal({
      title: <Text fw={600}>Change user role?</Text>,
      children: (
        <Text>
          Are you sure you want to change {email}'s role to {capitalizeFirstLetter(role)}?
        </Text>
      ),
      labels: { cancel: "Cancel", confirm: "Change" },
      onConfirm: () => changeMemberRole(userId, role, email),
    })

  const openResendEmailModal = (email: string) =>
    openConfirmationModal({
      title: <Text fw={600}>Remove user</Text>,
      children: <Text>Are you sure you want to resend an email to {email}?</Text>,
      labels: { cancel: "Cancel", confirm: "Resend" },
      onConfirm: () => resendEmail(email),
    })

  return {
    openRemoveUserModal,
    openChangeRoleModal,
    openLeaveTeamModal,
    openResendEmailModal,
  }
}

export default useTeamModals
