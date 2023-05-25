import { render, fireEvent } from "@testing-library/react"
import { TableHeader } from "./TableHeader"

describe("TableHeader component", () => {
  const mockColumns = ["id", "name"]
  const mockSetSearchTerm = vi.fn()

  it("renders without crashing", () => {
    const { container } = render(
      <TableHeader
        columns={mockColumns}
        label={"Test Label"}
        setSearchTerm={mockSetSearchTerm}
      />,
    )
    expect(container.firstChild).toHaveClass("pokt-table-header")
  })

  it("receives and displays label prop", () => {
    const { getByText } = render(
      <TableHeader
        columns={mockColumns}
        label={"Test Label"}
        setSearchTerm={mockSetSearchTerm}
      />,
    )
    expect(getByText("Test Label")).toBeInTheDocument()
  })

  it("renders search input if search prop is true", () => {
    const { getByLabelText } = render(
      <TableHeader
        columns={mockColumns}
        label={"Test Label"}
        search={true}
        setSearchTerm={mockSetSearchTerm}
      />,
    )
    expect(getByLabelText(`Search by ${mockColumns.join(", ")}`)).toBeInTheDocument()
  })

  it("calls setSearchTerm when search input changes", () => {
    const { getByLabelText } = render(
      <TableHeader
        columns={mockColumns}
        label={"Test Label"}
        search={true}
        setSearchTerm={mockSetSearchTerm}
      />,
    )

    fireEvent.change(getByLabelText(`Search by ${mockColumns.join(", ")}`), {
      target: { value: "Test value" },
    })
    expect(mockSetSearchTerm).toHaveBeenCalledWith("Test value")
  })
})
