import { Card, Title, Text, Box, Grid } from "@pokt-foundation/pocket-blocks"
import { ActionFunction, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import PortalLoader from "~/components/PortalLoader"
import { authenticator } from "~/utils/auth.server"
import { seo_title_append } from "~/utils/seo"

export const meta: MetaFunction = () => {
  return {
    title: `Email Verification ${seo_title_append}`,
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)

  if (user) {
    return redirect("/account")
  }

  return null
}

export type UserEmailVerifiyActionData = { success: boolean }

export const action: ActionFunction = async ({ request }) => {
  // await requireUser(request)

  return redirect("/api/auth/auth0")
}

export default function EmailVerification() {
  return (
    <Box
      style={{
        minHeight: "100vh",
        height: "fit-content",
        backgroundImage: "url('/solarpunk-city-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "50%",
      }}
    >
      <Grid
        align="center"
        justify="center"
        style={{
          minHeight: "100vh",
          height: "fit-content",
          textAlign: "center",
        }}
      >
        <Card
          p={40}
          style={{
            color: "#141517",
            backgroundColor: "white",
            maxWidth: "400px",
          }}
        >
          <img
            alt="Grove logo"
            loading="lazy"
            src="portal_logo/grove-light.svg"
            style={{
              maxHeight: "65px",
              maxWidth: "100%",
              margin: "0 auto",
            }}
          ></img>
          <PortalLoader />
          <Title mb="md" order={3}>
            Verify Your Email
          </Title>
          <Text align="left" size="sm">
            We've sent an email with a verification link to your inbox. Once verified,
            you'll be directed to the login page to access the portal. If you don't see
            the email, please check your spam or junk folder.
          </Text>
        </Card>
      </Grid>
    </Box>
  )
}
