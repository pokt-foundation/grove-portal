import { expect } from "vitest"
import englishText from "../../../../../locales/en"
import SecurityView from "./securityView"
import { render, screen } from "test/helpers"
import { endpoint, blockchains, profileMockData } from "~/models/portal/portal.data"

describe("<SecurityView />", () => {
  it("renders", () => {
    render(
      <SecurityView
        appId={"123123"}
        blockchains={blockchains}
        endpoint={endpoint}
        user={profileMockData}
      />,
    )
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
