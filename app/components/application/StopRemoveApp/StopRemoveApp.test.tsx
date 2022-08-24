import { expect } from "vitest"
import StopRemoveApp from "./StopRemoveApp"
import { render, screen } from "test/helpers"

describe("<AppKeysCard />", () => {
  it("renders application id", () => {
    render(<StopRemoveApp endpointId={"123"} planType="paid" />)

    // expect(screen.getByText(label)).toBeInTheDocument()
    // expect(screen.getByRole("textbox", { name: label })).toHaveValue(id)
  })
})
