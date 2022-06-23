import AppKeysCard from "./AppKeysCard"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

let id = "123"
let secret = "456"
let publicKey = "789"

beforeEach(() => {
  // reset defaults before each test
})

describe("<AppKeysCard />", () => {
  it("renders application id", () => {
    render(<AppKeysCard id={id} />)

    const label = /portal id/i

    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: label })).toHaveValue(id)
  })
  it("renders nothing for secret key if not passed", () => {
    render(<AppKeysCard id={id} />)

    const label = /secret key/i

    expect(screen.queryByText(label)).not.toBeInTheDocument()
    expect(screen.queryByRole("textbox", { name: label })).not.toBeInTheDocument()
  })
  it("renders secret key", () => {
    render(<AppKeysCard id={id} secret={secret} />)

    const label = /secret key/i

    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByLabelText(label)).toHaveValue(secret)
  })
  it("renders nothing for public key if not passed", () => {
    render(<AppKeysCard id={id} />)

    const label = /public key/i

    expect(screen.queryByText(label)).not.toBeInTheDocument()
    expect(screen.queryByRole("textbox", { name: label })).not.toBeInTheDocument()
  })
  it("renders public key", () => {
    render(<AppKeysCard id={id} publicKey={publicKey} />)

    const label = /public key/i

    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByLabelText(label)).toHaveValue(publicKey)
  })
})
