import { expect } from "vitest"
import SearchAutoCompleteItem from "./SearchAutoCompleteItem"
import { render, screen } from "test/helpers"

describe("SearchAutoCompleteItem", () => {
  const itemProps = {
    id: "1",
    translations: [
      { id: "1", title: "Title 1", summary: "Summary 1" },
      { id: "2", title: "Title 2", summary: "Summary 2" },
    ],
    status: "published",
    slug: "item-1",
    value: "value",
    label: "label",
  }

  it("renders the title and summary of the search item", () => {
    render(<SearchAutoCompleteItem {...itemProps} />)
    expect(screen.getByText("Title 1")).toBeInTheDocument()
    expect(screen.getByText("Summary 1")).toBeInTheDocument()
  })

  it("sets the display name to AutoCompleteSearchItem", () => {
    expect(SearchAutoCompleteItem.displayName).toBe("AutoCompleteSearchItem")
  })
})
