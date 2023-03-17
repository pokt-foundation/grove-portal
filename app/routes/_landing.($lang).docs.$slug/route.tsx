import { Button } from "@pokt-foundation/pocket-blocks"
import { json, LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getMDXComponent } from "mdx-bundler/client"
import { useEffect, useMemo } from "react"
import styles from "./styles.css"
import Remark, { links as RemarkLinks } from "~/components/shared/Remark"
import { initCmsClient } from "~/models/cms/cms.server"
import { getDocsQuery } from "~/models/cms/sdk"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { bundleMDX } from "~/utils/mdx.server"

export const meta: MetaFunction = ({ params }) => {
  return {
    title: `${params.slug} | POKT`,
  }
}

export const links: LinksFunction = () => {
  return [...RemarkLinks(), { rel: "stylesheet", href: styles }]
}

type DocLoaderData = {
  doc: getDocsQuery
  code: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const routelang = params.lang !== undefined ? params.lang : "en-US"
  const cms = initCmsClient()
  const doc = await cms.getDocs({
    filter: { status: { _eq: "published" }, slug: { _eq: params.slug } },
    sort: ["id"],
    language: routelang,
  })

  const result = await bundleMDX({
    source: doc.documentation[0].translations![0]?.body?.trim() ?? "",
    files: {
      "./demo.tsx": `
import * as React from 'react'

function Demo() {
  return <div>Neat demo!</div>
}

export default Demo
    `,
    },
  })

  return json<DocLoaderData>({
    doc,
    code: result.code,
  })
}

export default function Docs() {
  const { doc, code } = useLoaderData() as DocLoaderData

  useEffect(() => {
    // todo: create new event
    // trackEvent(AmplitudeEvents.LandingView)
  }, [])

  const MDXComponent = useMemo(() => getMDXComponent(code), [code])

  return (
    <div>
      <h1>{doc.documentation[0].translations![0]?.title}</h1>
      {/* <Remark>{doc.documentation[0].translations![0]?.body ?? ""}</Remark> */}
      <MDXComponent />
    </div>
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <dialog color="red" title="Index Error">
        {error.message}
      </dialog>
    </div>
  )
}
