import { Divider } from "@mantine/core"
import { closeAllModals } from "@mantine/modals"
import {
  TextInput,
  Button,
  Container,
  Stack,
  Select,
  Flex,
  Group,
  LoadingOverlay,
} from "@pokt-foundation/pocket-blocks"
import { Form, useNavigation, useParams } from "@remix-run/react"
import React, { useState } from "react"
import ModalHeader from "~/components/ModalHeader"
import PortalLoader from "~/components/PortalLoader"
import { RoleName } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"

type InviteMemberFromProps = {
  endpointName: string
}

const InviteMemberFrom = ({ endpointName }: InviteMemberFromProps) => {
  const { state } = useNavigation()

  const [inviteEmail, setInviteEmail] = useState("")
  const [selectedRle, setSelectedRole] = useState(RoleName.Member)
  const { classes: commonClasses } = useCommonStyles()
  const { appId, accountId } = useParams()

  return (
    <>
      {state === "idle" ? (
        <Container>
          <ModalHeader
            subtitle="A member is a unique user who can access to your organization’s apps. "
            title="Invite member"
            onDiscard={closeAllModals}
          />
          <Form action={`/account/${accountId}/${appId}/team`} method="post">
            <Stack spacing="md">
              <TextInput
                required
                description="Required"
                label="Email address"
                name="email-address"
                placeholder="new@server.com"
                type="email"
                value={inviteEmail}
                w="300px"
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <input hidden readOnly name="app-name" value={endpointName} />
              <Flex>
                <Select
                  required
                  data={[
                    {
                      value: RoleName.Member,
                      label: "Member",
                    },
                    {
                      value: RoleName.Admin,
                      label: "Admin",
                    },
                  ]}
                  description="Required"
                  label="Role"
                  value={selectedRle}
                  onChange={(value) => setSelectedRole(value as RoleName)}
                />
              </Flex>
              <input hidden readOnly name="app-subscription" value={selectedRle} />
            </Stack>
            <Divider my={32} />
            <Group position="right">
              <Button
                classNames={{ root: commonClasses.grayOutlinedButton }}
                color="gray"
                fw={400}
                fz="sm"
                type="button"
                variant="outline"
                w="156px"
                onClick={() => closeAllModals()}
              >
                Discard
              </Button>
              <Button
                disabled={inviteEmail === ""}
                fw={400}
                fz="sm"
                name="type"
                px="xs"
                type="submit"
                value="invite"
                w="156px"
              >
                Invite
              </Button>
            </Group>
          </Form>
        </Container>
      ) : (
        <LoadingOverlay visible loader={<PortalLoader message="Sending invite..." />} />
      )}
    </>
  )
}

export default InviteMemberFrom
