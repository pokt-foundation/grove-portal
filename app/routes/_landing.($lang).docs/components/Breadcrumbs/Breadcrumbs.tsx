import { Breadcrumbs, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import { Link, Location, useLocation } from "@remix-run/react"
import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"

interface BreadcrumbNode {
  link: string
  name: string
}

function formatBreadcrumbs(
  location: Location,
  flattenedLinksTree: LinksGroupProps[],
): BreadcrumbNode[] {
  const parts = location.pathname.split("/")
  parts.shift()

  return parts.map((part) => {
    const node = flattenedLinksTree.find((node) => node.slug === part)

    if (node) {
      return {
        link: node.link,
        name: node.label,
      }
    }

    if (part === "docs") {
      return {
        link: "/docs",
        name: "Documentation",
      }
    }

    return {
      link: part,
      name: part,
    }
  })
}

interface DocsBreadcrumbsProps {
  flattenedLinksTree: LinksGroupProps[]
}

const DocsBreadcrumbs = ({ flattenedLinksTree }: DocsBreadcrumbsProps) => {
  const location = useLocation()
  const theme = useMantineTheme()

  const breadcrumbsData = formatBreadcrumbs(location, flattenedLinksTree)
  return breadcrumbsData && breadcrumbsData.length ? (
    <Breadcrumbs>
      {breadcrumbsData.map(({ name, link }, index) => (
        <Link
          key={index}
          prefetch="intent"
          style={{
            color:
              index + 1 === breadcrumbsData.length
                ? theme.colors.blue[3]
                : theme.colors.gray[4],
          }}
          to={link}
        >
          {name}
        </Link>
      ))}
    </Breadcrumbs>
  ) : null
}

export default DocsBreadcrumbs
