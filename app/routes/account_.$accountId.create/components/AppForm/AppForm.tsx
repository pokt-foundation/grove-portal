import { Divider } from "@mantine/core"
import {
  Box,
  Button,
  CloseButton,
  createStyles,
  Group,
  Flex,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@pokt-foundation/pocket-blocks"
import { Form, NavLink, useParams } from "@remix-run/react"
import { useEffect, useMemo, useState } from "react"
import { PortalApp } from "~/models/portal/sdk"
import AppmojiPicker, {
  DEFAULT_APPMOJI,
} from "~/routes/account_.$accountId.create/components/AppmojiPicker"
import useCommonStyles from "~/styles/commonStyles"

const useStyles = createStyles((theme) => ({
  inputLabel: {
    fontWeight: 600,
  },
}))

type AppFormProps = {
  app?: PortalApp
  onSubmit: (formData: FormData) => void
}

const AppForm = ({ app, onSubmit }: AppFormProps) => {
  const { classes } = useStyles()
  const { classes: commonClasses } = useCommonStyles()
  const { accountId } = useParams()

  const [name, setName] = useState(app?.name ?? "")
  const [referral, setReferral] = useState("")
  const [appmoji, setAppmoji] = useState(DEFAULT_APPMOJI)

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
        <Flex align="center" justify="space-between" my="32px">
          <Text fw={600} fz="21px">
            {label} a new application
          </Text>
          <Tooltip withArrow label="Discard" position="bottom">
            <CloseButton
              aria-label="Discard"
              component={NavLink}
              size="lg"
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
        <Stack spacing="md">
          <input hidden name="referral-id" type="text" value={referral} />
          <TextInput
            required
            classNames={{ label: classes.inputLabel }}
            defaultValue={app?.name}
            description="Required"
            label="Name"
            maxLength={40}
            name="app-name"
            w="200px"
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            classNames={{ label: classes.inputLabel }}
            defaultValue={app?.description}
            description="Optional, but it can be helpful to offer additional context about your application."
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
        <Group position="right">
          <Button
            classNames={{ root: commonClasses.grayOutlinedButton }}
            color="gray"
            component={NavLink}
            fw={400}
            fz="sm"
            to={`/account/${accountId}`}
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
            // onClick={(event) => {
            //   // trackEvent(AmplitudeEvents.EndpointCreation)
            // }}
          >
            {label} Application
          </Button>
        </Group>
      </Form>
    </Stack>
  )
}

export default AppForm
