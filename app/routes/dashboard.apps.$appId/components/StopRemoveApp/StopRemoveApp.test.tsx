import { expect } from "vitest"
import StopRemoveApp from "./StopRemoveApp"
import { render, screen } from "test/helpers"
import schema from "~/locales/en"
import { endpoint } from "~/models/portal/portal.data"
import { PayPlanType } from "~/models/portal/sdk"
import { subscription } from "~/models/stripe/stripe.data"

describe("<StopRemoveApp />", () => {
  it("renders Stop Subscription button for paid plantype", () => {
    render(
      <StopRemoveApp
        appId="123"
        apps={endpoint.apps}
        isAdmin={false}
        isMember={false}
        name="Hello World"
        planType={PayPlanType.PayAsYouGoV0}
        subscription={subscription}
      />,
    )

    expect(screen.getByText(schema.common.StopSubscription)).toBeInTheDocument()
    expect(screen.queryByText(schema.stopRemoveApp.removeApp)).not.toBeInTheDocument()
  })
  it("renders remove application for free tier plantype", () => {
    render(
      <StopRemoveApp
        appId="123"
        apps={endpoint.apps}
        isAdmin={false}
        isMember={false}
        name="Hello World"
        planType={PayPlanType.FreetierV0}
        subscription={subscription}
      />,
    )

    expect(screen.getByText(schema.stopRemoveApp.removeApp)).toBeInTheDocument()
    expect(screen.queryByText(schema.common.StopSubscription)).not.toBeInTheDocument()
  })
})
