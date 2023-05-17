import { Breadcrumbs, Grid, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, json } from "@remix-run/node"
import { Link, Outlet, useLoaderData, useLocation, useMatches } from "@remix-run/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { flattenTree, nextNodeInTree, organizeData } from "../../utils/docs"
import DocsFooter from "./components/footer/footer"
import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"
import { Sidebar } from "~/components/Sidebar/Sidebar"
import { initCmsClient } from "~/models/cms/cms.server"
import { documentation } from "~/models/cms/sdk"
import { getClientEnv } from "~/utils/environment.server"

type LoaderData = {
  data: documentation[]
}

export const loader: LoaderFunction = async ({ params }) => {
  const routelang = params.lang !== undefined ? params.lang : "en-US"
  const cms = initCmsClient()
  const showOnlyPublished = getClientEnv().DOCS_STATUS === "published"

  try {
    const doc = await cms.getDocs({
      filter: {
        ...(showOnlyPublished && { status: { _eq: "published" } }),
      },
      sort: ["id"],
      language: routelang,
    })

    return json<LoaderData>({
      data: doc.documentation,
    })
  } catch (e) {
    console.error(`Docs error in ${params.slug}: `, e)
    throw new Error(`Error: ${e}`)
  }
}

interface BreadcrumbNode {
  link: string
  name: string
}

function formatBreadcrumbs(matchesRoute: Array<{ pathname: string }>): BreadcrumbNode[] {
  const { pathname } = matchesRoute[matchesRoute.length - 1]

  const parts = pathname.split("/").filter(Boolean)

  return parts.map((part, i) => ({
    name: part,
    link: `/${parts.slice(0, i + 1).join("/")}`,
  }))
}

export default function DocsLayout() {
  const { data }: LoaderData = useLoaderData()
  const [linksGroupItems, setLinksGroupItems] = useState<LinksGroupProps[]>([])
  const organizeDataRef = useRef(organizeData)
  const location = useLocation()

  const flattenedTree = useMemo(() => flattenTree(linksGroupItems), [linksGroupItems])
  const nextDoc = nextNodeInTree(
    flattenedTree,
    flattenedTree.find((ft) => location.pathname.includes(ft.slug)),
  )

  const theme = useMantineTheme()

  const matches = useMatches()
  const breadcrumbsData = formatBreadcrumbs(matches || [])

  useEffect(() => {
    if (data && data.length) {
      const organizedData = organizeDataRef.current(data)
      setLinksGroupItems(organizedData)
    }
  }, [data])

  return (
    <Grid gutter="sm">
      <Grid.Col lg={2} md={12}>
        {linksGroupItems && linksGroupItems.length ? (
          <Sidebar data={linksGroupItems} />
        ) : null}
      </Grid.Col>
      <Grid.Col lg={8} md={12}>
        {breadcrumbsData && breadcrumbsData.length ? (
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
        ) : null}
        <Outlet />
        {nextDoc && <DocsFooter nextDoc={nextDoc} />}
      </Grid.Col>
    </Grid>
  )
}
