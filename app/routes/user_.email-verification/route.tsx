import { ActionFunction } from ".pnpm/react-router@6.11.0_react@18.2.0/node_modules/react-router"
import { Image, Stack, Title, List, Button } from "@pokt-foundation/pocket-blocks"
import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { Form } from "@remix-run/react"
import useCommonStyles from "~/styles/commonStyles"
import { authenticator } from "~/utils/auth.server"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { LoaderDataStruct } from "~/utils/loader"
import { seo_title_append } from "~/utils/meta"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Email Verification ${seo_title_append}`,
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)

  if (user.user.email_verified) {
    return redirect("/user/profile")
  }

  return null
}

export type UserEmailVerifiyActionData = { success: boolean }

export const action: ActionFunction = async ({ request }) => {
  // await requireUser(request)

  return redirect("/api/auth/auth0")
}

export default function EmailVerification() {
  const { classes: commonClasses } = useCommonStyles()

  return (
    <Stack align="center" justify="center" mt={42}>
      <Image
        withPlaceholder
        alt="Empty overview placeholder"
        height={216}
        mt={40}
        src="/app-limit-exceeded.svg"
        width={270}
      />
      <Title order={1}>Welcome to Grove Portal!</Title>
      <Title order={3}>To get started, please verify your email:</Title>
      <List type="ordered">
        <List.Item>Check your inbox for a verification email from us.</List.Item>
        <List.Item>Click the verification link in the email.</List.Item>
        <List.Item>You're all set! Enjoy full access to Grove Portal.</List.Item>
      </List>
      <Form method="post">
        <Button
          className={commonClasses.grayOutlinedButton}
          color="gray"
          name="type"
          type="submit"
          value="resend_email"
          variant="outline"
        >
          Login
        </Button>
      </Form>
    </Stack>
  )
}
