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
import ModalHeader from "~/components/ModalHeader"
import PortalLoader from "~/components/PortalLoader"
import { RoleName } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"

const InviteMemberFrom = () => {
  const { state } = useNavigation()
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
          <Form action={`/org/${accountId}/${appId}/team`} method="post">
            <Stack spacing="md">
              <TextInput
                required
                description="Required"
                label="Email address"
                name="user_email"
                placeholder="new@server.com"
                type="email"
                w="300px"
              />
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
                  name="user_role"
                />
              </Flex>
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
                fw={400}
                fz="sm"
                name="user_invite"
                px="xs"
                type="submit"
                value="true"
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
