import { expect } from "vitest"
import AppAddressCard from "./AppAddressCard"
import { render, screen } from "test/helpers"

const apps = [{ appId: "123" }, { appId: "234" }]

describe("<AppAddressCard />", () => {
  it("renders applications passed to it", () => {
    render(<AppAddressCard apps={apps} />)
    const value1 = "123"
    const value2 = "234"
    expect(screen.getByDisplayValue(value1)).toBeInTheDocument()
    expect(screen.getByDisplayValue(value2)).toBeInTheDocument()
  })
  it("renders heading", () => {
    render(<AppAddressCard apps={apps} />)
    const heading = "POKT App Addresses"
    expect(screen.queryByText(heading)).toBeInTheDocument()
  })
  it("renders number of Apps", () => {
    render(<AppAddressCard apps={apps} />)
    const numberOfApps = "2"
    expect(screen.queryByText(numberOfApps)).toBeInTheDocument()
  })
  it("renders number of Apps", () => {
    render(<AppAddressCard apps={apps} />)
    const numberOfApps = "2"
    expect(screen.queryByText(numberOfApps)).toBeInTheDocument()
  })

  it("renders Errortext when no apps found", () => {
    render(<AppAddressCard apps={[]} />)
    const errorText = "No apps found."
    expect(screen.queryByText(errorText)).toBeInTheDocument()
  })
})
