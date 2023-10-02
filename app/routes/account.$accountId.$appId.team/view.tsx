import { Divider } from "@mantine/core"
import { closeModal } from "@mantine/modals"
import { Box, Button, Flex, Title } from "@pokt-foundation/pocket-blocks"
import { useEffect } from "react"
import useModals from "~/hooks/useModals"
import { PortalApp, RoleNameV2, User } from "~/models/portal/sdk"
import InviteMemberFrom from "~/routes/account.$accountId.$appId.team/components/InviteMemberForm"
import TeamMembersTable from "~/routes/account.$accountId.$appId.team/components/TeamMembersTable"
import { TeamActionData } from "~/routes/account.$accountId.$appId.team/route"
import { DataStruct } from "~/types/global"

type TeamViewProps = {
  actionData: DataStruct<TeamActionData>
  app: PortalApp
  userRole: RoleNameV2
  user: User
}

const INVITE_MEMBER_MODAL_ID = "invite-member-modal"

function TeamView({ actionData, app, userRole, user }: TeamViewProps) {
  const { openFullScreenModal, modals } = useModals()
  const openInviteMemberModal = () =>
    openFullScreenModal({
      modalId: INVITE_MEMBER_MODAL_ID,
      children: <InviteMemberFrom />,
    })

  useEffect(() => {
    if (
      actionData &&
      modals.length > 0 &&
      modals.some(({ id }) => id === INVITE_MEMBER_MODAL_ID)
    ) {
      closeModal(INVITE_MEMBER_MODAL_ID)
    }
  }, [actionData, modals])

  return (
    <Box>
      <Flex align="center" justify="flex-end" my="xl">
        {userRole !== RoleNameV2.Member && (
          <Button size="md" onClick={openInviteMemberModal}>
            Invite new member
          </Button>
        )}
      </Flex>
      <Divider />
      <TeamMembersTable app={app} user={user} userRole={userRole} />
    </Box>
  )
}

export default TeamView
