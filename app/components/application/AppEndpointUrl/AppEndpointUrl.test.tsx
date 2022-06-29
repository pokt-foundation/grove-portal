import { expect } from "vitest"
import AppEndpointUrl from "./AppEndpointUrl"
import { render, screen, userEvent } from "test/helpers"
import { ChainMetadata, prefixFromChainId } from "~/utils/chainUtils"

let chainId = "0021"
let { prefix, name } = prefixFromChainId(chainId) as ChainMetadata
let appId = "1234567890"
let inputValue = `https://${prefix}.gateway.pokt.network/v1/lb/${appId}`
let gigastake = false
const handleRemove = vitest.fn()

beforeEach(() => {
  // reset defaults before each test
  chainId = "0021"
  ;({ prefix, name } = prefixFromChainId(chainId) as ChainMetadata)
  appId = "1234567890"
  inputValue = `https://${prefix}.gateway.pokt.network/v1/lb/${appId}`
  gigastake = false
})

describe("<AppEndpointUrl />", () => {
  it("renders nothing if chainId is unknown", () => {
    chainId = "0000"
    render(
      <AppEndpointUrl
        chainId={chainId}
        inputValue={inputValue}
        hasDelete={gigastake}
        handleRemove={handleRemove}
      />,
    )
    const image = screen.queryByRole("img", { name: name })
    const input = screen.queryByRole("textbox")
    const button = screen.queryByRole("button")

    expect(image).not.toBeInTheDocument()
    expect(input).not.toBeInTheDocument()
    expect(button).not.toBeInTheDocument()
  })
  it("loads url with chain image", () => {
    render(
      <AppEndpointUrl
        chainId={chainId}
        inputValue={inputValue}
        hasDelete={gigastake}
        handleRemove={handleRemove}
      />,
    )
    const image = screen.getByRole("img", { name: name })
    const input = screen.getByRole("textbox")
    const button = screen.queryByRole("button")

    expect(image).toBeInTheDocument()
    expect(input).toHaveValue(`https://${prefix}.gateway.pokt.network/v1/lb/${appId}`)
    expect(button).not.toBeInTheDocument()
  })
  it("handles different chains", () => {
    chainId = "0003"
    ;({ prefix, name } = prefixFromChainId(chainId) as ChainMetadata)
    inputValue = `https://${prefix}.gateway.pokt.network/v1/lb/${appId}`
    render(
      <AppEndpointUrl
        chainId={chainId}
        inputValue={inputValue}
        hasDelete={gigastake}
        handleRemove={handleRemove}
      />,
    )
    const image = screen.getByRole("img", { name: name })
    const input = screen.getByRole("textbox")
    const button = screen.queryByRole("button")

    expect(image).toBeInTheDocument()
    expect(input).toHaveValue(`https://${prefix}.gateway.pokt.network/v1/lb/${appId}`)
    expect(button).not.toBeInTheDocument()
  })
  it("allows user to delete if gigastake is true", async () => {
    const user = userEvent.setup()
    gigastake = true
    render(
      <AppEndpointUrl
        chainId={chainId}
        inputValue={inputValue}
        hasDelete={gigastake}
        handleRemove={handleRemove}
      />,
    )
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()

    await user.click(button)
    expect(handleRemove).toHaveBeenCalled()
  })
})
