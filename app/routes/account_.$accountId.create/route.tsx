// TODO: Import from pocket-blocks once export is fixed
import { Divider } from "@mantine/core"
import {
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  CloseButton,
  Box,
  createStyles,
  ActionIcon,
  Menu,
  Tooltip,
  Card,
} from "@pokt-foundation/pocket-blocks"
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { Form, useActionData, useNavigation, NavLink } from "@remix-run/react"
import EmojiPicker, { Emoji } from "emoji-picker-react"
import { Theme } from "emoji-picker-react/src/types/exposedTypes"
import { useEffect, useState } from "react"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { PayPlanType } from "~/models/portal/sdk"
import { Stripe, stripe } from "~/models/stripe/stripe.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredClientEnvVar, getRequiredServerEnvVar } from "~/utils/environment"
import { MAX_USER_APPS } from "~/utils/pocketUtils"
import { getUserPermissions, requireUser, Permissions } from "~/utils/session.server"

export const meta: MetaFunction = () => {
  return {
    title: "Create New Application",
  }
}

type LoaderData = {
  price: Stripe.Price | void
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)

  const portal = initPortalClient({ token: user.accessToken })
  const endpointsResponse = await portal.endpoints().catch((e) => {
    console.log(e)
  })

  const permissions = getUserPermissions(user.accessToken)
  const underMaxApps = () => {
    if (!endpointsResponse || endpointsResponse.owner.length < MAX_USER_APPS) {
      return true
    }

    return false
  }

  const userCanCreateApp =
    permissions.includes(Permissions.AppsUnlimited) ||
    (user.profile.id &&
      getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(user.profile.id)) ||
    underMaxApps()

  if (!userCanCreateApp) {
    return redirect("/account")
  }

  const priceID = getRequiredServerEnvVar("STRIPE_PRICE_ID")
  const price = await stripe.prices.retrieve(priceID).catch((error) => {
    console.log(error)
  })

  return json<LoaderData>(
    {
      price: price,
    },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

type ActionData = {
  error: true
  message: string
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const formData = await request.formData()
  const subscription = formData.get("app-subscription")
  const name = formData.get("app-name")
  const { accountId } = params

  invariant(
    subscription && typeof subscription === "string",
    "app subscription not found",
  )
  invariant(name && typeof name === "string", "app name not found")

  try {
    const { createNewEndpoint } = await portal.createEndpoint({
      name,
    })

    if (!createNewEndpoint) {
      throw new Error("portal api could not create new endpoint")
    }

    if (subscription === PayPlanType.PayAsYouGoV0) {
      formData.append("app-id", createNewEndpoint.id)

      // setting to any because of a TS known error: https://github.com/microsoft/TypeScript/issues/19806
      const params = new URLSearchParams(formData as any).toString()
      return redirect(`/api/stripe/checkout-session?${params}`)
    }

    return redirect(`/account/${accountId}/${createNewEndpoint.id}`)
  } catch (error) {
    return json({
      error: true,
      message: getErrorMessage(error),
    })
  }
}

const useStyles = createStyles((theme) => ({
  label: {
    fontWeight: 600,
  },
  appmojiMenuDropdown: {
    minWidth: "350px",
    maxWidth: "350px",
    maxHeight: "600px",
    overflow: "auto",
    padding: 0,
  },
}))

export default function CreateApp() {
  const { classes } = useStyles()
  const navigation = useNavigation()
  const action = useActionData() as ActionData
  const [name, setName] = useState("")
  const [showAppmojiPicker, setShowAppmojiPicker] = useState(false)
  const [showAppmojiPickerMenu, setShowAppmojiPickerMenu] = useState(false)
  const [referral, setReferral] = useState("")
  const [selectedAppmoji, setSelectedAppmoji] = useState("1f9e9")

  useEffect(() => {
    const rid = window.localStorage.getItem("rid")

    if (rid) {
      setReferral(rid)
    }
  }, [])

  const handleShowAppmojiPicker = () => {
    setShowAppmojiPickerMenu(!showAppmojiPickerMenu)
    setTimeout(() => setShowAppmojiPicker(!showAppmojiPicker), 0)
  }

  return (
    <Box maw={860} mx="auto">
      <Stack>
        <Box>
          <Group mb="xl" position="apart">
            <Text fw={600} fz="xl">
              Create a new application
            </Text>
            <Tooltip withArrow label="Discard" position="bottom">
              <CloseButton
                aria-label="Discard"
                component={NavLink}
                size="lg"
                to="/account"
              />
            </Tooltip>
          </Group>
          <Text>
            An 'application' is a unique bridge connecting your project to the
            decentralized world. It represents the configuration set for accessing various
            blockchains, tailoring to the specific needs of your project.
          </Text>
        </Box>
        <Divider my="xl" />
        <Form method="post">
          <input hidden name="referral-id" type="text" value={referral} />
          <TextInput
            required
            classNames={{ label: classes.label }}
            description="Required"
            label="Name"
            mb="lg"
            name="app-name"
            rightSection={
              name.length > 0 && (
                <CloseButton aria-label="Clear text" onClick={() => setName("")} />
              )
            }
            value={name}
            w="200px"
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            classNames={{ label: classes.label }}
            description="Optional, but it can be helpful to offer additional context about your application."
            label="Description"
            name="app-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Divider my="xl" />
          <Text fw={600}>Appmoji</Text>
          <Text fz="xs" mb="sm">
            Select an emoji icon for your application - a personal touch for quick
            recognition in the dashboard, particularly in a collapsed side panel view.
          </Text>
          <Menu
            withArrow
            classNames={{ dropdown: classes.appmojiMenuDropdown }}
            openDelay={500}
            opened={showAppmojiPickerMenu}
            position="top"
            shadow="md"
            width={400}
            onChange={handleShowAppmojiPicker}
          >
            <Menu.Target>
              <ActionIcon size="lg" variant="outline">
                <Emoji size={14} unified={selectedAppmoji} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {showAppmojiPicker && (
                <EmojiPicker
                  theme={Theme.DARK}
                  onEmojiClick={({ unified }) => {
                    setSelectedAppmoji(unified)
                    setShowAppmojiPickerMenu(false)
                    setShowAppmojiPicker(false)
                  }}
                />
              )}
            </Menu.Dropdown>
          </Menu>
          <Divider my="xl" />
          <Group position="right">
            <Button
              color="gray"
              component={NavLink}
              disabled={navigation.state === "submitting"}
              fw={400}
              fz="sm"
              to="/account"
              type="button"
              variant="outline"
              w="156px"
            >
              Discard
            </Button>
            <Button
              color="gray"
              disabled={navigation.state === "submitting" || name === ""}
              fw={400}
              fz="sm"
              px="xs"
              type="submit"
              variant="outline"
              w="156px"
              onClick={() => {
                trackEvent(AmplitudeEvents.EndpointCreation)
              }}
            >
              Create Application
            </Button>
          </Group>
        </Form>
      </Stack>

      {action && (
        <Card>
          <p>{action.message}</p>
        </Card>
      )}
    </Box>
  )
}
