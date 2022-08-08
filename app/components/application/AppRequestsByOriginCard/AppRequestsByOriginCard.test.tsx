import { expect } from "vitest"
import AppRequestsByOriginCard from "./AppRequestsByOriginCard"
import { axe, render, screen } from "test/helpers"

let totalRelays = 13474836
let usagePerOrigin = [
  {
    origin: "null",
    count: 18241,
  },
  {
    origin: "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn",
    count: 15407,
  },
  {
    origin: "https://app.apexnodes.io",
    count: 14573,
  },
  {
    origin: "https://maker.coinquoter.com",
    count: 8462,
  },
]

describe("<AppRequestsByOriginCard />", () => {
  it("renders", () => {
    render(
      <AppRequestsByOriginCard
        totalRelays={totalRelays}
        usagePerOrigin={usagePerOrigin}
      />,
    )
    expect(
      screen.getByRole("heading", { name: /requests by origin/i }),
    ).toBeInTheDocument()
  })
  it("meets minimum accessible requirements", async () => {
    const { container } = render(
      <AppRequestsByOriginCard
        totalRelays={totalRelays}
        usagePerOrigin={usagePerOrigin}
      />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
