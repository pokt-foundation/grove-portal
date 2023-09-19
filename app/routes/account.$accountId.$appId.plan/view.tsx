import AppPlanLatestInvoiceCard, {
  links as AppPlanLatestInvoiceCardLinks,
} from "./components/AppPlanLatestInvoiceCard"
import AppPlanOverviewCard, {
  links as AppPlanOverviewCardLinks,
} from "./components/AppPlanOverviewCard"
import { AppPlanLoaderData } from "./route"
import { PayPlanType } from "~/models/portal/sdk"
import { getPlanName } from "~/utils/utils"

/* c8 ignore start */
export const links = () => {
  return [...AppPlanLatestInvoiceCardLinks(), ...AppPlanOverviewCardLinks()]
}
/* c8 ignore stop */

export const PlanView = (data: AppPlanLoaderData) => {
  const { app, latestInvoice, latestInvoiceRelays, subscription, usageRecords } = data
  return (
    <>
      {app.legacyFields.planType !== PayPlanType.PayAsYouGoV0 && (
        <div>
          <div>{getPlanName(app.legacyFields.planType)}</div>
          <div>{app.legacyFields.stripeSubscriptionID ? "Renew" : "Upgrade"}</div>
        </div>
      )}
      {subscription && usageRecords && (
        <section>
          <AppPlanOverviewCard subscription={subscription} usageRecords={usageRecords} />
        </section>
      )}
      {latestInvoice && latestInvoiceRelays && usageRecords && (
        <section>
          <AppPlanLatestInvoiceCard
            invoice={latestInvoice}
            relaysLatestInvoice={latestInvoiceRelays}
            usageRecords={usageRecords}
          />
        </section>
      )}
    </>
  )
}

export default PlanView
