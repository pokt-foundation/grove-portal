import { Divider } from "@mantine/core"
import { Box, Button, Flex, Title } from "@pokt-foundation/pocket-blocks"
import useModals from "~/hooks/useModals"
import { PortalApp, RoleNameV2, User } from "~/models/portal/sdk"
import InviteMemberFrom from "~/routes/account.$accountId.$appId.team/components/InviteMemberForm"
import TeamMembersTable from "~/routes/account.$accountId.$appId.team/components/TeamMembersTable"

type TeamViewProps = {
  app: PortalApp
  userRole: RoleNameV2
  user: User
}

function TeamView({ app, userRole, user }: TeamViewProps) {
  const { openFullScreenModal } = useModals()
  const openInviteMemberModal = () =>
    openFullScreenModal({
      children: <InviteMemberFrom />,
    })

  return (
    <Box>
      <Flex align="center" justify="space-between" my="xl">
        <Title order={5}>Team members</Title>
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
