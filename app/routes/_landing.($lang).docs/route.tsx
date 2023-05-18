import { Flex } from "@mantine/core"
import { AppShell } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, json } from "@remix-run/node"
import { Outlet, useLoaderData, useLocation } from "@remix-run/react"
import { useEffect, useMemo, useRef, useState } from "react"
import DocsBreadcrumbs from "./components/Breadcrumbs/Breadcrumbs"
import DocsFooter from "./components/footer/footer"
import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"
import { Sidebar } from "~/components/Sidebar/Sidebar"
import { initCmsClient } from "~/models/cms/cms.server"
import { documentation } from "~/models/cms/sdk"
import { flattenTree, nextNodeInTree, organizeData } from "~/utils/docs"
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
    <AppShell
      footer={nextDoc && <DocsFooter nextDoc={nextDoc} />}
      header={<div>Search container goes here...</div>}
      navbar={
        <>
          {linksGroupItems && linksGroupItems.length && (
            <Sidebar data={linksGroupItems} />
          )}
        </>
      }
    >
      <Flex direction="column" gap="sm" sx={{ maxWidth: "calc(100vw - 400px)" }}>
        <DocsBreadcrumbs />
        <Outlet />
      </Flex>
    </AppShell>
  )
}
