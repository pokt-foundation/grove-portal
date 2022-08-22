import { expect } from "vitest"
import AppPlanDetails from "./AppPlanDetails"
import { render, screen } from "test/helpers"

const dailyLimit = 123
const unlimited = 0
const paidPlan = "paid"
const freePlan = "free"
const id = "111222"
const name = "myApp"

describe("<AppPlanDetails />", () => {
  it("renders application with paid plan", () => {
    render(
      <AppPlanDetails dailyLimit={unlimited} id={id} name={name} planType={paidPlan} />,
    )
    const relayLimit = "Relays Limit"
    const currentPlan = "Current Plan"
    const paid = /paid/i
    const dailyLimitText = /Unlimited/i
    expect(screen.getByText(paid)).toBeInTheDocument()
    expect(screen.getByText(dailyLimitText)).toBeInTheDocument()
    expect(screen.getByText(relayLimit)).toBeInTheDocument()
    expect(screen.getByText(currentPlan)).toBeInTheDocument()
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2)
  })
  it("renders unlimited relays with paid plan", () => {
    render(
      <AppPlanDetails dailyLimit={unlimited} id={id} name={name} planType={paidPlan} />,
    )
    const paid = /paid/i
    const dailyLimitText = /Unlimited/i
    expect(screen.getByText(paid)).toBeInTheDocument()
    expect(screen.getByText(dailyLimitText)).toBeInTheDocument()
  })
  it("renders application with free plan", () => {
    render(
      <AppPlanDetails dailyLimit={dailyLimit} id={id} name={name} planType={freePlan} />,
    )
    const relayLimit = "Relays Limit"
    const currentPlan = "Current Plan"
    const free = /free/i
    const dailyLimitText = /123/i
    expect(screen.getByText(free)).toBeInTheDocument()
    expect(screen.getByText(relayLimit)).toBeInTheDocument()
    expect(screen.getByText(currentPlan)).toBeInTheDocument()
    expect(screen.getByText(dailyLimitText)).toBeInTheDocument()
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2)
  })
  it("does NOT render upgrade button with paid plan", () => {
    render(
      <AppPlanDetails dailyLimit={dailyLimit} id={id} name={name} planType={paidPlan} />,
    )
    const buttonText = /Upgrade/i
    expect(screen.queryByText(buttonText)).not.toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })
  it("renders upgrade button with free plan", () => {
    render(
      <AppPlanDetails dailyLimit={dailyLimit} id={id} name={name} planType={freePlan} />,
    )
    const buttonText = /Upgrade/i
    expect(screen.getByText(buttonText)).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("link")).toBeInTheDocument()
  })
})
