import { expect } from "vitest"
import NetworkPoktScanLatestBlockCard, { getList } from "./NetworkPoktScanLatestBlockCard"
import { render, screen } from "test/helpers"
import { latestBlock } from "~/models/poktscan/poktscan.data"

describe("<NetworkPoktScanLatestBlockCard />", () => {
  it("renders card and latest block details", () => {
    render(<NetworkPoktScanLatestBlockCard latestBlock={latestBlock} />)
    const list = getList(latestBlock)

    const header = /latest block/i
    expect(screen.getByRole("heading", { name: header })).toBeInTheDocument()

    list.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
      expect(screen.getByText(item.value)).toBeInTheDocument()
    })

    expect(screen.getByText(/powered by/i)).toBeInTheDocument()
  })
})
