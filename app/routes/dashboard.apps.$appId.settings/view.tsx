import {
  Button,
  Card,
  Flex,
  Menu,
  Title,
  IconMoreVertical,
  IconKey,
  IconDeleteAlt,
  IconArrowUpRight,
  Box,
  ActionIcon,
} from "@pokt-foundation/pocket-blocks"
import { useState } from "react"
import { AppIdLoaderData } from "../dashboard.apps.$appId/route"
import AppPlanLatestInvoiceCard, {
  links as AppPlanLatestInvoiceCardLinks,
} from "../dashboard.apps.$appId.plan/components/AppPlanLatestInvoiceCard"
import DeleteAppModal, {
  links as DeleteAppModalLinks,
} from "./components/DeleteAppModal/DeleteAppModal"
import InvoicesTable from "./components/InvoicesTable/InvoicesTable"
import KeysModal, { links as KeysModalLinks } from "./components/KeysModal/KeysModal"
import { AppSettingsLoaderData } from "./route"
import AppPlanDetails, {
  links as AppPlanDetailsLinks,
} from "~/components/application/AppPlanDetails"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"

export const links = () => {
  return [
    ...AppPlanDetailsLinks(),
    ...AppPlanLatestInvoiceCardLinks(),
    ...KeysModalLinks(),
    ...DeleteAppModalLinks(),
  ]
}

interface SettingsViewProps {
  data: AppSettingsLoaderData
}

export function SettingsView({ data }: SettingsViewProps) {
  const [isKeysModalOpen, setIsKeysModalOpen] = useState(false)
  const [isRemoveAppOpened, setIsRemoveAppOpened] = useState(false)
  const appIdRoute = useMatchesRoute("routes/dashboard.apps.$appId")
  const appIdData = appIdRoute?.data as AppIdLoaderData
  const { endpoint, subscription, user } = appIdData

  if (data.error) {
    return <></>
  }

  return (
    <Card>
      <Flex justify="space-between">
        <Title order={3}>Manage your App</Title>

        <Flex align="center" gap={12}>
          <Button
            leftIcon={<IconKey width={12} />}
            sx={(theme) => ({
              color: theme.colors.gray[5],
              fontSize: "0.75rem",
            })}
            variant="subtle"
            onClick={() => setIsKeysModalOpen(true)}
          >
            View keys
          </Button>
          <Menu>
            <Menu.Target>
              <ActionIcon
                sx={(theme) => ({
                  color: theme.colors.gray[5],
                })}
                variant="subtle"
              >
                <IconMoreVertical height={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                icon={<IconDeleteAlt width={12} />}
                onClick={() => setIsRemoveAppOpened(true)}
              >
                Delete Application
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>

      <Flex align="stretch" gap="xs" justify="space-between" wrap="wrap">
        <Box sx={{ flexBasis: "45%" }}>
          <AppPlanDetails
            dailyLimit={endpoint.appLimits.dailyLimit}
            id={endpoint.id}
            name={endpoint.name}
            planType={endpoint.appLimits.planType}
            subscription={subscription}
          />
          <Button rightIcon={<IconArrowUpRight width={8} />}>Manage in Stripe</Button>
        </Box>

        <AppPlanLatestInvoiceCard
          CardProps={{
            sx: (theme) => ({
              background: theme.colors.navy[4],
            }),
          }}
          invoice={data.invoices[0]}
          relaysLatestInvoice={data.relaysInvoices[0]}
          usageRecords={data.usageRecords[0]}
        />
      </Flex>

      {data.invoices && (
        <Card
          sx={(theme) => ({
            background: theme.colors.navy[4],
            margin: "1.5rem 2rem",
          })}
        >
          <InvoicesTable
            invoices={data.invoices}
            relaysInvoices={data.relaysInvoices}
            usageRecords={data.usageRecords}
          />
        </Card>
      )}

      <DeleteAppModal
        endpointID={endpoint.id}
        isRemoveAppOpened={isRemoveAppOpened}
        setIsRemoveAppOpened={setIsRemoveAppOpened}
      />

      <KeysModal
        endpoint={endpoint}
        isKeysModalOpen={isKeysModalOpen}
        setIsKeysModalOpen={setIsKeysModalOpen}
        user={user}
      />
    </Card>
  )
}

export default SettingsView
