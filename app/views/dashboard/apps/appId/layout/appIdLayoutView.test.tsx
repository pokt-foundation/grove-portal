import { useFetcher } from "@remix-run/react"
import { vi, expect } from "vitest"
import AppIdLayoutView from "./appIdLayoutView"
import { render, screen, userEvent } from "test/helpers"
import t from "~/locales/en"
import { endpoint } from "~/models/portal/portal.data"
import { PayPlanType } from "~/models/portal/sdk"
import { subscription } from "~/models/stripe/stripe.data"

const updatePlanFetcherMock = {
  state: "idle",
  submit: vi.fn(() => ({ error: false })),
} as unknown as ReturnType<typeof useFetcher>

describe("<AppIdLayoutView />", () => {
  beforeEach(() => {
    vi.resetModules()
  })
  it("renders error modal when search param 'success = false'", () => {
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams({ success: "false" })}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
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
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
      />,
    )

    expect(screen.getByRole("dialog", { name: /congratulations/i })).toBeInTheDocument()
  })
  it("renders layout without endpoint and without search params", () => {
    render(
      <AppIdLayoutView
        endpoint={null}
        searchParams={new URLSearchParams()}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
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
      screen.queryByRole("heading", { name: /pokt app addresses/i }),
    ).not.toBeInTheDocument()
  })
  it("renders layout with endpoint and without search params", () => {
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams()}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
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
      screen.getByRole("heading", { name: /pokt app addresses/i }),
    ).toBeInTheDocument()
  })
  it("renders nav routes when planType is paid", () => {
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams()}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
      />,
    )

    expect(screen.getByRole("link", { name: /overview/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /requests/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /security/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /plan details/i })).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /notifications/i })).not.toBeInTheDocument()
  })
  it("renders nav routes when planType is free", () => {
    endpoint.appLimits.planType = PayPlanType.FreetierV0
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams()}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
      />,
    )

    expect(screen.getByRole("link", { name: /overview/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /requests/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /security/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /notifications/i })).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /plan details/i })).not.toBeInTheDocument()
  })
  it("hides legacy banner when planType is free", () => {
    endpoint.appLimits.planType = PayPlanType.FreetierV0
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams()}
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
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
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
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
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
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
        subscription={subscription}
        updatePlanFetcher={updatePlanFetcherMock}
      />,
    )

    expect(
      screen.queryByRole("heading", { name: t.LegacyBannerCard.title }),
    ).not.toBeInTheDocument()
  })
})
