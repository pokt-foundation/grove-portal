import { Box, Grid } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, json } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"
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

export default function DocsLayout() {
  const { data }: LoaderData = useLoaderData()
  const [linksGroupItems, setLinksGroupItems] = useState<LinksGroupProps[]>([])

  useEffect(() => {
    if (data && data.length) {
      const organizedData = organizeData(data)
      setLinksGroupItems(organizedData)
    }
  }, [data])

  const findNestingLevel = (doc: documentation): number => {
    if (!doc.parent) {
      return 0
    }
    return 1 + findNestingLevel(doc.parent)
  }

  const organizeData = (docs: documentation[]): LinksGroupProps[] => {
    let mappedDocs: LinksGroupProps[] = []

    docs.forEach((doc) => {
      if (doc.slug) {
        mappedDocs.push({
          id: doc.id,
          label: doc.translations?.[0]?.title || "",
          link: doc.slug,
          slug: doc.slug,
          links: [],
        })
      }
    })

    docs.forEach((doc) => {
      if (doc.parent) {
        let parentDoc = doc.parent
        const parentInMap = mappedDocs.find((item) => item.id === parentDoc.id)
        const docInMap = mappedDocs.find((item) => item.id === doc.id)

        if (parentInMap && docInMap) {
          const nesting_level = findNestingLevel(doc)
          mappedDocs = mappedDocs.map((item) => {
            if (item.id === parentDoc.id) {
              return {
                ...item,
                links: [...item.links, { ...docInMap, nesting_level }],
              }
            }
            return item
          })
        }
      }
    })

    return mappedDocs
  }

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
        <Outlet />
      </Box>
    </Grid>
  )
}
