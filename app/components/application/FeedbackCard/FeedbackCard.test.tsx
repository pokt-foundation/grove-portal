import { expect } from "vitest"
import FeedbackCard from "./FeedbackCard"
import { render, screen } from "test/helpers"

describe("<FeedbackCard />", () => {
  it("renders card and links to discord", () => {
    render(<FeedbackCard />)

    const label = /share feedback/i

    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: label })).toHaveAttribute(
      "href",
      "https://discord.gg/portal-rpc",
    )
  })
})
