import { expect } from "vitest"
import AppPlanOverviewCard from "./AppPlanOverviewCard"
import { render, screen } from "test/helpers"
import { endpoint, profileMockData } from "~/models/portal/portal.data"
import { subscription } from "~/models/stripe/stripe.data"

describe("<AppPlanOverviewCard />", () => {
  it("renders", () => {
    render(
      <AppPlanOverviewCard endpoint={endpoint} subscription={subscription} user={profileMockData} />,
    )

    expect(screen.getByRole("heading", { name: /plan/i })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /manage in stripe/i }),
    ).toBeInTheDocument()
  })
})
