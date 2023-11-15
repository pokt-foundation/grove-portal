import { Box, Stack } from "@pokt-foundation/pocket-blocks"
import AutoScalePlanLatestInvoiceCard from "./components/AutoScalePlanLatestInvoiceCard"
import AutoScalePlanOverviewCard from "./components/AutoScalePlanOverviewCard"
import EnterpriseAccountOverviewCard from "./components/EnterpriseAccountOverviewCard"
import StarterAccountPlan from "./components/StarterAccountPlan"
import { AccountPlanLoaderData } from "./route"
import { PayPlanType, RoleName } from "~/models/portal/sdk"

export type AccountPlanViewProps = AccountPlanLoaderData & { userRole: RoleName }

export const AccountPlanView = ({
  account,
  latestInvoice,
  accountAppsRelays,
  subscription,
  usageRecords,
  userRole,
}: AccountPlanViewProps) => {
  return (
    <Box py={20}>
      {account.planType === PayPlanType.FreetierV0 && (
        <StarterAccountPlan account={account} userRole={userRole} />
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
