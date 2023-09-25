import { Image, Stack, Title, List } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
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

export default function EmailVerification() {
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
      <Title order={1}>Action Required: Verify Your Email</Title>
      <Title order={3}>
        Welcome to Grove Portal! To get started, please verify your email:
      </Title>
      <List type="ordered">
        <List.Item>Check your inbox for a verification email from us.</List.Item>
        <List.Item>Click the verification link in the email.</List.Item>
        <List.Item>You're all set! Enjoy full access to Grove Portal.</List.Item>
      </List>
    </Stack>
  )
}
