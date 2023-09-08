import { Button, CloseButton, Image, Stack, Text } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { Link, NavLink } from "@remix-run/react"
import { initPortalClient } from "~/models/portal/portal.server"
import useCommonStyles from "~/styles/commonStyles"
import { MAX_USER_APPS } from "~/utils/pocketUtils"
import { requireUser } from "~/utils/session.server"

export const meta: MetaFunction = () => {
  return {
    title: "App Limit Exceeded",
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)

  const portal = initPortalClient({ token: user.accessToken })
  const endpointsResponse = await portal.endpoints().catch((e) => {
    console.log(e)
  })

  const underMaxApps = () => {
    return !endpointsResponse || endpointsResponse.owner.length < MAX_USER_APPS
  }

  if (underMaxApps()) {
    return redirect("/account")
  }

  return null
}

export default function AppLimitExceeded() {
  const { classes: commonClasses } = useCommonStyles()
  return (
    <Stack align="center" justify="center" mt={42}>
      <CloseButton
        aria-label="Discard"
        component={NavLink}
        ml="auto"
        size="lg"
        to="/account"
      />
      <Image
        withPlaceholder
        alt="Empty overview placeholder"
        height={216}
        mt={40}
        src="/app-limit-exceeded.svg"
        width={270}
      />
      <Text fw={600} fz="xl">
        Currently you are only able to create two applications.
      </Text>
      <Text fw={400} fz="sm" ta="center">
        At the moment, we're limiting users to two applications as we're gearing up for a
        major release <br />
        that will bring exciting new features and improvements.
      </Text>
      <Button
        className={commonClasses.grayOutlinedButton}
        color="gray"
        component={Link}
        mt="xs"
        prefetch="intent"
        size="lg"
        to={`/account`}
        variant="outline"
        w={156}
      >
        Discard
      </Button>
    </Stack>
  )
}
