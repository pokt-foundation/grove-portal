import { expect } from "vitest"
import AppAddressCard from "./AppAddressCard"
import { fireEvent, render, screen, userEvent, waitFor } from "test/helpers"
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
    const extraApps = apps?.concat([
      { appId: "345", address: "", publicKey: "" },
      { appId: "456", address: "", publicKey: "" },
    ])
    render(<AppAddressCard apps={extraApps} />)
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
  it("displays show, hide and copy buttons properly", () => {
    render(<AppAddressCard apps={apps} />)
    const showText = /Click to show value/i
    const hideText = /Click to hide value/i
    const copyText = /Click to copy/i
    expect(screen.getAllByLabelText(showText)).toHaveLength(2)
    expect(screen.queryByLabelText(hideText)).not.toBeInTheDocument()
    expect(screen.getAllByLabelText(copyText)).toHaveLength(2)
  })
  it("shows and hides from revealIcon", async () => {
    render(<AppAddressCard apps={apps} />)
    const user = userEvent.setup()
    const showText = /Click to show value/i
    const hideText = /Click to hide value/i
    expect(screen.getAllByLabelText(showText)).toHaveLength(2)
    expect(screen.queryByLabelText(hideText)).not.toBeInTheDocument()

    // click one of the show buttons
    user.click(screen.getAllByLabelText(showText)[0])
    await waitFor(() => {
      expect(screen.getByLabelText(hideText)).toBeInTheDocument()
    })

    // click the remaining show button
    user.click(screen.getAllByLabelText(showText)[0])
    await waitFor(() => {
      expect(screen.getAllByLabelText(hideText)).toHaveLength(2)
    })

    // click both hide buttons
    user.click(screen.getAllByLabelText(hideText)[0])
    user.click(screen.getAllByLabelText(hideText)[1])
    await waitFor(() => {
      expect(screen.getAllByLabelText(showText)).toHaveLength(2)
    })
  })
})
