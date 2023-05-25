import { screen } from "@testing-library/react"
import { TableBody } from "./TableBody"
import { render } from "test/helpers"
import { TableBodyProps } from "~/types/table"

describe("TableBody", () => {
  it("renders empty search message if no data is provided", () => {
    const data: TableBodyProps["data"] = []
    render(<TableBody data={data} paginatedData={data} rowAsLink={false} />)
    expect(screen.getByText("Nothing found.")).toBeInTheDocument()
  })

  it("renders data rows if paginatedData is provided", () => {
    const paginatedData = [
      { id: "1", name: "Mock 1", value: 123 },
      { id: "2", name: "Mock 2", value: 234 },
    ]
    const data = [
      { id: "1", name: "Mock 1", value: 345 },
      { id: "2", name: "Mock 2", value: 456 },
      { id: "3", name: "Mock 3", value: 567 },
    ]
    render(<TableBody data={data} paginatedData={paginatedData} rowAsLink={true} />)
    expect(screen.getByText("Mock 1")).toBeInTheDocument()
    expect(screen.getByText("Mock 2")).toBeInTheDocument()
    expect(screen.getByText("123")).toBeInTheDocument()
    expect(screen.getByText("234")).toBeInTheDocument()
  })
})
