import { expect } from "vitest"
import PlanView from "./view"
import { render, screen } from "test/helpers"
import { accountMockData, profileMockData } from "~/models/portal/portal.data"
import { RoleName } from "~/models/portal/sdk"
import { subscription } from "~/models/stripe/stripe.data"
import { AccountAppRelays } from "~/routes/account.$accountId.settings.plan/route"

const accountAppsRelaysData: AccountAppRelays = {
  totalCount: 10000,
  name: "account",
  appEmoji: "emoji",
}

describe("<PlanView />", () => {
  const accountAppsRelays = [accountAppsRelaysData]
  it.skip("renders", () => {
    render(
      <PlanView
        account={accountMockData}
        accountAppsRelays={accountAppsRelays}
        subscription={subscription}
        user={profileMockData}
        userRole={RoleName.Admin}
      />,
    )

    expect(screen.getByRole("heading", { name: /application plan/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /latest invoice/i })).toBeInTheDocument()
  })
})
