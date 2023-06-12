import { Pagination, Group } from "@pokt-foundation/pocket-blocks"
import { render } from "@testing-library/react"
import { MockedFunction } from "vitest"
import { TablePagination } from "./TablePagination"
import { userEvent } from "test/helpers"

interface PocketBlocksModule {
  Pagination: typeof Pagination
  Group: typeof Group
}

vi.mock("@pokt-foundation/pocket-blocks", async () => {
  const actual = (await vi.importActual(
    "@pokt-foundation/pocket-blocks",
  )) as PocketBlocksModule
  return {
    ...actual,
    Pagination: vi.fn(),
  }
})

describe("TablePagination", () => {
  let onPageChange: MockedFunction<(page: number) => void>

  beforeEach(() => {
    onPageChange = vi.fn()
    ;(Pagination as MockedFunction<typeof Pagination>).mockImplementation(
      ({ onChange }) => {
        return <div onClick={() => onChange && onChange(2)}>Mocked Pagination</div>
      },
    )
  })

  it("renders correctly", async () => {
    render(<TablePagination page={1} totalPages={5} onPageChange={onPageChange} />)

    const paginationGroup = document.querySelector(".pokt-table-paginate")
    expect(paginationGroup).toBeInTheDocument()
  })

  it("calls onPageChange when page is changed", async () => {
    const user = userEvent.setup()
    render(<TablePagination page={1} totalPages={5} onPageChange={onPageChange} />)

    const pagination = document.querySelector(".pokt-table-paginate div")
    if (pagination) {
      await user.click(pagination)
    }

    expect(onPageChange.mock.calls.length).toBe(1)
    expect(onPageChange.mock.calls[0][0]).toBe(2)
  })
})
