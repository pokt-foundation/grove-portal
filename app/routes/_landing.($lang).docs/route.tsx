import { Box, Breadcrumbs, Grid, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, json } from "@remix-run/node"
import { Link, Outlet, useLoaderData, useMatches } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"
import { Sidebar } from "~/components/Sidebar/Sidebar"
import { initCmsClient } from "~/models/cms/cms.server"
import { documentation } from "~/models/cms/sdk"

type LoaderData = {
  data: documentation[]
}

export const loader: LoaderFunction = async ({ params }) => {
  const routelang = params.lang !== undefined ? params.lang : "en-US"
  const cms = initCmsClient()

  try {
    const doc = await cms.getDocs({
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

const findChildren = (docId: string, docs: documentation[]): LinksGroupProps[] => {
  return docs
    .filter((doc) => doc.parent?.id === docId)
    .map((doc) => ({
      id: doc.id,
      label: doc.translations?.[0]?.title || "",
      link: doc.slug || "",
      slug: doc.slug || "",
      links: findChildren(doc.id, docs),
    }))
}

const organizeData = (docs: documentation[]): LinksGroupProps[] => {
  return docs
    .filter((doc) => !doc.parent)
    .map((doc) => ({
      id: doc.id,
      label: doc.translations?.[0]?.title || "",
      link: doc.slug || "",
      slug: doc.slug || "",
      links: findChildren(doc.id, docs),
    }))
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
    <Grid
      gutter="md"
      sx={{
        alignItems: "flex-start",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
      }}
    >
      {linksGroupItems && linksGroupItems.length ? (
        <Sidebar data={linksGroupItems} />
      ) : null}
      <Box ml="56px">
        {breadcrumbsData && breadcrumbsData.length ? (
          <Breadcrumbs>
            {breadcrumbsData.map(({ name, link }, index) => (
              <Link
                key={index}
                to={link}
                style={{
                  color:
                    index + 1 === breadcrumbsData.length
                      ? theme.colors.blue[3]
                      : theme.colors.gray[4],
                }}
              >
                {name}
              </Link>
            ))}
          </Breadcrumbs>
        ) : null}
        <Outlet />
      </Box>
    </Grid>
  )
}
