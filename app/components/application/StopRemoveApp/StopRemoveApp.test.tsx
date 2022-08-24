import { expect } from "vitest"
import StopRemoveApp from "./StopRemoveApp"
import { render, screen } from "test/helpers"
import { PayPlanType } from "~/models/portal/sdk"
import schema from "~/locales/en"

describe("<StopRemoveApp />", () => {
  it("renders Stop Subscription button for paid plantype", () => {
    render(<StopRemoveApp endpointId={"123"} planType={PayPlanType.PayAsYouGoV0} />)
    const stopSubscription = schema.common.StopSubscription
    expect(screen.getByText(stopSubscription)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: stopSubscription })).toBeInTheDocument()
  })
  it("renders remove application for free tier plantype", () => {
    render(<StopRemoveApp endpointId={"123"} planType={PayPlanType.FreetierV0} />)
    const removeApplication = "Remove Application"
    expect(screen.getByText(removeApplication)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: removeApplication })).toBeInTheDocument()
  })
})
