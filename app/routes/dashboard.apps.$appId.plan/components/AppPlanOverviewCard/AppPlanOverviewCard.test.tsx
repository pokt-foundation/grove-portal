import { expect } from "vitest"
import AppPlanOverviewCard from "./AppPlanOverviewCard"
import { render, screen } from "test/helpers"
import { subscription, useageRecord } from "~/models/stripe/stripe.data"

describe("<AppPlanOverviewCard />", () => {
  it("renders", () => {
    render(
      <AppPlanOverviewCard subscription={subscription} usageRecords={useageRecord} />,
    )

    expect(screen.getByRole("heading", { name: /application plan/i })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /manage plan in stripe/i }),
    ).toBeInTheDocument()
  })
})
