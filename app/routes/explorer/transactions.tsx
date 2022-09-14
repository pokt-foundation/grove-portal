import { LoaderFunction, json } from "@remix-run/node"
import { useSubmit, useLoaderData, useSearchParams, Link } from "@remix-run/react"
import { useMemo } from "react"
import Table, { links as TableLinks } from "~/components/explorer/Table"
import { initIndexerClient } from "~/models/indexer/indexer.server"
import { GraphQlTransaction } from "~/models/indexer/sdk"
import styles from "~/styles/addresses.css"

type LoaderData = {
  paginate: Awaited<PaginatedData>
}

export type PaginatedData = {
  data: (Partial<GraphQlTransaction> | null)[]
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

  const transactions = await indexer.queryTransactions({
    page: Number(page),
    perPage: Number(perPage),
  })

  if (!transactions.queryTransactions?.transactions) {
    throw new Response("Transactions not found", {
      status: 404,
      statusText: "Transactions not found",
    })
  }

  const paginate = {
    data: transactions.queryTransactions.transactions,
    page: Number(page),
    perPage: Number(perPage),
    totalPages: transactions.queryTransactions.totalPages,
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

export default function TransactionsPage() {
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
      paginate.data.map((tsx) => ({
        id: tsx?.hash as string,
        hash: {
          value: tsx?.hash as string,
          element: (
            <div className="pokt-table-ellipsis">
              <Link to={tsx?.hash as string}>{tsx?.hash}</Link>
            </div>
          ),
        },
        status: "?",
        type: `${tsx?.messageType?.split("/")[1]}`,
        block: {
          value: tsx?.height as number,
          element: (
            <div className="pokt-table-ellipsis">
              <Link to={`/blocks/${tsx?.height}`}>{tsx?.height}</Link>
            </div>
          ),
        },
        age: "?",
        from: {
          value: tsx?.fromAddress as string,
          element: (
            <div className="pokt-table-ellipsis">
              <Link to={`/addresses/${tsx?.fromAddress}`}>{tsx?.fromAddress}</Link>
            </div>
          ),
        },
        to: {
          value: tsx?.toAddress as string,
          element: (
            <div className="pokt-table-ellipsis">
              <Link to={`/addresses/${tsx?.toAddress}`}>{tsx?.toAddress}</Link>
            </div>
          ),
        },
        value: "?",
      })),
    [paginate],
  )

  return (
    <div>
      <h1>Transactions</h1>
      {paginate.data && (
        <Table
          columns={[
            "Transaction",
            "Status",
            "Type",
            "Block",
            "Age",
            "From",
            "To",
            "Value",
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
