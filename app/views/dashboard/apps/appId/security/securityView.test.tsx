import { expect } from "vitest"
import schema from "../../../../../locales/en"
import SecurityView from "./securityView"
import { render, screen } from "test/helpers"
import { endpoint } from "~/models/portal/portal.data"

describe("<SecurityView />", () => {
  it("renders", () => {
    render(<SecurityView appId={"123123"} endpoint={endpoint} />)
    expect(
      screen.getByRole("heading", { level: 3, name: schema.security.headings.secretKey }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: schema.security.headings.approvedChains,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { level: 3, name: schema.security.headings.contracts }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { level: 3, name: schema.security.headings.methods }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { level: 3, name: schema.security.headings.origins }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: schema.security.headings.userAgents,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(schema.security.secretKeyText)).toBeInTheDocument()
  })
})
