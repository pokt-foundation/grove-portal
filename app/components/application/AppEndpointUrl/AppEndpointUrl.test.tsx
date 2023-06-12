import { expect } from "vitest"
import AppEndpointUrl from "./AppEndpointUrl"
import { render, screen, userEvent } from "test/helpers"
import { blockchains } from "~/models/portal/portal.data"

let chain = blockchains.find((c) => c.id === "0021")
let appId = "1234567890"
let inputValue = `https://${chain?.blockchain}.gateway.pokt.network/v1/lb/${appId}`
let gigastake = false
const handleRemove = vitest.fn()

beforeEach(() => {
  // reset defaults before each test
  chain = blockchains.find((c) => c.id === "0021")
  appId = "1234567890"
  inputValue = `https://${chain?.blockchain}.gateway.pokt.network/v1/lb/${appId}`
  gigastake = false
})

describe("<AppEndpointUrl />", () => {
  it("renders nothing if chainId is unknown", () => {
    chain = blockchains.find((c) => c.id === "0000")
    render(
      <AppEndpointUrl
        chain={chain}
        handleRemove={handleRemove}
        hasDelete={gigastake}
        value={inputValue}
      />,
    )
    const image = screen.queryByRole("img")
    const input = screen.queryByRole("textbox")
    const button = screen.queryByRole("button")

    expect(image).not.toBeInTheDocument()
    expect(input).not.toBeInTheDocument()
    expect(button).not.toBeInTheDocument()
  })
  it("loads url with chain image", () => {
    render(
      <AppEndpointUrl
        chain={chain}
        handleRemove={handleRemove}
        hasDelete={gigastake}
        value={inputValue}
      />,
    )
    const image = screen.getByRole("img", { name: String(chain?.description) })
    const input = screen.getByRole("textbox")

    expect(image).toBeInTheDocument()
    expect(input).toHaveValue(
      `https://${chain?.blockchain}.gateway.pokt.network/v1/lb/${appId}`,
    )
  })
  it("handles different chains", () => {
    chain = blockchains[2]
    inputValue = `https://${chain.blockchain}.gateway.pokt.network/v1/lb/${appId}`
    render(
      <AppEndpointUrl
        chain={chain}
        handleRemove={handleRemove}
        hasDelete={gigastake}
        value={inputValue}
      />,
    )
    const image = screen.getByRole("img", { name: String(chain.description) })
    const input = screen.getByRole("textbox")

    expect(image).toBeInTheDocument()
    expect(input).toHaveValue(
      `https://${chain.blockchain}.gateway.pokt.network/v1/lb/${appId}`,
    )
  })
  it("allows user to delete if gigastake is true", async () => {
    const user = userEvent.setup()
    gigastake = true
    render(
      <AppEndpointUrl
        chain={chain}
        handleRemove={handleRemove}
        hasDelete={gigastake}
        value={inputValue}
      />,
    )
    const button = screen.getAllByLabelText(/delete/i)[0]
    expect(button).toBeInTheDocument()

    await user.click(button)
    expect(handleRemove).toHaveBeenCalled()
  })
})
