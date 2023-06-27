import { expect } from "vitest"
import AppPlanLatestInvoiceCard from "./AppPlanLatestInvoiceCard"
import { render, screen } from "test/helpers"
import { relayMetric } from "~/models/relaymeter/relaymeter.data"
import { invoice, useageRecord } from "~/models/stripe/stripe.data"

describe("<AppPlanLatestInvoiceCard />", () => {
  it("renders", () => {
    render(
      <AppPlanLatestInvoiceCard
        invoice={invoice}
        relaysLatestInvoice={relayMetric}
        usageRecords={useageRecord}
      />,
    )

    expect(screen.getByRole("heading", { name: /current period/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /view relay data/i })).toHaveAttribute(
      "href",
      "/empty-route-for-now",
    )
  })
})
