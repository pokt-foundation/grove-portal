import { render, fireEvent, screen } from "@testing-library/react"
import { TableHeader } from "./TableHeader"
import { userEvent } from "test/helpers"

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
    render(
      <TableHeader
        columns={mockColumns}
        label={"Test Label"}
        setSearchTerm={mockSetSearchTerm}
      />,
    )
    expect(screen.getByText("Test Label")).toBeInTheDocument()
  })

  it("renders search input if search prop is true", () => {
    render(
      <TableHeader
        columns={mockColumns}
        label={"Test Label"}
        search={true}
        setSearchTerm={mockSetSearchTerm}
      />,
    )
    expect(
      screen.getByLabelText(`Search by ${mockColumns.join(", ")}`),
    ).toBeInTheDocument()
  })

  it("calls setSearchTerm when search input changes", () => {
    const user = userEvent.setup()
    render(
      <TableHeader
        columns={mockColumns}
        label={"Test Label"}
        search={true}
        setSearchTerm={mockSetSearchTerm}
      />,
    )

    fireEvent.change(screen.getByLabelText(`Search by ${mockColumns.join(", ")}`), {
      target: { value: "Test value" },
    })
    expect(mockSetSearchTerm).toHaveBeenCalledWith("Test value")
  })
})
