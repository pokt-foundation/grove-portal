import { expect } from "vitest"
import ContactSalesForm from "./ContactSalesForm"
import { render, screen } from "test/helpers"
import { blockchains } from "~/models/portal/portal.data"

describe("<ContactSalesForm />", () => {
  it("renders", () => {
    render(<ContactSalesForm loaderData={{ blockchains: blockchains }} />)
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument()
  })
})
