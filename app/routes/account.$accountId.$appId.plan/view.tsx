import { Alert, Box, MantineTheme, SimpleGrid } from "@pokt-foundation/pocket-blocks"
import { LuAlertCircle } from "react-icons/lu"
import AppPlanLatestInvoiceCard from "./components/AppPlanLatestInvoiceCard"
import AppPlanOverviewCard from "./components/AppPlanOverviewCard"
import FreeAppPlan from "./components/FreeAppPlan"
import { AppPlanLoaderData } from "./route"
import { PayPlanType, RoleNameV2 } from "~/models/portal/sdk"

type PlanViewProps = AppPlanLoaderData & { userRole: RoleNameV2 }

export const PlanView = ({
  app,
  latestInvoice,
  latestInvoiceRelays,
  subscription,
  usageRecords,
  userRole,
}: PlanViewProps) => {
  return (
    <Box py={20}>
      {app.legacyFields.planType !== PayPlanType.PayAsYouGoV0 &&
        (app.legacyFields.stripeSubscriptionID ? (
          <Alert
            color="yellow"
            icon={<LuAlertCircle size={18} />}
            mb="xl"
            radius={8}
            sx={(theme: MantineTheme) => ({
              backgroundColor: theme.colors.dark,
            })}
            title="Renew subscription"
            variant="outline"
          >
            Your current plan is free. We are no longer charging you for relays. Access to
            your subscription will close after the end of your current billing period.
          </Alert>
        ) : (
          <FreeAppPlan app={app} />
        ))}
      <SimpleGrid breakpoints={[{ maxWidth: "md", cols: 1 }]} cols={2}>
        {subscription && usageRecords && (
          <AppPlanOverviewCard
            app={app}
            subscription={subscription}
            usageRecords={usageRecords}
            userRole={userRole}
          />
        )}
        {latestInvoice && latestInvoiceRelays && usageRecords && (
          <AppPlanLatestInvoiceCard
            invoice={latestInvoice}
            relaysLatestInvoice={latestInvoiceRelays}
            usageRecords={usageRecords}
            userRole={userRole}
          />
        )}
      </SimpleGrid>
    </Box>
  )
}

export default PlanView
