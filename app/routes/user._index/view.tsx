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
          <input hidden name="type" value="password" />
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
      <Divider />
      <Stack py={20} spacing={24}>
        <Box>
          <Text fw={600}>Product updates</Text>
          <Text pt={5}>Send me Product updates.</Text>
          <Form method="post" onChange={(event) => submit(event.currentTarget)}>
            <input hidden name="type" value="check-product" />
            <Switch
              defaultChecked={Boolean(user.updatesProduct)}
              mt={8}
              name="checkbox"
              onChange={() => {
                trackEvent({
                  category: AnalyticCategories.user,
                  action: AnalyticActions.user_profile_product_updates,
                  label: user.updatesProduct ? "No" : "Yes",
                })
              }}
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
              onChange={() => {
                trackEvent({
                  category: AnalyticCategories.user,
                  action: AnalyticActions.user_profile_marketing_updates,
                  label: user.updatesMarketing ? "No" : "Yes",
                })
              }}
            />
          </Form>
        </Box>
        <Box>
          <Text fw={600}>Beta test</Text>
          <Text pt={5}>
            Join beta test program. Users who sign up will be invited to test new features
            before anyone else.
          </Text>
          <Form method="post" onChange={(event) => submit(event.currentTarget)}>
            <input hidden name="type" value="check-beta" />
            <Switch
              defaultChecked={Boolean(user.betaTester)}
              mt={8}
              name="checkbox"
              onChange={() => {
                trackEvent({
                  category: AnalyticCategories.user,
                  action: AnalyticActions.user_profile_beta_testing,
                  label: user.betaTester ? "No" : "Yes",
                })
              }}
            />
          </Form>
        </Box>
      </Stack>
    </Stack>
  )
}

export default ProfileView
