import { LoaderFunction, json } from "@remix-run/node"
import { Link, useLoaderData, useSearchParams, useSubmit } from "@remix-run/react"
import { useMemo } from "react"
import invariant from "tiny-invariant"
import Table, { links as TableLinks } from "~/components/explorer/Table"
import Card, { links as CardLinks } from "~/components/shared/Card"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"
import { initIndexerClient } from "~/models/indexer/indexer.server"
import { GraphQlTransaction, QueryTransactionsByAddressQuery } from "~/models/indexer/sdk"

import styles from "~/styles/addresses.css"

type LoaderData = {
  address: Awaited<
    NonNullable<{
      address: string
    }>
  >
  paginate: Awaited<PaginatedData>
}

export type PaginatedData = {
  data: (Partial<GraphQlTransaction> | null)[]
  page: number
  perPage: number
  totalPages: number
}

export const links = () => {
  return [
    ...TableLinks(),
    ...CardLinks(),
    ...CardListLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.address, "Address must be a parameter")
  const indexer = initIndexerClient()

  const url = new URL(request.url)
  const page = url.searchParams.get("page") ?? 1
  const perPage = url.searchParams.get("perPage") ?? 25

  const transactions = await indexer.queryTransactionsByAddress({
    address: params.address,
    page: Number(page),
    perPage: Number(perPage),
  })

  if (!transactions.queryTransactionsByAddress?.transactions) {
    throw new Response(`Transactions not found at adddress: ${params.address}`, {
      status: 404,
      statusText: `Transactions not found at adddress: ${params.address}`,
    })
  }

  const paginate = {
    data: transactions.queryTransactionsByAddress.transactions,
    page: Number(page),
    perPage: Number(perPage),
    totalPages: Number(transactions.queryTransactionsByAddress.totalPages),
  }

  return json<LoaderData>(
    {
      address: {
        address: params.address,
      },
      paginate: paginate,
    },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

export default function AddressPage() {
  const { address, paginate } = useLoaderData() as LoaderData
  const submit = useSubmit()
  const [params] = useSearchParams()

  const handlePageChange = (e: number) => {
    submit({
      page: String(e),
      perPage: params.get("perPage") ?? String(25),
    })
  }

  const cardListItems: CardListItem[] = useMemo(
    () => [
      {
        label: "Address",
        value: address.address,
      },
    ],
    [address],
  )

  const tableData = useMemo(
    () =>
      paginate.data.map((tsx) => ({
        id: tsx?.hash as string,
        hash: {
          value: tsx?.hash as string,
          element: (
            <div className="pokt-table-ellipsis">
              <Link to={`/transactions/${tsx?.hash}`}>{tsx?.hash}</Link>
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
      <h1>Address</h1>
      <Card>
        <div>
          <CardList items={cardListItems} />
        </div>
      </Card>
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
          label="Address Transactions"
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
