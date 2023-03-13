import { expect } from "vitest"
import AppKeysCard from "./AppKeysCard"
import { render, screen, userEvent, waitFor } from "test/helpers"

const id = "123"
const secret = "456"
const publicKey = "789"

describe("<AppKeysCard />", () => {
  it("renders application id", () => {
    render(<AppKeysCard id={id} isMember={false}/>)

    const label = /portal id/i

    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: label })).toHaveValue(id)
  })
  it("renders nothing for secret key if not passed", () => {
    render(<AppKeysCard id={id} isMember={false}/>)

    const label = /secret key/i

    expect(screen.queryByText(label)).not.toBeInTheDocument()
    expect(screen.queryByRole("textbox", { name: label })).not.toBeInTheDocument()
  })
  it("renders secret key", () => {
    render(<AppKeysCard id={id} isMember={false} secret={secret}/>)

    const label = /secret key/i

    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByLabelText(label)).toHaveValue(secret)
  })
  it("renders nothing for public key if not passed", () => {
    render(<AppKeysCard id={id} isMember={false}/>)

    const label = /public key/i

    expect(screen.queryByText(label)).not.toBeInTheDocument()
    expect(screen.queryByRole("textbox", { name: label })).not.toBeInTheDocument()
  })
  it("renders public key", () => {
    render(<AppKeysCard id={id} isMember={false} publicKey={publicKey}/>)

    const label = /public key/i

    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByLabelText(label)).toHaveValue(publicKey)
  })
  it("displays inputs properly", () => {
    render(<AppKeysCard id={id} isMember={false} publicKey={publicKey} secret={secret}/>)
    const showText = /Click to show value/i
    const hideText = /Click to hide value/i
    const copyText = /Click to copy/i
    expect(screen.getAllByLabelText(showText)).toHaveLength(2)
    expect(screen.queryByLabelText(hideText)).not.toBeInTheDocument()
    expect(screen.getAllByLabelText(copyText)).toHaveLength(3)
  })
  it("shows and hides from revealIcon", async () => {
    render(<AppKeysCard id={id} isMember={false} publicKey={publicKey} secret={secret}/>)
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
    user.click(screen.getAllByLabelText(hideText)[1])
    user.click(screen.getAllByLabelText(hideText)[0])
    await waitFor(() => {
      expect(screen.getAllByLabelText(showText)).toHaveLength(2)
    })
  })
})
