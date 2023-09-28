import { expect } from "vitest"
import PlanView from "./view"
import { render, screen } from "test/helpers"
import { app, profileMockData } from "~/models/portal/portal.data"
import { relayMetric } from "~/models/relaymeter/relaymeter.data"
import { invoice, subscription, useageRecord } from "~/models/stripe/stripe.data"

describe("<PlanView />", () => {
  it.skip("renders", () => {
    render(
      <PlanView
        app={app}
        latestInvoice={invoice}
        latestInvoiceRelays={relayMetric}
        subscription={subscription}
        usageRecords={useageRecord}
        user={profileMockData}
      />,
    )

    expect(screen.getByRole("heading", { name: /application plan/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /latest invoice/i })).toBeInTheDocument()
  })
})
