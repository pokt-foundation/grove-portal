import { Form } from "@remix-run/react"
import AppPlanLatestInvoiceCard, {
  links as AppPlanLatestInvoiceCardLinks,
} from "~/components/application/AppPlanLatestInvoiceCard"
import AppPlanOverviewCard, {
  links as AppPlanOverviewCardLinks,
} from "~/components/application/AppPlanOverviewCard"
import Button from "~/components/shared/Button"
import Card, { links as CardLinks } from "~/components/shared/Card"
import { AppPlanLoaderData } from "~/routes/dashboard/apps/$appId/plan"

/* c8 ignore start */
export const links = () => {
  return [
    ...CardLinks(),
    ...AppPlanLatestInvoiceCardLinks(),
    ...AppPlanOverviewCardLinks(),
  ]
}
/* c8 ignore stop */

export const PlanView = (data: AppPlanLoaderData) => {
  if (data.error) {
    return (
      <Card>
        <div className="pokt-card-header">
          <h3>Stripe Error</h3>
        </div>
        <p>
          We are sorry but there appears to be an issue with out connection to stripe. You
          can try managing your subscription directly in Stripe's portal.
        </p>
        <Form action="/api/stripe/portal-session" method="post">
          <Button type="submit" variant="outline">
            Manage Plan in Stripe
          </Button>
        </Form>
      </Card>
    )
  }

  return (
    <>
      <AppPlanOverviewCard
        subscription={data.subscription}
        usageRecords={data.usageRecords}
      />
      <AppPlanLatestInvoiceCard
        invoice={data.invoice}
        relaysLatestInvoice={data.relaysLatestInvoice}
        usageRecords={data.usageRecords}
      />
    </>
  )
}

export default PlanView
