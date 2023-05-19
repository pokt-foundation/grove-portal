import { Flex } from "@mantine/core"
import { AppShell } from "@pokt-foundation/pocket-blocks"
import { json, LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData, useLocation } from "@remix-run/react"
import { useEffect, useMemo, useRef, useState } from "react"
import DocsBreadcrumbs from "./components/Breadcrumbs/Breadcrumbs"
import DocsFooter from "./components/footer/footer"
import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"
import { Sidebar } from "~/components/Sidebar/Sidebar"
import { initCmsClient } from "~/models/cms/cms.server"
import { documentation } from "~/models/cms/sdk"
import DocumentationSearch from "~/routes/_landing.($lang).docs/components/DocumentationSearch"
import { flattenTree, nextNodeInTree, organizeData } from "~/utils/docs"
import { getClientEnv } from "~/utils/environment.server"

type LoaderData = {
  data: documentation[]
}

export const loader: LoaderFunction = async ({ params }) => {
  const routeLang = params.lang ?? "en-US"
  const cms = initCmsClient()
  const showOnlyPublished = getClientEnv().DOCS_STATUS === "published"

  try {
    const doc = await cms.getDocs({
      filter: {
        ...(showOnlyPublished && { status: { _eq: "published" } }),
      },
      sort: ["id"],
      language: routeLang,
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

  const flattenedLinksTree = useMemo(
    () => flattenTree(linksGroupItems),
    [linksGroupItems],
  )
  const nextDoc = nextNodeInTree(
    flattenedLinksTree,
    flattenedLinksTree.find((ft) => location.pathname.includes(ft.slug)),
  )

  useEffect(() => {
    if (data && data.length) {
      const organizedData = organizeDataRef.current(data)
      setLinksGroupItems(organizedData)
    }
  }, [data])

  return (
    <AppShell
      navbar={
        <>
          {linksGroupItems && linksGroupItems.length ? (
            <Sidebar data={linksGroupItems} />
          ) : null}
        </>
      }
      styles={() => ({
        body: { overflowY: "hidden" },
      })}
    >
      <Flex direction="column" gap="sm" sx={{ maxWidth: "calc(100vw - 400px)" }}>
        <Flex align="center" justify="flex-end" sx={{ zIndex: 1200 }}>
          <DocumentationSearch />
        </Flex>
        <DocsBreadcrumbs flattenedLinksTree={flattenedLinksTree} />
        <Outlet />
        {nextDoc && <DocsFooter nextDoc={nextDoc} />}
      </Flex>
    </AppShell>
  )
}
