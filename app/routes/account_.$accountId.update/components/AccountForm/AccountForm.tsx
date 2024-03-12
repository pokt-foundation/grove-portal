import { Button, Divider, Group, Stack, TextInput } from "@mantine/core"
import { Form, NavLink, useParams } from "@remix-run/react"
import { useState } from "react"
import RouteModal from "~/components/RouteModal"
import { Account } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type AccountFormProps = {
  account: Account
  redirectTo: string | null
  onSubmit: (formData: FormData) => void
}

const AccountForm = ({ account, redirectTo, onSubmit }: AccountFormProps) => {
  const { accountId } = useParams()
  const closeButtonRedirect = redirectTo ?? `/account/${accountId}/settings`
  const [name, setName] = useState(account?.name ?? "")

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSubmit(formData)
  }

  return (
    <Stack>
      <RouteModal.Header
        closeButtonLink={closeButtonRedirect}
        description="An accurate account name helps team members identify their workspace. Ensure
          it's current and relevant by updating it here."
        title="Account Name"
      />
      <Divider mb="md" mt="xl" />
      <Form method="post" onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            required
            defaultValue={name}
            description="Required"
            fw={600}
            label="Name"
            maxLength={20}
            name="account_name"
            w="200px"
            onChange={(e) => setName(e.target.value)}
          />
        </Stack>
        <Divider my={32} />
        <Group justify="right">
          <Button
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
