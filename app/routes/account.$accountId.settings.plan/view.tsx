import { Box } from "@mantine/core"
import AutoScalePlanOverviewCard from "./components/AutoScalePlanOverviewCard"
import EnterpriseAccountOverviewCard from "./components/EnterpriseAccountOverviewCard"
import StarterAccountPlan from "./components/StarterAccountPlan"
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
      {account.planType === PayPlanType.FreetierV0 && (
        <StarterAccountPlan account={account} userRole={userRole} />
      )}

      {account.planType === PayPlanType.PayAsYouGoV0 && (
        <AutoScalePlanOverviewCard
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
