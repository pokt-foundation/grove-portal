import { expect } from "vitest"
import AppOverSessionLimitCard from "./AppOverSessionLimitCard"
import { render, screen } from "test/helpers"

describe("<AppOverSessionLimitCard />", () => {
  it("renders card with limit message if exceedsMaxRelays and exceedsSessionRelays are true", () => {
    render(
      <AppOverSessionLimitCard exceedsMaxRelays={true} exceedsSessionRelays={true} />,
    )

    expect(
      screen.getByRole("heading", { name: /session limit reached/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /contact pokt team/i })).toBeInTheDocument()
  })
  it("renders card with limit message if exceedsMaxRelays is true", () => {
    render(<AppOverSessionLimitCard exceedsMaxRelays={true} />)

    expect(
      screen.getByRole("heading", { name: /session limit reached/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /contact pokt team/i })).toBeInTheDocument()
  })
  it("renders card with limit message if exceedsSessionRelays is true", () => {
    render(<AppOverSessionLimitCard exceedsSessionRelays={true} />)

    expect(
      screen.getByRole("heading", { name: /session limit reached/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /contact pokt team/i })).toBeInTheDocument()
  })
  it("renders nothing if exceedsMaxRelays and exceedsSessionRelays are false", () => {
    render(<AppOverSessionLimitCard />)

    expect(
      screen.queryByRole("heading", { name: /session limit reached/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole("link", { name: /contact pokt team/i }),
    ).not.toBeInTheDocument()
  })
})
