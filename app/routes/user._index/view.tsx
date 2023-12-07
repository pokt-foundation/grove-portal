import { Divider } from "@mantine/core"
import { Box, Button, Stack, Switch, Text } from "@pokt-foundation/pocket-blocks"
import { Form, useSubmit } from "@remix-run/react"
import { Identicon } from "~/components/Identicon"
import { User } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type ProfileViewProps = {
  user: User
}

export const ProfileView = ({ user }: ProfileViewProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const submit = useSubmit()

  return (
    <Stack spacing="xs">
      <Box py={20}>
        <Identicon
          avatar
          alt={`${user.portalUserID ?? "user"} profile picture`}
          seed={user.portalUserID ?? "user default"}
          size="lg"
          type="user"
        />
        <Text fw={600} mt="xl">
          Avatar
        </Text>
        <Text pt={5}>
          This is a unique profile image generated based on your unique user ID.{" "}
        </Text>
      </Box>
      <Divider />
      <Stack py={20}>
        <Box>
          <Text fw={600}>Password</Text>
          <Text pt={5}>
            To change your password, you will receive an email from Auth0.
          </Text>
        </Box>
        <Form method="post">
          <Button
            className={commonClasses.grayOutline}
            color="gray"
            name="email"
            type="submit"
            value={user.email}
            variant="outline"
            onClick={() => {
              trackEvent({
                category: AnalyticCategories.user,
                action: AnalyticActions.user_profile_change_password,
              })
            }}
          >
            Change password
          </Button>
        </Form>
      </Stack>
    </Stack>
  )
}

export default ProfileView
