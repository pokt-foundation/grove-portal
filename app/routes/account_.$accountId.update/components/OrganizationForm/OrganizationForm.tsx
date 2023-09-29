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
import { useState } from "react"
import { Account } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"
import { trackEvent, AnalyticCategories, AnalyticActions } from "~/utils/analytics"

const useStyles = createStyles((theme) => ({
  inputLabel: {
    fontWeight: 600,
  },
}))

type OrganizationFormProps = {
  account: Account
}

const OrganizationForm = ({ account }: OrganizationFormProps) => {
  const { classes } = useStyles()
  const { classes: commonClasses } = useCommonStyles()
  const { accountId } = useParams()

  const [name, setName] = useState(account?.name ?? "")

  return (
    <Stack>
      <Box>
        <Flex align="center" justify="space-between" my="32px">
          <Text fw={600} fz="21px">
            Update your organization
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
        <Text>An 'organization' ...</Text>
      </Box>
      <Divider mb="md" mt="xl" />
      <Form method="post">
        <Stack spacing="md">
          <TextInput
            required
            classNames={{ label: classes.inputLabel }}
            defaultValue={name}
            description="Required"
            label="Name"
            maxLength={40}
            name="account_name"
            w="200px"
            onChange={(e) => setName(e.target.value)}
          />
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
            onClick={() => {
              trackEvent({
                category: AnalyticCategories.app,
                action: AnalyticActions.org_update,
                label: account.id,
              })
            }}
          >
            Update Organization
          </Button>
        </Group>
      </Form>
    </Stack>
  )
}

export default OrganizationForm
