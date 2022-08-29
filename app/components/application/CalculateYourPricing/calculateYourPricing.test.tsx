import { expect } from "vitest"
import CalculateYourPricing from "./CalculateYourPricing"
import { render, screen } from "test/helpers"

describe("<CalculateYourPricing />", () => {
  it("renders", () => {
    render(<CalculateYourPricing price={0.000779472213} />)

    expect(
      screen.getByRole("heading", { name: /Calculate your pricing/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /Price per Relay/i })).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /Total Monthly Estimated Price/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /How is this calculated/i }),
    ).toBeInTheDocument()
  })
})
