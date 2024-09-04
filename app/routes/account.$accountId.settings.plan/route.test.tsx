import { json } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { expect } from "vitest"
import { render, screen, createRemixStub, waitFor } from "test/helpers"
import { accountMockData, profileMockData } from "~/models/portal/portal.data"
import { PayPlanType, RoleName } from "~/models/portal/sdk"
import { subscription } from "~/models/stripe/stripe.data"
import RootProviders from "~/root/components/RootProviders"
import AccountPlanDetails, {
  AccountAppRelays,
  AccountPlanLoaderData,
} from "~/routes/account.$accountId.settings.plan/route"

const accountAppsRelaysData: AccountAppRelays = {
  totalCount: 10000,
  name: "account",
  appEmoji: "emoji",
}

describe("account/$accountId/settings/plan", () => {
  it("renders upgrade screen for freetier plan", async () => {
    function SettingsOutLetContext() {
      return (
        <RootProviders>
          <Outlet context={{ userRole: RoleName.Admin }} />
        </RootProviders>
      )
    }

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: SettingsOutLetContext,
        children: [
          {
            path: "/",
            Component: AccountPlanDetails,
            loader: () => {
              return json<AccountPlanLoaderData>({
                account: accountMockData,
                accountAppsRelays: [accountAppsRelaysData],
                subscription: subscription,
                user: profileMockData,
              })
            },
          },
        ],
      },
    ])
    render(<RemixStub />)

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /upgrade your plan/i }),
      ).toBeInTheDocument()
    })
  })
  it("renders plan for unlimited", async () => {
    function SettingsOutLetContext() {
      return (
        <RootProviders>
          <Outlet context={{ userRole: RoleName.Admin }} />
        </RootProviders>
      )
    }

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: SettingsOutLetContext,
        children: [
          {
            path: "/",
            Component: AccountPlanDetails,
            loader: () => {
              return json<AccountPlanLoaderData>({
                account: { ...accountMockData, planType: PayPlanType.PlanUnlimited },
                accountAppsRelays: [accountAppsRelaysData],
                subscription: subscription,
                user: profileMockData,
              })
            },
          },
        ],
      },
    ])
    render(<RemixStub />)

    await waitFor(() => {
      expect(screen.getByText(/current plan/i)).toBeInTheDocument()
    })
  })
})
