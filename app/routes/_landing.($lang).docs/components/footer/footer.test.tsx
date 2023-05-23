import { expect } from "vitest"
import DocsFooter from "./footer"
import { render, screen } from "test/helpers"
import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"

const mockItems: LinksGroupProps[] = [
  {
    id: "1",
    slug: "slug1",
    label: "Label1",
    link: "/link1",
    links: [],
  },
  {
    id: "2",
    slug: "slug2",
    label: "Label2",
    link: "/link2",
    links: [],
  },
  {
    id: "3",
    slug: "slug3",
    label: "Label3",
    link: "/link3",
    links: [],
  },
]

describe("DocsFooter", () => {
  it("should render without crashing", () => {
    render(<DocsFooter items={mockItems} pathname="/slug2" />)
    expect(screen.getByRole("separator")).toBeInTheDocument()
  })

  it("should render previous link if exists", () => {
    render(<DocsFooter items={mockItems} pathname="/slug2" />)
    expect(screen.getByText(/Label1/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Label1/i })).toHaveAttribute(
      "href",
      "/link1",
    )
  })

  it("should render next link if exists", () => {
    render(<DocsFooter items={mockItems} pathname="/slug2" />)
    expect(screen.getByText(/Label3/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Label3/i })).toHaveAttribute(
      "href",
      "/link3",
    )
  })

  it("should not render previous link if not exists", () => {
    render(<DocsFooter items={mockItems} pathname="/slug1" />)
    expect(screen.queryByText(/Label1250/i)).not.toBeInTheDocument()
  })

  it("should not render next link if not exists", () => {
    render(<DocsFooter items={mockItems} pathname="/slug3" />)
    expect(screen.queryByText(/Label1248/i)).not.toBeInTheDocument()
  })
})
