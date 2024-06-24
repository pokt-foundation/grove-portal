import { Box, Button, Divider, Group, Stack, Text, TextInput } from "@mantine/core"
import { Form, NavLink, useParams } from "@remix-run/react"
import { useEffect, useMemo, useState } from "react"
import RouteModal from "~/components/RouteModal"
import { PortalApp } from "~/models/portal/sdk"
import AppmojiPicker, {
  DEFAULT_APPMOJI,
} from "~/routes/account_.$accountId.create/components/AppmojiPicker"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

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
      <RouteModal.Header
        closeButtonLink={`/account/${accountId}`}
        description="An application is a unified environment that simplifies decentralized cloud infrastructure.
        Within its seamless framework lie preconfigured networks, ready for deployment with optimal visualization and configuration."
        title={`${label} your application`}
      />
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
            <Text fw={500}>Appmoji</Text>
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
