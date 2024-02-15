import { Divider, Box, Button, Flex } from "@mantine/core"
import { useEffect } from "react"
import useModals from "~/hooks/useModals"
import { Account, RoleName, User } from "~/models/portal/sdk"
import InviteMemberFrom from "~/routes/account.$accountId.settings.members/components/InviteMemberForm"
import TeamMembersTable from "~/routes/account.$accountId.settings.members/components/TeamMembersTable"
import { TeamActionData } from "~/routes/account.$accountId.settings.members/route"
import { DataStruct } from "~/types/global"

type TeamViewProps = {
  actionData: DataStruct<TeamActionData>
  account: Account
  userRole: RoleName
  user: User
}

function MembersView({ actionData, account, userRole, user }: TeamViewProps) {
  const { openFullScreenModal, modalsOpen, closeAll } = useModals()
  const openInviteMemberModal = () =>
    openFullScreenModal({
      children: <InviteMemberFrom accountName={account.name} />,
    })

  useEffect(() => {
    if (actionData && modalsOpen.length > 0) {
      closeAll()
    }
  }, [actionData, modalsOpen.length])

  return (
    <Box>
      <Flex align="center" justify="flex-end" my="xl">
        {userRole !== RoleName.Member && (
          <Button size="md" onClick={openInviteMemberModal}>
            Invite new member
          </Button>
        )}
      </Flex>
      <Divider />
      <TeamMembersTable account={account} user={user} userRole={userRole} />
    </Box>
  )
}

export default MembersView
