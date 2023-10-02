import { expect } from "vitest"
import AppPlanLatestInvoiceCard from "./AppPlanLatestInvoiceCard"
import { render, screen } from "test/helpers"
import { RoleNameV2 } from "~/models/portal/sdk"
import { relayMetric } from "~/models/relaymeter/relaymeter.data"
import { invoice, useageRecord } from "~/models/stripe/stripe.data"

describe.skip("<AppPlanLatestInvoiceCard />", () => {
  it("renders", () => {
    render(
      <AppPlanLatestInvoiceCard
        invoice={invoice}
        relaysLatestInvoice={relayMetric}
        usageRecords={useageRecord}
        userRole={RoleNameV2.Admin}
      />,
    )

    expect(screen.getByRole("heading", { name: /latest invoice/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /view in stripe/i })).toHaveAttribute(
      "href",
      invoice.hosted_invoice_url,
    )
    expect(screen.getByRole("link", { name: /download/i })).toHaveAttribute(
      "href",
      invoice.invoice_pdf,
    )
  })
})
