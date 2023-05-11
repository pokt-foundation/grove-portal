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
      // filter: { status: { _eq: "published" } },
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

const replaceAll = (str: string, find: string, replace: string) => {
  return str.replace(new RegExp(find, "g"), replace)
}

export default function DocsLayout() {
  const { data }: LoaderData = useLoaderData()
  const [linksGroupItems, setLinksGroupItems] = useState<LinksGroupProps[]>([])

  useEffect(() => {
    if (data && data.length) {
      console.log(data)
      setLinksGroupItems(
        data.map((doc: documentation) => {
          return {
            label: doc.slug ? replaceAll(doc.slug, "-", " ") : "", // We might want to choose a different property for the label
            link: doc.slug ? doc.slug : "", // Assuming the slug can be used as the link
            slug: doc.slug ? doc.slug : "",
          }
        }),
      )
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
        <Outlet />
      </Box>
    </Grid>
  )
}
