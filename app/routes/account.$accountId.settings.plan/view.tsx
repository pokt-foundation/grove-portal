import { Alert, Box, Button, MantineTheme, Stack } from "@pokt-foundation/pocket-blocks"
import { LuAlertCircle, LuRepeat } from "react-icons/lu"
import AutoScalePlanLatestInvoiceCard from "./components/AutoScalePlanLatestInvoiceCard"
import AutoScalePlanOverviewCard from "./components/AutoScalePlanOverviewCard"
import EnterpriseAccountOverviewCard from "./components/EnterpriseAccountOverviewCard"
import StarterAccountPlan from "./components/StarterAccountPlan"
import { AccountPlanLoaderData } from "./route"
import { PayPlanType, RoleName } from "~/models/portal/sdk"
import useSubscriptionModals from "~/routes/account.$accountId.settings.plan/hooks/useSubscriptionModals"

export type AccountPlanViewProps = AccountPlanLoaderData & { userRole: RoleName }

export const AccountPlanView = ({
  account,
  latestInvoice,
  accountAppsRelays,
  subscription,
  usageRecords,
  userRole,
}: AccountPlanViewProps) => {
  const { openRenewSubscriptionModal } = useSubscriptionModals()

  return (
    <Box py={20}>
      {account.planType === PayPlanType.FreetierV0 && (
        <>
          {account.integrations?.stripeSubscriptionID && (
            <Alert
              color="yellow"
              icon={<LuAlertCircle size={18} />}
              mb="xl"
              radius={8}
              sx={(theme: MantineTheme) => ({
                backgroundColor: theme.colors.dark,
                borderColor: theme.colors.dark[4],
              })}
              title="Renew subscription"
              variant="outline"
            >
              Your current plan is free. We are no longer charging you for relays. Access
              to your subscription will close after the end of your current billing
              period.
              <Button
                color="yellow"
                mt="md"
                rightIcon={<LuRepeat size={18} />}
                size="xs"
                variant="outline"
                onClick={() => openRenewSubscriptionModal(account)}
              >
                Renew subscription
              </Button>
            </Alert>
          )}
          <StarterAccountPlan account={account} userRole={userRole} />
        </>
      )}

      {account.planType === PayPlanType.PayAsYouGoV0 && (
        <Stack>
          {subscription && usageRecords && (
            <AutoScalePlanOverviewCard
              account={account}
              subscription={subscription}
              usageRecords={usageRecords}
              userRole={userRole}
            />
          )}
          {latestInvoice && usageRecords && (
            <AutoScalePlanLatestInvoiceCard
              accountAppsRelays={accountAppsRelays}
              invoice={latestInvoice}
              usageRecords={usageRecords}
              userRole={userRole}
            />
          )}
        </Stack>
      )}

      {account.planType === PayPlanType.Enterprise && (
        <EnterpriseAccountOverviewCard account={account} />
      )}
    </Box>
  )
}

export default AccountPlanView
