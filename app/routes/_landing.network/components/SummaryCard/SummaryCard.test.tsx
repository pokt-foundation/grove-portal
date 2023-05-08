import { expect } from "vitest"
import SummaryCard from "./SummaryCard"
import { render, screen } from "test/helpers"

describe("<SummaryCard />", () => {
  it("renders card and props", () => {
    const imgSrc = "/networkSummaryNodes.png"
    const subtitle = "7000+"
    const title = "Nodes Staked"

    render(<SummaryCard imgSrc={imgSrc} subtitle={subtitle} title={title} />)

    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument()
    expect(screen.getByText(subtitle)).toBeInTheDocument()
  })
})
