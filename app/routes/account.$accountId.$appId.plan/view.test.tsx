import { expect } from "vitest"
import PlanView from "./view"
import { render, screen } from "test/helpers"
import { endpoint } from "~/models/portal/portal.data"
import { relayMetric } from "~/models/relaymeter/relaymeter.data"
import { invoice, subscription, useageRecord } from "~/models/stripe/stripe.data"

describe("<PlanView />", () => {
  it.skip("shows manage in stripe card on error", () => {
    render(<PlanView error={true} message="test" />)

    expect(screen.getByRole("heading", { name: /stripe error/i })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /manage plan in stripe/i }),
    ).toBeInTheDocument()
  })
  it.skip("renders", () => {
    render(
      <PlanView
        endpoint={endpoint}
        error={false}
        invoice={invoice}
        relaysLatestInvoice={relayMetric}
        subscription={subscription}
        usageRecords={useageRecord}
      />,
    )

    expect(screen.getByRole("heading", { name: /application plan/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /latest invoice/i })).toBeInTheDocument()
  })
})
