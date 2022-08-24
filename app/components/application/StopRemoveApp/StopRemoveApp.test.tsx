import { expect } from "vitest"
import StopRemoveApp from "./StopRemoveApp"
import { render, screen } from "test/helpers"
import { PayPlanType } from "~/models/portal/sdk"

describe("<AppKeysCard />", () => {
  it("renders application id", () => {
    render(<StopRemoveApp endpointId={"123"} planType={PayPlanType.PayAsYouGoV0} />)

    // expect(screen.getByText(label)).toBeInTheDocument()
    // expect(screen.getByRole("textbox", { name: label })).toHaveValue(id)
  })
})
