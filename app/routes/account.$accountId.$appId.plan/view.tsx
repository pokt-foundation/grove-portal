import { Box, SimpleGrid } from "@pokt-foundation/pocket-blocks"
import AppPlanLatestInvoiceCard from "./components/AppPlanLatestInvoiceCard"
import AppPlanOverviewCard from "./components/AppPlanOverviewCard"
import { AppPlanLoaderData } from "./route"
import { PayPlanType } from "~/models/portal/sdk"
import { getPlanName } from "~/utils/utils"

export const PlanView = (data: AppPlanLoaderData) => {
  const { app, latestInvoice, latestInvoiceRelays, subscription, usageRecords } = data
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
