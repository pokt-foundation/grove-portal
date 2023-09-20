import { Box, SimpleGrid } from "@pokt-foundation/pocket-blocks"
import AppPlanLatestInvoiceCard from "./components/AppPlanLatestInvoiceCard"
import AppPlanOverviewCard from "./components/AppPlanOverviewCard"
import { AppPlanLoaderData } from "./route"
import { PayPlanType, RoleNameV2 } from "~/models/portal/sdk"
import { getUserRole } from "~/utils/applicationUtils"
import { getPlanName } from "~/utils/utils"

export const PlanView = (data: AppPlanLoaderData) => {
  const { app, latestInvoice, latestInvoiceRelays, subscription, usageRecords, user } =
    data

  const userRole = getUserRole(app, user.portalUserID)

  return (
    <Box py={20}>
      {app.legacyFields.planType !== PayPlanType.PayAsYouGoV0 && (
        <div>
          <div>{getPlanName(app.legacyFields.planType)}</div>
          <div>{app.legacyFields.stripeSubscriptionID ? "Renew" : "Upgrade"}</div>
        </div>
      )}
      <SimpleGrid breakpoints={[{ maxWidth: "md", cols: 1 }]} cols={2}>
        {subscription && usageRecords && (
          <AppPlanOverviewCard
            app={app}
            subscription={subscription}
            usageRecords={usageRecords}
            userRole={userRole as RoleNameV2}
          />
        )}
        {latestInvoice && latestInvoiceRelays && usageRecords && (
          <AppPlanLatestInvoiceCard
            invoice={latestInvoice}
            relaysLatestInvoice={latestInvoiceRelays}
            usageRecords={usageRecords}
          />
        )}
      </SimpleGrid>
    </Box>
  )
}

export default PlanView
