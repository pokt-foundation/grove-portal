import { expect } from "vitest"
import AppAddressCard from "./AppAddressCard"
import { fireEvent, render, screen } from "test/helpers"
import schema from "~/locales/en"
import { ProcessedEndpoint } from "~/models/portal/sdk"

let apps: ProcessedEndpoint["apps"] = [
  { appId: "123", address: "", publicKey: "" },
  { appId: "234", address: "", publicKey: "" },
]
const value1 = apps[0]?.appId ?? ""
const value2 = apps[1]?.appId ?? ""

describe("<AppAddressCard />", () => {
  it("renders applications passed to it", () => {
    render(<AppAddressCard apps={apps} />)
    expect(screen.getByDisplayValue(value1)).toBeInTheDocument()
    expect(screen.getByDisplayValue(value2)).toBeInTheDocument()
  })
  it("renders heading", () => {
    render(<AppAddressCard apps={apps} />)
    const heading = schema.appAddressCard.heading
    expect(screen.getByText(heading)).toBeInTheDocument()
  })
  it("renders number of Apps", () => {
    render(<AppAddressCard apps={apps} />)
    const numberOfApps = "2"
    expect(screen.getByText(numberOfApps)).toBeInTheDocument()
  })
  it("hides extra apps when there are more than 3 and allows users to expand", async () => {
    apps?.push({ appId: "345", address: "", publicKey: "" })
    apps?.push({ appId: "456", address: "", publicKey: "" })
    render(<AppAddressCard apps={apps} />)
    const numberOfApps = "4"
    expect(screen.getByText(numberOfApps)).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Expand Applications" }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Expand Applications" }))

    expect(
      screen.getByRole("button", { name: "Collapse Applications" }),
    ).toBeInTheDocument()
  })
  it("renders Errortext when no apps found", () => {
    render(<AppAddressCard apps={[]} />)
    const errorText = schema.appAddressCard.error
    expect(screen.getByText(errorText)).toBeInTheDocument()
  })
})
