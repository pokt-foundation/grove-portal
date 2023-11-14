import { expect } from "vitest"
import AutoScalePlanLatestInvoiceCard from "./AutoScalePlanLatestInvoiceCard"
import { render, screen } from "test/helpers"
import { RoleName } from "~/models/portal/sdk"
import { relayMetric } from "~/models/relaymeter/relaymeter.data"
import { invoice, useageRecord } from "~/models/stripe/stripe.data"

describe.skip("<AutoScalePlanLatestInvoiceCard />", () => {
  it("renders", () => {
    render(
      <AutoScalePlanLatestInvoiceCard
        accountAppsRelays={[relayMetric]}
        invoice={invoice}
        usageRecords={useageRecord}
        userRole={RoleName.Admin}
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
