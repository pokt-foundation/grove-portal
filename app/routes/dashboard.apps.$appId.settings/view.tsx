import { useViewportSize } from "@mantine/hooks"
import { Card, Flex, Text, Title } from "@pokt-foundation/pocket-blocks"
import { useState } from "react"
import { AppIdLoaderData } from "../dashboard.apps.$appId/route"
import AppPlanLatestInvoiceCard, {
  links as AppPlanLatestInvoiceCardLinks,
} from "../dashboard.apps.$appId.plan/components/AppPlanLatestInvoiceCard"
import AppPlanOverviewCard, {
  links as AppPlanOverviewCardStyles,
} from "../dashboard.apps.$appId.plan/components/AppPlanOverviewCard"
import DeleteAppModal, {
  links as DeleteAppModalLinks,
} from "./components/DeleteAppModal/DeleteAppModal"
import InvoicesTable from "./components/InvoicesTable/InvoicesTable"
import KeysModal, { links as KeysModalLinks } from "./components/KeysModal/KeysModal"
import SettingsHeader from "./components/SettingsHeader/SettingsHeader"
import { AppSettingsLoaderData } from "./route"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"

export const links = () => {
  return [
    ...AppPlanLatestInvoiceCardLinks(),
    ...AppPlanOverviewCardStyles(),
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
  const { width } = useViewportSize()
  const appIdRoute = useMatchesRoute("routes/dashboard.apps.$appId")
  const appIdData = appIdRoute?.data as AppIdLoaderData
  const { endpoint, subscription, user } = appIdData

  if (data.error) {
    return <></>
  }

  const invoicesNotEmpty = data.invoices && data.invoices.length > 0
  const relaysNotEmpty = data.relaysInvoices && data.relaysInvoices.length > 0

  return (
    <Card sx={{ "&.mantine-Paper-root.mantine-Card-root": { padding: "2rem" } }}>
      <SettingsHeader
        setIsKeysModalOpen={setIsKeysModalOpen}
        setIsRemoveAppOpened={setIsRemoveAppOpened}
      />

      <Flex align="stretch" gap="xs" justify="space-between" mb="xl" wrap="wrap">
        {subscription && (
          <AppPlanOverviewCard
            CardProps={{
              sx: (theme) => ({
                background: theme.colors.navy[4],
                minWidth:
                  width <= theme.breakpoints.lg || !invoicesNotEmpty ? "100%" : "45%",
              }),
            }}
            endpoint={endpoint}
            subscription={subscription}
            user={user}
          />
        )}
        {invoicesNotEmpty && relaysNotEmpty && data.usageRecords && (
          <AppPlanLatestInvoiceCard
            CardProps={{
              sx: (theme) => ({
                background: theme.colors.navy[4],
                minWidth: width <= theme.breakpoints.lg ? "100%" : "45%",
              }),
            }}
            invoice={data.invoices[0]}
            relaysLatestInvoice={data.relaysInvoices[0]}
            usageRecords={data.usageRecords[0]}
          />
        )}
      </Flex>

      {data.invoices && (
        <Card
          sx={(theme) => ({
            background: theme.colors.navy[4],
          })}
        >
          <InvoicesTable
            emptyComponent={
              !invoicesNotEmpty ? (
                <Flex align="center" direction="column">
                  <Title order={3}>No data to display</Title>
                  <Text>Your invoices will be displayed here.</Text>
                </Flex>
              ) : undefined
            }
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
