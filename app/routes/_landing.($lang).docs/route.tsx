import { Box, Grid, Flex } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, json } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"
import { Sidebar } from "~/components/Sidebar/Sidebar"
import { initCmsClient } from "~/models/cms/cms.server"
import { documentation } from "~/models/cms/sdk"
import DocumentationSearch from "~/routes/_landing.($lang).docs/components"

type LoaderData = {
  data: documentation[]
}

export const loader: LoaderFunction = async ({ params }) => {
  const routeLang = params.lang ?? "en-US"
  const cms = initCmsClient()

  try {
    const doc = await cms.getDocs({
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

export default function DocsLayout() {
  const { data }: LoaderData = useLoaderData()
  const [linksGroupItems, setLinksGroupItems] = useState<LinksGroupProps[]>([])
  const organizeDataRef = useRef(organizeData)

  useEffect(() => {
    if (data && data.length) {
      const organizedData = organizeDataRef.current(data)
      setLinksGroupItems(organizedData)
    }
  }, [data])

  return (
    <Flex direction="column">
      <Flex align="center" justify="flex-end" sx={{ zIndex: 1200 }}>
        <DocumentationSearch />
      </Flex>
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
          <Outlet />
        </Box>
      </Grid>
    </Flex>
  )
}
