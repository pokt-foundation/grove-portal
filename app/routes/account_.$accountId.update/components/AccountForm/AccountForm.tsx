import {
  Divider,
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
} from "@mantine/core"
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

type AccountFormProps = {
  account: Account
  redirectTo: string | null
}

const AccountForm = ({ account, redirectTo }: AccountFormProps) => {
  const { classes } = useStyles()
  const { classes: commonClasses } = useCommonStyles()
  const { accountId } = useParams()
  const closeButtonRedirect = redirectTo ?? `/account/${accountId}/settings`
  const [name, setName] = useState(account?.name ?? "")

  return (
    <Stack>
      <Box>
        <Flex align="center" justify="space-between" my="32px">
          <Text fw={600} fz="21px">
            Account Name
          </Text>
          <Tooltip withArrow label="Discard">
            <CloseButton
              aria-label="Discard"
              component={NavLink}
              to={closeButtonRedirect}
            />
          </Tooltip>
        </Flex>
        <Text>
          An accurate account name helps team members identify their workspace. Ensure
          it's current and relevant by updating it here.
        </Text>
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
            maxLength={20}
            name="account_name"
            w="200px"
            onChange={(e) => setName(e.target.value)}
          />
        </Stack>
        <Divider my={32} />
        <Group position="right">
          <Button
            classNames={{ root: commonClasses.grayOutline }}
            color="gray"
            component={NavLink}
            fw={400}
            fz="sm"
            to={closeButtonRedirect}
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
                action: AnalyticActions.account_update,
                label: account.id,
              })
            }}
          >
            Update
          </Button>
        </Group>
      </Form>
    </Stack>
  )
}

export default AccountForm
