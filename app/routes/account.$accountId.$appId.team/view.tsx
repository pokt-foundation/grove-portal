import { Divider } from "@mantine/core"
import { closeAllModals } from "@mantine/modals"
import { Box, Button, Flex, Text, Title } from "@pokt-foundation/pocket-blocks"
import { useActionData } from "@remix-run/react"
import React, { useEffect, useState } from "react"
import { ActionData } from "./route"
import NotificationMessage, { NotificationType } from "~/components/NotificationMessage"
import useModals from "~/hooks/useModals"
import { PortalApp, RoleNameV2, User } from "~/models/portal/sdk"
import InviteMemberFrom from "~/routes/account.$accountId.$appId.team/components/InviteMemberForm"
import TeamMembersTable from "~/routes/account.$accountId.$appId.team/components/TeamMembersTable"

type TeamViewProps = {
  app: PortalApp
  userRole: RoleNameV2
  user?: User
}

function TeamView({ app, userRole, user }: TeamViewProps) {
  const [notificationMessageProps, setNotificationMessageProps] =
    useState<NotificationType>({
      type: "info",
      title: "",
      description: "",
      isActive: false,
    })

  const actionData = useActionData<ActionData>()
  const { openFullScreenModal } = useModals()

  const openInviteMemberModal = () =>
    openFullScreenModal({
      children: <InviteMemberFrom endpointName={app.name} />,
    })

  useEffect(() => {
    if (actionData) {
      if (actionData.type === "delete") {
        if (actionData.error) {
          setNotificationMessageProps({
            type: "error",
            title: "Error deleting the user",
            description: "Please, try again",
            isActive: true,
          })
          // setConfirmationModalProps({ type: "error", isActive: true })
          return
        }

        setNotificationMessageProps({
          type: "success",
          isActive: true,
          title: "User removed",
          description: `We have sent a confirmation to ${actionData.email}.`,
        })
      } else if (actionData.type === "invite") {
        if (actionData.error) {
          setNotificationMessageProps({
            type: "error",
            isActive: true,
            title: "Invite error",
            description: "We had some issues with the invite. Please try again later.",
          })
          closeAllModals()
          return
        }

        setNotificationMessageProps({
          type: "success",
          isActive: true,
          title: "Invite sent",
          description: `We have sent an invitation to ${actionData.email}. You can review the invite status below.`,
        })

        closeAllModals()
      } else if (actionData.type === "updateRole") {
        if (actionData.error) {
          setNotificationMessageProps({
            type: "error",
            isActive: true,
            title: "Ownership transfer failed",
            description:
              "The user has already reached the maximum number of applications that can be owned.",
          })
          return
        }
      }
    }
  }, [actionData])

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

      {/*{state === "loading" && <Loader />}*/}
      {actionData && (
        <NotificationMessage
          withCloseButton
          isActive={notificationMessageProps.isActive}
          title={notificationMessageProps.title}
          type={notificationMessageProps.type}
          onClose={() =>
            setNotificationMessageProps({
              ...notificationMessageProps,
              isActive: false,
            })
          }
        >
          <Text color="white" size="sm">
            {notificationMessageProps.description}
          </Text>
        </NotificationMessage>
      )}

      <TeamMembersTable app={app} user={user} userRole={userRole} />
    </Box>
  )
}

export default TeamView
