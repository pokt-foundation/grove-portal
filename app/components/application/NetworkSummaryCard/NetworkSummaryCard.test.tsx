import { expect } from "vitest"
import NetworkSummaryCard from "./NetworkSummaryCard"
import { render, screen } from "test/helpers"

describe("<NetworkSummaryCard />", () => {
  it("renders card and props", () => {
    const imgSrc = "/networkSummaryNodes.png"
    const subtitle = "7000+"
    const title = "Nodes Staked"

    render(<NetworkSummaryCard imgSrc={imgSrc} subtitle={subtitle} title={title} />)

    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument()
    expect(screen.getByText(subtitle)).toBeInTheDocument()
  })
})
