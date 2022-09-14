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
import { Block } from "~/models/indexer/sdk"
import styles from "~/styles/addresses.css"

type LoaderData = {
  block: Awaited<Block>
}

export const links = () => {
  return [...CardLinks(), ...CardListLinks(), { rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.hash, "Block hash must be a parameter")
  const indexer = initIndexerClient()

  const block = await indexer.queryBlockByHash({
    hash: params.hash,
  })

  if (!block.queryBlockByHash) {
    throw new Response("Block not found", {
      status: 404,
      statusText: `Block ${params.hash} not found`,
    })
  }

  return json<LoaderData>(
    { block: block.queryBlockByHash },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

export default function BlockPage() {
  const { block } = useLoaderData() as LoaderData

  const cardListItems: CardListItem[] = useMemo(
    () => [
      {
        label: "Block",
        value: block.height,
      },
      {
        label: "Hash",
        value: block.hash,
      },
      {
        label: "Status",
        value: "?",
      },
      {
        label: "Transactions",
        value: block.txCount,
      },
      {
        label: "Age",
        value: block.time,
      },
      {
        label: "Propser",
        value: block.proposerAddress,
      },
      {
        label: "Relays",
        value: "?",
      },
    ],
    [block],
  )

  return (
    <div>
      <h1>Block</h1>
      <Card>
        <div>
          <CardList items={cardListItems} />
        </div>
      </Card>
    </div>
  )
}
