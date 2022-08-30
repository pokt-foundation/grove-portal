import { expect } from "vitest"
import SecurityView from "./securityView"
import { render, screen } from "test/helpers"
import { endpoint } from "~/models/portal/portal.data"
import schema from "../../../../../locales/en"

describe("<SecurityView />", () => {
  it("renders", () => {
    render(<SecurityView endpoint={endpoint} appId={"123123"} />)
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
