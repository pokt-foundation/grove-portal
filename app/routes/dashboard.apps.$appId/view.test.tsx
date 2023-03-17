import { useFetcher } from "@remix-run/react"
import { vi, expect } from "vitest"
import AppIdLayoutView from "./view"
import { render, screen } from "test/helpers"
import t from "~/locales/en"
import { endpoint, profileMockData } from "~/models/portal/portal.data"
import { PayPlanType } from "~/models/portal/sdk"
import { subscription } from "~/models/stripe/stripe.data"

vi.mock("~/utils/analytics", async () => ({
  ...(await vi.importActual<any>("~/utils/analytics")),
  trackEvent: vi.fn(),
}))

const updatePlanFetcherMock = {
  state: "idle",
  submit: vi.fn(() => ({ error: false })),
} as unknown as ReturnType<typeof useFetcher>

const setSearchParams = vi.fn()

describe("<AppIdLayoutView />", () => {
  beforeEach(() => {
    vi.resetModules()
  })
  it("renders error modal when search param 'success = false'", () => {
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams({ success: "false" })}
        setSearchParams={setSearchParams}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
        user={profileMockData}
      />,
    )

    expect(
      screen.getByRole("dialog", { name: /subscription error/i }),
    ).toBeInTheDocument()
  })
  it("renders success modal when search param 'success = true'", () => {
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams({ success: "true" })}
        setSearchParams={setSearchParams}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
        user={profileMockData}
      />,
    )

    expect(screen.getByRole("dialog", { name: /congratulations/i })).toBeInTheDocument()
  })
  it("renders layout without endpoint and without search params", () => {
    render(
      <AppIdLayoutView
        endpoint={null}
        searchParams={new URLSearchParams()}
        setSearchParams={setSearchParams}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
        user={profileMockData}
      />,
    )

    expect(
      screen.queryByRole("dialog", { name: /congratulations/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole("dialog", { name: /subscription error/i }),
    ).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: endpoint.name })).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/portal id/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/secret key/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/public key/i)).not.toBeInTheDocument()
    expect(
      screen.queryByRole("heading", { name: t.appAddressCard.heading }),
    ).not.toBeInTheDocument()
  })
  it("renders layout with endpoint and without search params", () => {
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams()}
        setSearchParams={setSearchParams}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
        user={profileMockData}
      />,
    )

    expect(
      screen.queryByRole("dialog", { name: /congratulations/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole("dialog", { name: /subscription error/i }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole("heading", { name: endpoint.name })).toBeInTheDocument()
    expect(screen.getByLabelText(/portal id/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/secret key/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/public key/i)).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: t.appAddressCard.heading }),
    ).toBeInTheDocument()
  })
  it("renders nav routes when planType is paid", () => {
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams()}
        setSearchParams={setSearchParams}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
        user={profileMockData}
      />,
    )

    expect(
      screen.getByRole("link", { name: t.appId.routes.overview }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: t.appId.routes.requests }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: t.appId.routes.security }),
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: t.appId.routes.plan })).toBeInTheDocument()
    expect(
      screen.queryByRole("link", { name: t.appId.routes.notifications }),
    ).not.toBeInTheDocument()
  })
  it("renders nav routes when planType is free", () => {
    endpoint.appLimits.planType = PayPlanType.FreetierV0
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams()}
        setSearchParams={setSearchParams}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
        user={profileMockData}
      />,
    )

    expect(
      screen.getByRole("link", { name: t.appId.routes.overview }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: t.appId.routes.requests }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: t.appId.routes.security }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: t.appId.routes.notifications }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("link", { name: t.appId.routes.plan }),
    ).not.toBeInTheDocument()
  })
  it("hides legacy banner when planType is free", () => {
    endpoint.appLimits.planType = PayPlanType.FreetierV0
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams()}
        setSearchParams={setSearchParams}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
        user={profileMockData}
      />,
    )

    expect(
      screen.queryByRole("heading", { name: t.LegacyBannerCard.title }),
    ).not.toBeInTheDocument()
  })
  it("hides legacy banner when planType is paid", () => {
    endpoint.appLimits.planType = PayPlanType.PayAsYouGoV0
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams()}
        setSearchParams={setSearchParams}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
        user={profileMockData}
      />,
    )

    expect(
      screen.queryByRole("heading", { name: t.LegacyBannerCard.title }),
    ).not.toBeInTheDocument()
  })
  it("shows legacy banner when planType is neither paid or free (legacy)", () => {
    // @ts-ignore next
    endpoint.appLimits.planType = ""
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams()}
        setSearchParams={setSearchParams}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
        user={profileMockData}
      />,
    )

    expect(
      screen.getByRole("heading", { name: t.LegacyBannerCard.title }),
    ).toBeInTheDocument()
  })
  it("hides legacy banner when FF is turned off and planType is neither paid or free (legacy)", () => {
    // @ts-ignore next
    endpoint.appLimits.planType = ""
    ENV.FLAG_LEGACY_MESSAGING = "false"

    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams()}
        setSearchParams={setSearchParams}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
        user={profileMockData}
      />,
    )

    expect(
      screen.queryByRole("heading", { name: t.LegacyBannerCard.title }),
    ).not.toBeInTheDocument()
  })
})
