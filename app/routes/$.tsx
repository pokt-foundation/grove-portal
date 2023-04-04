import { Alert, Center } from "@pokt-foundation/pocket-blocks"
import { json, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useMemo } from "react"
import Remark from "~/components/shared/Remark"
import { initCmsClient } from "~/models/cms/cms.server"
import { getGenericQuery } from "~/models/cms/sdk"

type LoaderData = {
  generic: getGenericQuery | undefined
  param: string | undefined
}

export const loader: LoaderFunction = async ({ params }) => {
  const routelang = params.lang !== undefined ? params.lang : "en-US"
  const cms = initCmsClient()

  try {
    const generic = await cms.getGeneric({
      filter: { status: { _eq: "published" }, slug: { _eq: params["*"] } },
      language: routelang,
    })

    return json<LoaderData>({
      generic,
      param: params["*"],
    })
  } catch (e) {
    return json<LoaderData>({
      generic: undefined,
      param: params["*"],
    })
  }
}

export default function Generic() {
  const { generic, param } = useLoaderData<LoaderData>()

  const markdown = useMemo(() => {
    if (
      generic &&
      generic.generic_pages &&
      generic.generic_pages.length > 0 &&
      generic.generic_pages[0].translations
    ) {
      return generic.generic_pages[0].translations[0]?.body
    }
  }, [generic])

  if (!markdown) {
    return (
      <Center className="error-container" mt="xl">
        <Alert color="red" title="Page Not Found">
          {param ?? "No Param"}
        </Alert>
      </Center>
    )
  }

  return <>{markdown && <Remark>{markdown}</Remark>}</>
}
