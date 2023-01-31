import { expect } from "vitest"
import { render, screen } from "test/helpers"
import MemberRole from "./MemberRoleCard"

describe("<MemberRoleCard />", () => {
  const role = "Owner"
  it("renders role passed as props", () => {
    render(<MemberRole role={role} />)

    expect(screen.getByText(role)).toBeInTheDocument()
  })
})
