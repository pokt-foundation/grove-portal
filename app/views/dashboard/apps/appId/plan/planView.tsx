import { Button } from "@pokt-foundation/pocket-blocks"
import { Form, useLocation } from "@remix-run/react"
import AppPlanLatestInvoiceCard, {
  links as AppPlanLatestInvoiceCardLinks,
} from "~/components/application/AppPlanLatestInvoiceCard"
import AppPlanOverviewCard, {
  links as AppPlanOverviewCardLinks,
} from "~/components/application/AppPlanOverviewCard"
import Card, { links as CardLinks } from "~/components/shared/Card"
import { useTranslate } from "~/context/TranslateContext"
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
  const { t } = useTranslate()
  const location = useLocation()

  if (data.error) {
    return (
      <Card>
        <div className="pokt-card-header">
          <h3>{t.PlanView.title}</h3>
        </div>
        <p>{t.PlanView.description}</p>
        <Form action="/api/stripe/portal-session" method="post">
          <input hidden name="return-path" value={location.pathname} />
          <Button type="submit" variant="outline">
            {t.PlanView.button}
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
