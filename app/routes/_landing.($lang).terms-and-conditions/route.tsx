import { json, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useMemo } from "react"
import Remark from "~/components/shared/Remark"
import { initCmsClient } from "~/models/cms/cms.server"
import { getLegalQuery } from "~/models/cms/sdk"

type LoaderData = {
  terms: getLegalQuery
}

export const loader: LoaderFunction = async ({ request }) => {
  const cms = initCmsClient()
  const terms = await cms.getLegal({
    language: "en-US",
  })

  return json<LoaderData>({
    terms,
  })
}

export default function TermsAndConditions() {
  const { terms } = useLoaderData<LoaderData>()
  const markdown = useMemo(() => {
    if (
      terms.legal_by_id &&
      terms.legal_by_id.translations &&
      terms.legal_by_id.translations[0]
    ) {
      return terms.legal_by_id.translations[0].body
    }
  }, [terms])

  return <>{markdown && <Remark>{markdown}</Remark>}</>
}
