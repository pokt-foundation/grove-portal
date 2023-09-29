import { Button, CloseButton, Image, Stack, Text } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { Link, NavLink, useParams } from "@remix-run/react"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import useCommonStyles from "~/styles/commonStyles"
import { MAX_USER_APPS } from "~/utils/planUtils"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `App Creation Limit Exceeded ${seo_title_append}`,
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const { accountId } = params

  const portal = initPortalClient({ token: user.accessToken })
  invariant(accountId, "AccountId must be set")
  const getUserAccountResponse = await portal
    .getUserAccount({ accountID: accountId, accepted: true })
    .catch((e) => {
      console.log(e)
    })

  if (!getUserAccountResponse) {
    return redirect(`/org/${params.accountId}`)
  }

  const portalApps = getUserAccountResponse.getUserAccount.portalApps
  const underMaxApps = () => {
    return !portalApps || portalApps.length < MAX_USER_APPS
  }

  if (underMaxApps()) {
    return redirect(`/org/${params.accountId}`)
  }

  return null
}

export default function AppLimitExceeded() {
  const { classes: commonClasses } = useCommonStyles()
  const params = useParams()
  return (
    <Stack align="center" justify="center" mt={42}>
      <CloseButton
        aria-label="Discard"
        component={NavLink}
        ml="auto"
        size="lg"
        to="/org"
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
        to={`/org/${params.accountId}`}
        variant="outline"
        w={156}
      >
        Discard
      </Button>
    </Stack>
  )
}
