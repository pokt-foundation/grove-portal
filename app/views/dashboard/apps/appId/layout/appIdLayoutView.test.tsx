import { expect } from "vitest"
import AppIdLayoutView from "./appIdLayoutView"
import { render, screen, userEvent } from "test/helpers"
import { endpoint } from "~/models/portal/portal.data"
import { PayPlanType } from "~/models/portal/sdk"

describe("<AppIdLayoutView />", () => {
  it("renders error modal when search param 'success = false'", () => {
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams({ success: "false" })}
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
      />,
    )

    expect(screen.getByRole("dialog", { name: /congratulations/i })).toBeInTheDocument()
  })
  it("renders layout without endpoint and without search params", () => {
    render(<AppIdLayoutView endpoint={null} searchParams={new URLSearchParams()} />)

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
    render(<AppIdLayoutView endpoint={endpoint} searchParams={new URLSearchParams()} />)

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
    render(<AppIdLayoutView endpoint={endpoint} searchParams={new URLSearchParams()} />)

    expect(screen.getByRole("link", { name: /overview/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /requests/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /security/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /plan details/i })).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /notifications/i })).not.toBeInTheDocument()
  })
  it("renders nav routes when planType is free", () => {
    endpoint.appLimits.planType = PayPlanType.FreetierV0
    render(<AppIdLayoutView endpoint={endpoint} searchParams={new URLSearchParams()} />)

    expect(screen.getByRole("link", { name: /overview/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /requests/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /security/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /notifications/i })).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /plan details/i })).not.toBeInTheDocument()
  })
})
