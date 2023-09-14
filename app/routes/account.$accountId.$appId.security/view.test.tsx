import { expect } from "vitest"
import englishText from "../../locales/en"
import SecurityView from "./view"
import { render, screen } from "test/helpers"
import { app, blockchains } from "~/models/portal/portal.data"

describe.skip("<SecurityView />", () => {
  it("renders", () => {
    render(<SecurityView app={app} blockchains={blockchains} />)
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: englishText.security.headings.secretKey,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: englishText.security.headings.approvedChains,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: englishText.security.headings.contracts,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: englishText.security.headings.methods,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: englishText.security.headings.origins,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: englishText.security.headings.userAgents,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(englishText.security.secretKeyText)).toBeInTheDocument()
  })
})
