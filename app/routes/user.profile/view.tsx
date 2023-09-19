import { Divider } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { Box, Button, Stack, Switch, Text } from "@pokt-foundation/pocket-blocks"
import { Form } from "@remix-run/react"
import { useEffect } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import { Identicon } from "~/components/Identicon"
import useCommonStyles from "~/styles/commonStyles"

export const SUCCESSFUL_CHANGE_PASSWORD_MSG =
  "We've just sent you an email to reset your password."

type ProfileViewProps = {
  profile: Auth0Profile
  actionData?: string
}

export const ProfileView = ({ profile, actionData }: ProfileViewProps) => {
  const { email } = profile._json || { nickname: "", email: "" }
  const { classes: commonClasses } = useCommonStyles()

  useEffect(() => {
    if (actionData === SUCCESSFUL_CHANGE_PASSWORD_MSG) {
      showNotification({
        message: SUCCESSFUL_CHANGE_PASSWORD_MSG,
      })
    }
  }, [actionData])

  return (
    <Stack spacing="xs">
      <Box px={40} py={20}>
        <Identicon
          avatar
          alt={`${profile.displayName ?? "user"} profile picture`}
          seed={profile.id ?? "user default"}
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
      <Stack px={40} py={20}>
        <Box>
          <Text fw={600}>Password</Text>
          <Text pt={5}>
            To change your password, you will receive an email from Auth0.
          </Text>
        </Box>
        <Form method="post">
          <Button
            className={commonClasses.grayOutlinedButton}
            color="gray"
            name="email"
            type="submit"
            value={email}
            variant="outline"
          >
            Change password
          </Button>
        </Form>
      </Stack>
      <Divider />
      <Stack px={40} py={20} spacing={24}>
        <Box>
          <Text fw={600}>Product updates</Text>
          <Text pt={5}>Send me Product updates.</Text>
          <Switch mt={8} />
        </Box>
        <Box>
          <Text fw={600}>Community updates</Text>
          <Text pt={5}>Send me Community updates.</Text>
          <Switch mt={8} />
        </Box>
        <Box>
          <Text fw={600}>Beta test</Text>
          <Text pt={5}>Join beta test program.</Text>
          <Switch mt={8} />
        </Box>
      </Stack>

      {/*<Divider />*/}
      {/*<Stack px={40} py={20}>*/}
      {/*  <Box>*/}
      {/*    <Text fw={600}>Delete my account</Text>*/}
      {/*    <Text pt={5}>By deleting your account, all apps you own will be removed.</Text>*/}
      {/*  </Box>*/}
      {/*  <Form method="post">*/}
      {/*  <Button color="gray" name="email" type="submit" value={email} variant="outline">*/}
      {/*    Delete account*/}
      {/*  </Button>*/}
      {/*  </Form>*/}
      {/*</Stack>*/}
    </Stack>
  )
}

export default ProfileView
