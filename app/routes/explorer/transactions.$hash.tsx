import { LoaderFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useMemo } from "react"
import invariant from "tiny-invariant"
import Card, { links as CardLinks } from "~/components/shared/Card"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"
import { initIndexerClient } from "~/models/indexer/indexer.server"
import { GraphQlTransaction } from "~/models/indexer/sdk"
import styles from "~/styles/addresses.css"

type LoaderData = {
  transaction: Partial<GraphQlTransaction>
}

export const links = () => {
  return [...CardLinks(), ...CardListLinks(), { rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.hash, "transaction hash must be a parameter")
  const indexer = initIndexerClient()

  const transaction = await indexer.queryTransactionByHash({
    hash: params.hash,
  })

  if (!transaction.queryTransactionByHash) {
    throw new Response("Transaction not found", {
      status: 404,
      statusText: `Transaction ${params.hash} not found`,
    })
  }

  return json<LoaderData>(
    { transaction: transaction.queryTransactionByHash },
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
  const { transaction } = useLoaderData() as LoaderData

  const cardListItems: CardListItem[] = useMemo(
    () => [
      {
        label: "Hash",
        value: transaction.hash,
      },
      {
        label: "Status",
        value: "?",
      },
      {
        label: "Type",
        value: transaction.messageType?.split("/")[1],
      },
      {
        label: "Block",
        value: transaction.height,
      },
      {
        label: "Age",
        value: "?",
      },
      {
        label: "From",
        value: transaction.fromAddress,
      },
      {
        label: "To",
        value: transaction.toAddress,
      },
      {
        label: "Value",
        value: "?",
      },
      {
        label: "Fee",
        value: `${transaction.fee} ${transaction.feeDenomination}`,
      },
      {
        label: "Entropy",
        value: transaction.entropy,
      },
      {
        label: "Blockchains",
        value: JSON.stringify(transaction.blockchains),
      },
      {
        label: "App Public Key",
        value: transaction.appPubKey,
      },
      {
        label: "Index",
        value: transaction.index,
      },
      {
        label: "Chain",
        value: transaction.stdTx?.msg?.value?.header?.chain,
      },
      {
        label: "Total Proofs",
        value: transaction.stdTx?.msg?.value?.total_proofs,
      },
      {
        label: "Memo",
        value: transaction.stdTx?.memo,
      },
    ],
    [transaction],
  )

  return (
    <div>
      <h1>Transaction</h1>
      <Card>
        <div>
          <CardList items={cardListItems} />
        </div>
      </Card>
    </div>
  )
}
