import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { Table } from "./Table"

describe("Table component", () => {
  const mockData = [
    { id: 1, name: "Mock Item 1" },
    { id: 2, name: "Mock Item 2" },
  ]
  const mockColumns = ["id", "name"]

  it("renders without crashing", () => {
    const { container } = render(
      <Table
        columns={mockColumns}
        data={mockData}
        label={"Test Label"}
        paginate={true}
        search={true}
      />,
    )
    expect(container.firstChild).toHaveClass("pokt-table")
  })

  it("receives necessary props", () => {
    const { getByText } = render(
      <Table
        columns={mockColumns}
        data={mockData}
        label={"Test Label"}
        paginate={true}
        search={true}
      />,
    )
    expect(getByText("Test Label")).toBeInTheDocument()
  })

  it("renders the correct number of rows", () => {
    const { getAllByRole } = render(
      <Table
        columns={mockColumns}
        data={mockData}
        label={"Test Label"}
        paginate={true}
        search={true}
      />,
    )
    const rows = getAllByRole("row")
    expect(rows).toHaveLength(mockData.length + 1)
  })
})
