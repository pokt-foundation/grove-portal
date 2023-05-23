import { expect } from "vitest"
import LinksGroup from "./LinksGroup"
import { render, screen } from "test/helpers"
import { List } from "@pokt-foundation/pocket-blocks"

const props = {
  id: "1",
  label: "mock lable 1",
  link: "/mock-link-1",
  links: [
    {
      id: "2",
      label: "mock lable 2",
      link: "/mock-link-2",
      links: [],
      slug: "/mock-slug-2",
    },
  ],
  slug: "/mock-slug-1",
}

describe("LinksGroup", () => {
  it("renders LinksGroup when rendered inside List component", () => {
    render(
      <List>
        <LinksGroup {...props} />
      </List>,
    )
    expect(screen.getByText("mock lable 1")).toBeInTheDocument()
  })
})
