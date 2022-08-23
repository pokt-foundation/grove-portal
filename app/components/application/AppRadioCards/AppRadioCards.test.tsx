import { expect, vi } from "vitest"
import AppRadioCards from "./AppRadioCards"
import { render, screen } from "test/helpers"

const freePlan = "free"
const paidPlan = "paid"

const tiers = [
  {
    name: "Always Free",
    value: "free",
    active: "true",
    price: 0,
    priceText: "$0.00",
    cardDescription:
      "Access to reliable, censor resistant infrastructure. Free up to 250k relays per day.",
  },
  {
    name: "Pay As You Go",
    value: "paid",
    active: "true",
    price: 1.01,
    priceText: "pay per relay",
    cardDescription:
      "250k free relays per day, per app. Beyond that, pay only for what you use.",
  },
]

const setRadio = vi.fn()

describe("<AppRadioCards />", () => {
  it("renders radio cards appropriately", () => {
    render(
      <AppRadioCards currentRadio={freePlan} setRadio={setRadio} radioData={tiers} />,
    )
    expect(screen.getAllByRole("radio")).toHaveLength(2)
    expect(screen.getByRole("radio", { name: tiers[0].name })).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: tiers[1].name })).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: tiers[0].name })).toBeChecked()
    expect(screen.getByText(tiers[0].name)).toBeInTheDocument()
    expect(screen.getByText(tiers[0].priceText)).toBeInTheDocument()
    expect(screen.getByText(tiers[0].cardDescription)).toBeInTheDocument()
    expect(screen.getByText(tiers[1].name)).toBeInTheDocument()
    expect(screen.getByText(tiers[1].priceText)).toBeInTheDocument()
    expect(screen.getByText(tiers[1].cardDescription)).toBeInTheDocument()
  })
  it("correctly checks radio cards based on props passed in", () => {
    render(
      <AppRadioCards currentRadio={paidPlan} setRadio={setRadio} radioData={tiers} />,
    )
    expect(screen.getAllByRole("radio")).toHaveLength(2)
    expect(screen.getByRole("radio", { name: tiers[0].name })).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: tiers[1].name })).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: tiers[1].name })).toBeChecked()
    expect(screen.getByRole("radio", { name: tiers[0].name })).not.toBeChecked()
  })
})
