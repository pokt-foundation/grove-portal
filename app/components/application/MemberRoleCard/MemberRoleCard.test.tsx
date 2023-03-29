import { expect } from "vitest"
import MemberRole from "./MemberRoleCard"
import { render, screen } from "test/helpers"
import { RoleName } from "~/models/portal/sdk"

describe("<MemberRoleCard />", () => {
  const role = RoleName.Owner
  it("renders role passed as props", () => {
    render(<MemberRole role={role} />)

    expect(screen.getByText(role)).toBeInTheDocument()
  })
})
