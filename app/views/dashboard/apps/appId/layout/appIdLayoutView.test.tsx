import { expect } from "vitest"
import AppIdLayoutView from "./appIdLayoutView"
import { render, screen, userEvent } from "test/helpers"
import { endpoint } from "~/models/portal/portal.data"
import { subscription } from "~/models/stripe/stripe.data"

describe("<AppIdLayoutView />", () => {
  it("renders error modal when search param 'success = false'", () => {
    render(
      <AppIdLayoutView
        endpoint={endpoint}
        searchParams={new URLSearchParams({ success: "false" })}
        subscription={subscription}
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
})
