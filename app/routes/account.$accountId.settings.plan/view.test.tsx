import { expect } from "vitest"
import PlanView from "./view"
import { render, screen } from "test/helpers"
import { accountMockData, profileMockData } from "~/models/portal/portal.data"
import { RoleName } from "~/models/portal/sdk"
import { relayMetric } from "~/models/relaymeter/relaymeter.data"
import { invoice, subscription, useageRecord } from "~/models/stripe/stripe.data"

describe("<PlanView />", () => {
  const accountAppsRelays = [relayMetric]
  it.skip("renders", () => {
    render(
      <PlanView
        account={accountMockData}
        accountAppsRelays={accountAppsRelays}
        latestInvoice={invoice}
        subscription={subscription}
        usageRecords={useageRecord}
        user={profileMockData}
        userRole={RoleName.Admin}
      />,
    )

    expect(screen.getByRole("heading", { name: /application plan/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /latest invoice/i })).toBeInTheDocument()
  })
})
