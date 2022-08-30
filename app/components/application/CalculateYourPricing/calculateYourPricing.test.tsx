import userEvent from "@testing-library/user-event"
import { expect } from "vitest"
import CalculateYourPricing from "./CalculateYourPricing"
import { render, screen, waitFor, fireEvent } from "test/helpers"

const price = 0.000779472213

describe("<CalculateYourPricing />", () => {
  it("renders", () => {
    render(<CalculateYourPricing price={price} />)

    expect(
      screen.getByRole("heading", { name: /Calculate your pricing/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /Price per Relay/i })).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /Total Monthly Estimated Price/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /How is this calculated?/i }),
    ).toBeInTheDocument()
  })

  it("opens and closes modal when button is clicked", async () => {
    const user = userEvent.setup()
    render(<CalculateYourPricing price={price} />)

    const howIsThisCalculatedBtn = screen.getByRole("button", {
      name: /How is this calculated?/i,
    })
    expect(howIsThisCalculatedBtn).toBeInTheDocument()

    user.click(howIsThisCalculatedBtn)

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /How is this price calculated/i }),
      ).toBeInTheDocument()
    })

    user.click(screen.getByRole("button", { name: /Done/i }))

    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: /How is this price calculated/i }),
      ).not.toBeInTheDocument()
    })
  })

  it("types avg relay and calculates estimated monthly payment", async () => {
    const user = userEvent.setup()
    render(<CalculateYourPricing price={price} />)

    const avgRelaysInput = screen.getByDisplayValue("0")
    expect(avgRelaysInput).toBeInTheDocument()

    user.type(avgRelaysInput, "350000")
    await waitFor(() => {
      expect(screen.getByDisplayValue(/350,000/i)).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByText(/2,370.37/i)).toBeInTheDocument()
    })

    user.clear(avgRelaysInput)
    await waitFor(() => {
      expect(screen.getByDisplayValue(/0/i)).toBeInTheDocument()
    })

    user.type(avgRelaysInput, "450000")
    await waitFor(() => {
      expect(screen.getByDisplayValue(/450,000/i)).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByText(/4,740.75/i)).toBeInTheDocument()
    })

    user.clear(avgRelaysInput)
    await waitFor(() => {
      expect(screen.getByDisplayValue(/0/i)).toBeInTheDocument()
    })
  })
})