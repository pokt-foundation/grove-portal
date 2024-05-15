import { expect } from "vitest"
import PlanView from "./view"
import { createRemixStub, render, screen, waitFor } from "test/helpers"
import { accountMockData, profileMockData } from "~/models/portal/portal.data"
import RootProviders from "~/root/components/RootProviders"
import { PayPlanType, RoleName } from "~/models/portal/sdk"
import { subscription } from "~/models/stripe/stripe.data"
import { AccountAppRelays } from "~/routes/account.$accountId.settings.plan/route"

const accountAppsRelaysData: AccountAppRelays = {
  totalCount: 10000,
  name: "account",
  appEmoji: "emoji",
}

describe("<PlanView />", () => {
  it("renders upgrade screen for freetier plan", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => (
          <RootProviders>
            <PlanView
              account={accountMockData}
              accountAppsRelays={[accountAppsRelaysData]}
              subscription={subscription}
              user={profileMockData}
              userRole={RoleName.Admin}
            />
          </RootProviders>
        ),
      },
    ])
    render(<RemixStub />)

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /upgrade your plan/i }),
      ).toBeInTheDocument()
    })
  })
  it("renders plan for payg", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => (
          <RootProviders>
            <PlanView
              account={{ ...accountMockData, planType: PayPlanType.PayAsYouGoV0 }}
              accountAppsRelays={[accountAppsRelaysData]}
              subscription={subscription}
              user={profileMockData}
              userRole={RoleName.Admin}
            />
          </RootProviders>
        ),
      },
    ])
    render(<RemixStub />)

    await waitFor(() => {
      expect(screen.getByText(/current plan/i)).toBeInTheDocument()
    })
  })
})
