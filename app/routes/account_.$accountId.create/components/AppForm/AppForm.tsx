import {
  Divider,
  Box,
  Button,
  CloseButton,
  Group,
  Flex,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core"
import { Form, NavLink, useParams } from "@remix-run/react"
import { useEffect, useMemo, useState } from "react"
import { PortalApp } from "~/models/portal/sdk"
import AppmojiPicker, {
  DEFAULT_APPMOJI,
} from "~/routes/account_.$accountId.create/components/AppmojiPicker"
import { trackEvent, AnalyticCategories, AnalyticActions } from "~/utils/analytics"

type AppFormProps = {
  app?: PortalApp
  onSubmit: (formData: FormData) => void
}

const AppForm = ({ app, onSubmit }: AppFormProps) => {
  const { accountId, appId } = useParams()

  const [name, setName] = useState(app?.name ?? "")
  const [referral, setReferral] = useState("")
  const [appmoji, setAppmoji] = useState(app?.appEmoji ?? DEFAULT_APPMOJI)

  useEffect(() => {
    const rid = window.localStorage.getItem("rid")

    if (rid) {
      setReferral(rid)
    }
  }, [])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSubmit(formData)
  }

  const label = useMemo(() => {
    return app ? "Update" : "Create"
  }, [app])

  return (
    <Stack>
      <Box>
        <Flex align="center" justify="space-between">
          <Text fw={600} fz="21px">
            {label} your application
          </Text>
          <Tooltip withArrow label="Discard">
            <CloseButton
              aria-label="Discard"
              component={NavLink}
              to={`/account/${accountId}`}
            />
          </Tooltip>
        </Flex>
        <Text>
          An 'application' is a unique bridge connecting your project to the decentralized
          world. It represents the configuration set for accessing various blockchains,
          tailoring to the specific needs of your project.
        </Text>
      </Box>
      <Divider mb="md" mt="xl" />
      <Form method="post" onSubmit={handleSubmit}>
        <Stack gap="md">
          <input hidden name="referral-id" type="text" value={referral} />
          <TextInput
            required
            defaultValue={app?.name}
            description="Required"
            fw={600}
            label="Name"
            maxLength={40}
            name="app-name"
            w="200px"
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            defaultValue={app?.description}
            description="Optional, but it can be helpful to offer additional context about your application."
            fw={600}
            label="Description"
            name="app-description"
          />
          <Box>
            <Text fw={600}>Appmoji</Text>
            <Text fz="xs" mb="sm">
              Select an emoji icon for your application - a personal touch for quick
              recognition in the dashboard, particularly in a collapsed side panel view.
            </Text>
            <input hidden name="app-emoji" type="text" value={appmoji} />
            <AppmojiPicker
              defaultValue={app?.appEmoji}
              onAppmojiSelect={(appmoji) => setAppmoji(appmoji)}
            />
          </Box>
        </Stack>
        <Divider my={32} />
        <Group justify="right">
          <Button
            color="gray"
            component={NavLink}
            fw={400}
            fz="sm"
            to={`/account/${accountId}${appId ? `/${appId}` : ""}`}
            type="button"
            variant="outline"
            w="156px"
          >
            Discard
          </Button>
          <Button
            disabled={name === ""}
            fw={400}
            fz="sm"
            px="xs"
            type="submit"
            w="156px"
            onClick={() => {
              trackEvent({
                category: AnalyticCategories.app,
                action: app ? AnalyticActions.app_update : AnalyticActions.app_create,
                label: `${label} ${app?.id}`,
              })
            }}
          >
            {label} Application
          </Button>
        </Group>
      </Form>
    </Stack>
  )
}

export default AppForm
