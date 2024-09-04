import { Box } from "@mantine/core"
import EnterpriseAccountOverviewCard from "./components/EnterpriseAccountOverviewCard"
import FreeAccountPlan from "./components/FreeAccountPlan"
import UnlimitedPlanOverviewCard from "./components/UnlimitedAccountOverviewCard"
import { AccountPlanLoaderData } from "./route"
import { PayPlanType, RoleName } from "~/models/portal/sdk"

export type AccountPlanViewProps = AccountPlanLoaderData & { userRole: RoleName }

export const AccountPlanView = ({
  account,
  subscription,
  userRole,
}: AccountPlanViewProps) => {
  return (
    <Box py={20}>
      {account.planType === PayPlanType.PlanFree && <FreeAccountPlan account={account} />}

      {account.planType === PayPlanType.PlanUnlimited && (
        <UnlimitedPlanOverviewCard
          account={account}
          subscription={subscription}
          userRole={userRole}
        />
      )}

      {account.planType === PayPlanType.Enterprise && (
        <EnterpriseAccountOverviewCard account={account} />
      )}
    </Box>
  )
}

export default AccountPlanView
