import { LoaderFunction, json } from "@remix-run/node"
import { useSubmit, useLoaderData, useSearchParams, Link } from "@remix-run/react"
import { useMemo } from "react"
import Table, { links as TableLinks } from "~/components/explorer/Table"
import { initIndexerClient } from "~/models/indexer/indexer.server"
import { Block } from "~/models/indexer/sdk"
import styles from "~/styles/addresses.css"

type LoaderData = {
  paginate: Awaited<PaginatedData>
}

export type PaginatedData = {
  data: NonNullable<Block[]>
  page: number
  perPage: number
  totalPages: number
}

export const links = () => {
  return [...TableLinks(), { rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async ({ request }) => {
  const indexer = initIndexerClient()

  const url = new URL(request.url)
  const page = url.searchParams.get("page") ?? 1
  const perPage = url.searchParams.get("perPage") ?? 25

  const blocks = await indexer.queryBlocks({
    page: Number(page),
    perPage: Number(perPage),
  })

  if (!blocks.queryBlocks) {
    throw new Response("Transactions not found", {
      status: 404,
      statusText: "Transactions not found",
    })
  }

  const paginate = {
    data: blocks.queryBlocks.blocks as Block[],
    page: blocks.queryBlocks.page,
    perPage: blocks.queryBlocks.pageCount,
    totalPages: blocks.queryBlocks.totalPages,
  }

  return json<LoaderData>(
    { paginate },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

export default function BlocksPage() {
  const { paginate } = useLoaderData() as LoaderData
  const submit = useSubmit()
  const [params] = useSearchParams()

  const handlePageChange = (e: number) => {
    submit({
      page: String(e),
      perPage: params.get("perPage") ?? String(25),
    })
  }

  const tableData = useMemo(
    () =>
      paginate.data.map((block) => ({
        id: block?.hash as string,
        hash: {
          value: block?.hash as string,
          element: (
            <div className="pokt-table-ellipsis">
              <Link to={block?.hash as string}>{block?.hash}</Link>
            </div>
          ),
        },
        status: "?",
        transactions: block?.txCount as number,
        block: {
          value: block?.height as number,
          element: (
            <div className="pokt-table-ellipsis">
              <Link to={`${block?.height}`}>{block?.height}</Link>
            </div>
          ),
        },
        age: block?.time,
        proposer: {
          value: block?.proposerAddress as string,
          element: (
            <div className="pokt-table-ellipsis">
              <Link to={`/addresses/${block?.proposerAddress}`}>
                {block?.proposerAddress}
              </Link>
            </div>
          ),
        },
        relays: "?",
      })),
    [paginate],
  )

  return (
    <div>
      <h1>Blocks</h1>
      {paginate.data && (
        <Table
          columns={[
            "Hash",
            "Status",
            "Transactions",
            "Block",
            "Age",
            "Proposer Address",
            "Relays",
          ]}
          data={tableData}
          paginate={{
            page: paginate.page,
            perPage: paginate.perPage,
            totalPages: paginate.totalPages,
            handlePageChange: handlePageChange,
            withControls: true,
          }}
        />
      )}
    </div>
  )
}
