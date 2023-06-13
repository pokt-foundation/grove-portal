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
  Modal,
  ActionIcon,
} from "@pokt-foundation/pocket-blocks"
import { useState } from "react"
import KeysCard from "../dashboard.apps.$appId/components/KeysCard"
import { AppIdLoaderData } from "../dashboard.apps.$appId/route"
import InvoicesTable from "./components/InvoicesTable/InvoicesTable"
import { AppSettingsLoaderData } from "./route"
import AppPlanDetails, {
  links as AppPlanDetailsLinks,
} from "~/components/application/AppPlanDetails"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { RoleName } from "~/models/portal/sdk"

export const links = () => {
  return [...AppPlanDetailsLinks()]
}

interface SettingsViewProps {
  data: AppSettingsLoaderData
}

export function SettingsView({ data }: SettingsViewProps) {
  const [isKeysModalOpen, setIsKeysModalOpen] = useState(false)
  const appIdRoute = useMatchesRoute("routes/dashboard.apps.$appId")
  const appIdData = appIdRoute?.data as AppIdLoaderData
  const { endpoint, subscription, user } = appIdData
  const role = endpoint?.users.find((u) => u.email === user._json?.email)?.roleName
  const isMember = role === RoleName.Member

  console.log("data: ", data)

  return (
    <Card>
      <Flex justify="space-between">
        <Title order={3}>Manage your App</Title>

        <Flex gap={12}>
          <Button
            leftIcon={<IconKey width={12} />}
            sx={(theme) => ({
              color: theme.colors.gray[5],
              // 12 px
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
              <Menu.Item icon={<IconDeleteAlt width={12} />}>
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

        <Card
          sx={(theme) => ({
            flexBasis: "45%",
            background: theme.colors.navy[4],
          })}
        >
          <Title order={3}>Current period</Title>
          <Button variant="outline">View Relay Data</Button>
        </Card>
      </Flex>
      {data.invoices && (
        <Card
          sx={(theme) => ({
            background: theme.colors.navy[4],
          })}
        >
          <InvoicesTable invoices={data.invoices} />
        </Card>
      )}

      <Modal opened={isKeysModalOpen} onClose={() => setIsKeysModalOpen(false)}>
        <KeysCard
          id={endpoint.id}
          isMember={isMember}
          publicKey={endpoint.apps ? endpoint.apps[0]?.publicKey : ""}
          secret={endpoint.gatewaySettings.secretKey}
        />
      </Modal>
    </Card>
  )
}

export default SettingsView
