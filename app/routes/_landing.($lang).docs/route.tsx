import { Box, Divider, Grid, IconCaretRight } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, json } from "@remix-run/node"
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react"
import { useEffect, useMemo, useRef, useState } from "react"
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
      filter: showOnlyPublished
        ? {
            status: { _eq: "published" },
          }
        : {},
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
      hasParent: true,
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
      hasParent: false,
    }))
}

function flattenTree(tree: LinksGroupProps[]) {
  let result: LinksGroupProps[] = []

  function dfs(node: LinksGroupProps) {
    result.push(node)
    for (let child of node.links) {
      dfs(child)
    }
  }

  for (let node of tree) {
    dfs(node)
  }

  return result
}

function nextNodeInTree(nodes: LinksGroupProps[], node: LinksGroupProps | undefined) {
  if (!node) return

  const next = nodes.findIndex((n) => n.id === node.id)
  if (next >= nodes.length - 1) return

  return nodes[next + 1]
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

  useEffect(() => {
    if (data && data.length) {
      const organizedData = organizeDataRef.current(data)
      setLinksGroupItems(organizedData)
    }
  }, [data])

  return (
    <Grid
      gutter="sm"
    >
      <Grid.Col lg={2} md={12}>
        {linksGroupItems && linksGroupItems.length ? (
          <Sidebar data={linksGroupItems} />
        ) : null}
      </Grid.Col>
      <Grid.Col lg={8} md={12}>
        <Outlet />
        {nextDoc && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Divider color="gray" mb="sm" mt="xl" sx={{ borderTopWidth: "0.03rem" }} />
            <Link style={{ display: "flex", alignSelf: "flex-end" }} to={nextDoc.link}>
              {nextDoc.label}
              <IconCaretRight />
            </Link>
          </Box>
        )}
      </Grid.Col>
    </Grid>
  )
}
