import { expect } from "vitest"
import StopRemoveApp from "./StopRemoveApp"
import { render, screen } from "test/helpers"
import schema from "~/locales/en"
import { PayPlanType } from "~/models/portal/sdk"

const stopSubscription = schema.common.StopSubscription
const removeApplication = "Remove Application"

describe("<StopRemoveApp />", () => {
  it("renders Stop Subscription button for paid plantype", () => {
    render(<StopRemoveApp endpointId={"123"} planType={PayPlanType.PayAsYouGoV0} />)

    expect(screen.getByText(stopSubscription)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: stopSubscription })).toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: removeApplication }),
    ).not.toBeInTheDocument()
  })
  it("renders remove application for free tier plantype", () => {
    render(<StopRemoveApp endpointId={"123"} planType={PayPlanType.FreetierV0} />)

    expect(screen.getByText(removeApplication)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: removeApplication })).toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: stopSubscription }),
    ).not.toBeInTheDocument()
  })
})
