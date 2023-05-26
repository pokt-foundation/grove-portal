import { AppShell, Flex, Box, MediaQuery } from "@pokt-foundation/pocket-blocks"
import { json, LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData, useLocation } from "@remix-run/react"
import { useEffect, useMemo, useRef, useState } from "react"
import DocsBreadcrumbs from "./components/Breadcrumbs/Breadcrumbs"
import DocsFooter from "./components/footer/footer"
import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"
import { Sidebar } from "~/components/Sidebar/Sidebar"
import { initCmsClient } from "~/models/cms/cms.server"
import { documentation } from "~/models/cms/sdk"
import { DocAside } from "~/routes/_landing.($lang).docs/components/DocAside"
import DocumentationSearch from "~/routes/_landing.($lang).docs/components/DocumentationSearch"
import { flattenTree, organizeData } from "~/utils/docs"
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
        ...(showOnlyPublished
          ? { status: { _eq: "published" } }
          : { status: { _neq: "archived" } }),
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
  const location = useLocation()
  const { data }: LoaderData = useLoaderData()
  const [linksGroupItems, setLinksGroupItems] = useState<LinksGroupProps[]>([])
  const organizeDataRef = useRef(organizeData)
  const flattenedLinksTree = useMemo(
    () => flattenTree(linksGroupItems),
    [linksGroupItems],
  )

  const currentDocSlug = location.pathname.split("/").pop()
  const currentDoc = data.find(({ slug }) => slug === currentDocSlug)

  useEffect(() => {
    if (data && data.length) {
      const organizedData = organizeDataRef.current(data)
      setLinksGroupItems(organizedData)
    }
  }, [data])

  return (
    <AppShell
      aside={
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Box pl={10} w="12vw">
            {currentDoc && <DocAside doc={currentDoc} />}
          </Box>
        </MediaQuery>
      }
      navbar={
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <div>
            {linksGroupItems && linksGroupItems.length ? (
              <Sidebar data={linksGroupItems} />
            ) : null}
          </div>
        </MediaQuery>
      }
      styles={() => ({
        main: { overflowY: "hidden" },
      })}
    >
      <Flex direction="column" gap="sm" sx={{ maxWidth: "calc(100vw - 400px)" }}>
        <Flex align="center" justify="flex-end" sx={{ zIndex: 1200 }}>
          <DocumentationSearch docsLinks={flattenedLinksTree} />
        </Flex>
        <DocsBreadcrumbs flattenedLinksTree={flattenedLinksTree} />
        <Outlet />
        <DocsFooter items={flattenedLinksTree} pathname={location.pathname} />
      </Flex>
    </AppShell>
  )
}
