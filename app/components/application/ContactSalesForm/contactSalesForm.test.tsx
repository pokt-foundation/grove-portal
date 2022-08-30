import { expect } from "vitest"
import ContactSalesForm from "./ContactSalesForm"
import { render, screen } from "test/helpers"

describe("<ContactSalesForm />", () => {
  it("renders", () => {
    render(<ContactSalesForm />)
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument()
  })
})
