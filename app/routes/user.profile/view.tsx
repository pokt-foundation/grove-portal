import { Divider } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { Box, Button, Stack, Switch, Text } from "@pokt-foundation/pocket-blocks"
import { Form, useSubmit } from "@remix-run/react"
import { useEffect } from "react"
import { ActionPassword } from "./utils/actionPassword"
import { ActionUser } from "./utils/actionUser"
import { Identicon } from "~/components/Identicon"
import { User } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"
import { LoaderDataStruct } from "~/utils/loader"

export const SUCCESSFUL_CHANGE_PASSWORD_MSG =
  "We've just sent you an email to reset your password."

type ProfileViewProps = {
  user: User
  actionData?: LoaderDataStruct<ActionUser | ActionPassword>
}

export const ProfileView = ({ user, actionData }: ProfileViewProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const submit = useSubmit()

  useEffect(() => {
    if (!actionData) return

    if (!actionData.error && (actionData.data as ActionPassword).auth0 === 200) {
      showNotification({
        message: SUCCESSFUL_CHANGE_PASSWORD_MSG,
      })
    }
    if (!actionData.error && (actionData.data as ActionUser).user) {
      showNotification({
        message: "User profile updated",
      })
    }
    if (actionData.error) {
      showNotification({
        message: actionData.message,
      })
    }
  }, [actionData])

  return (
    <Stack spacing="xs">
      <Box px={40} py={20}>
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
      <Stack px={40} py={20}>
        <Box>
          <Text fw={600}>Password</Text>
          <Text pt={5}>
            To change your password, you will receive an email from Auth0.
          </Text>
        </Box>
        <Form method="post">
          <input hidden name="type" value="password" />
          <Button
            className={commonClasses.grayOutlinedButton}
            color="gray"
            name="email"
            type="submit"
            value={user.email}
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
          <Form method="post" onChange={(event) => submit(event.currentTarget)}>
            <input hidden name="type" value="check-product" />
            <Switch
              defaultChecked={Boolean(user.updatesProduct)}
              mt={8}
              name="checkbox"
            />
          </Form>
        </Box>
        <Box>
          <Text fw={600}>Community updates</Text>
          <Text pt={5}>Send me Community updates.</Text>
          <Form method="post" onChange={(event) => submit(event.currentTarget)}>
            <input hidden name="type" value="check-marketing" />
            <Switch
              defaultChecked={Boolean(user.updatesMarketing)}
              mt={8}
              name="checkbox"
            />
          </Form>
        </Box>
        <Box>
          <Text fw={600}>Beta test</Text>
          <Text pt={5}>Join beta test program.</Text>
          <Form method="post" onChange={(event) => submit(event.currentTarget)}>
            <input hidden name="type" value="check-beta" />
            <Switch defaultChecked={Boolean(user.betaTester)} mt={8} name="checkbox" />
          </Form>
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
