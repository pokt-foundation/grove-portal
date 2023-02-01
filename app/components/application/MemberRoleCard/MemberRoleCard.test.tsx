import { expect } from "vitest"
import MemberRole from "./MemberRoleCard"
import { render, screen } from "test/helpers"

describe("<MemberRoleCard />", () => {
  const role = "Owner"
  it("renders role passed as props", () => {
    render(<MemberRole role={role} />)

    expect(screen.getByText(role)).toBeInTheDocument()
  })
})
