import { Breadcrumbs, Text, useMantineTheme } from "@pokt-foundation/pocket-blocks"
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
  const locations = location.pathname.split("/")
  locations.splice(0, 2)

  return locations.map((part) => {
    const linkNode = flattenedLinksTree.find((linkNode) => linkNode.slug === part)

    if (linkNode) {
      const hasLinks = linkNode.links && linkNode.links.length > 0
      return {
        link: !hasLinks ? linkNode.link : "",
        name: linkNode.label,
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
      {breadcrumbsData.map(({ name, link }, index) =>
        link ? (
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
        ) : (
          <Text key={index}>{name}</Text>
        ),
      )}
    </Breadcrumbs>
  ) : null
}

export default DocsBreadcrumbs
