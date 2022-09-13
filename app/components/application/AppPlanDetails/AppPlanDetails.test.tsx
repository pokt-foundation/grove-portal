import { expect } from "vitest"
import AppPlanDetails from "./AppPlanDetails"
import { render, screen } from "test/helpers"
import schema from "~/locales/en"
import { PayPlanType } from "~/models/portal/sdk"
import { subscription } from "~/models/stripe/stripe.data"
import { getPlanName } from "~/utils/utils"

const dailyLimit = 123
const unlimited = 0
const paidPlan = PayPlanType.PayAsYouGoV0
const freePlan = PayPlanType.FreetierV0
const id = "111222"
const name = "myApp"

describe("<AppPlanDetails />", () => {
  it("renders application with paid plan", () => {
    render(
      <AppPlanDetails
        dailyLimit={unlimited}
        id={id}
        name={name}
        planType={paidPlan}
        subscription={subscription}
      />,
    )
    const paid = getPlanName(paidPlan)
    const dailyLimitText = /Unlimited/i
    expect(screen.getByText(paid)).toBeInTheDocument()
    expect(screen.getByText(dailyLimitText)).toBeInTheDocument()
    expect(screen.getByText(schema.AppPlanDetails.relayLimit)).toBeInTheDocument()
    expect(screen.getByText(schema.AppPlanDetails.currentPlan)).toBeInTheDocument()
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2)
  })
  it("renders unlimited relays with paid plan", () => {
    render(
      <AppPlanDetails
        dailyLimit={unlimited}
        id={id}
        name={name}
        planType={paidPlan}
        subscription={subscription}
      />,
    )
    const paid = getPlanName(paidPlan)
    const dailyLimitText = /Unlimited/i
    expect(screen.getByText(paid)).toBeInTheDocument()
    expect(screen.getByText(dailyLimitText)).toBeInTheDocument()
  })
  it("renders application with free plan", () => {
    render(
      <AppPlanDetails
        dailyLimit={dailyLimit}
        id={id}
        name={name}
        planType={freePlan}
        subscription={subscription}
      />,
    )
    const free = getPlanName(freePlan)
    const dailyLimitText = /123/i
    expect(screen.getByText(free)).toBeInTheDocument()
    expect(screen.getByText(schema.AppPlanDetails.relayLimit)).toBeInTheDocument()
    expect(screen.getByText(schema.AppPlanDetails.currentPlan)).toBeInTheDocument()
    expect(screen.getByText(dailyLimitText)).toBeInTheDocument()
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2)
  })
  it("does NOT render upgrade button with paid plan", () => {
    render(
      <AppPlanDetails
        dailyLimit={dailyLimit}
        id={id}
        name={name}
        planType={paidPlan}
        subscription={subscription}
      />,
    )
    const buttonText = /Upgrade/i
    expect(screen.queryByText(buttonText)).not.toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })
  it("renders upgrade button with free plan", () => {
    render(
      <AppPlanDetails
        dailyLimit={dailyLimit}
        id={id}
        name={name}
        planType={freePlan}
        subscription={undefined}
      />,
    )
    const buttonText = /Upgrade/i
    expect(screen.getByText(buttonText)).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("link")).toBeInTheDocument()
  })
  it("renders upgrade button with legacy plan", () => {
    render(
      <AppPlanDetails
        dailyLimit={dailyLimit}
        id={id}
        name={name}
        // @ts-ignore next
        planType={""}
        subscription={undefined}
      />,
    )

    const buttonText = /Upgrade/i
    expect(screen.getByText(buttonText)).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("link")).toBeInTheDocument()
  })
  it("renders renew button if subscription has cancel_at_period_end", () => {
    subscription.cancel_at_period_end = true
    render(
      <AppPlanDetails
        dailyLimit={dailyLimit}
        id={id}
        name={name}
        planType={freePlan}
        subscription={subscription}
      />,
    )
    const buttonText = /renew/i
    expect(screen.getByText(buttonText)).toBeInTheDocument()
  })
})
