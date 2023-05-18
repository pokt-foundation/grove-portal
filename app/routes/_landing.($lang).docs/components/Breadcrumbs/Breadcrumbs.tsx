import { Breadcrumbs, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import { Link, useLocation } from "@remix-run/react"

interface BreadcrumbNode {
  link: string
  name: string
}

function formatBreadcrumbs(pathname: string): BreadcrumbNode[] {
  const parts = pathname.split("/").filter(Boolean)

  return parts.map((part, i) => ({
    name: part,
    link: `/${parts.slice(0, i + 1).join("/")}`,
  }))
}

const DocsBreadcrumbs = () => {
  const location = useLocation()
  const theme = useMantineTheme()

  const breadcrumbsData = formatBreadcrumbs(location.pathname || "")
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
