import {
  Divider,
  TextInput,
  Button,
  Container,
  Stack,
  Select,
  Flex,
  Group,
  LoadingOverlay,
} from "@mantine/core"
import { Form, useNavigation, useParams } from "@remix-run/react"
import { useEffect, useState } from "react"
import ModalHeader from "~/components/ModalHeader"
import PortalLoader from "~/components/PortalLoader"
import useModals from "~/hooks/useModals"
import { Maybe, RoleName } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type InviteMemberFromProps = {
  accountName: Maybe<string> | undefined
}

const InviteMemberFrom = ({ accountName }: InviteMemberFromProps) => {
  const { state } = useNavigation()
  const { classes: commonClasses } = useCommonStyles()
  const { accountId } = useParams()
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const { closeAllModals } = useModals()

  useEffect(() => {
    if (state === "submitting") {
      setIsFormSubmitted(true)
    }

    if (isFormSubmitted && state === "idle") {
      closeAllModals()
    }
  }, [isFormSubmitted, closeAllModals, state])

  return (
    <>
      {state === "idle" ? (
        <Container>
          <ModalHeader
            subtitle="A member is a unique user who can access to your accounts’s apps. "
            title="Invite member"
            onDiscard={closeAllModals}
          />
          <Form action={`/account/${accountId}/settings/members`} method="post">
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
              <input hidden readOnly name="account_name" value={accountName as string} />
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
                classNames={{ root: commonClasses.grayOutline }}
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
                onClick={() => {
                  trackEvent({
                    category: AnalyticCategories.account,
                    action: AnalyticActions.account_team_invite,
                    label: accountId,
                  })
                }}
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
