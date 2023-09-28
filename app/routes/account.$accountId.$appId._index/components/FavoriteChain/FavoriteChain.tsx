import { ActionIcon } from "@mantine/core"
import { Form } from "@remix-run/react"
import { useEffect, useState } from "react"
import { RiStarFill, RiStarLine } from "react-icons/ri"
import { Blockchain, Maybe } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type FavoriteChainProps = {
  blockchain: Blockchain & {
    favorite: boolean
  }
  favoriteChains?: Maybe<string[]>
}

export const FavoriteChain = ({ blockchain, favoriteChains }: FavoriteChainProps) => {
  const [isFavorite, setIsFavorite] = useState(blockchain.favorite)

  useEffect(() => {
    if (favoriteChains?.includes(blockchain.id)) {
      setIsFavorite(true)
    } else {
      setIsFavorite(false)
    }
  }, [blockchain, favoriteChains])

  return (
    <Form method="post">
      <input hidden readOnly name="isFavorite" value={String(!blockchain.favorite)} />
      <input hidden readOnly name="chainId" value={blockchain.id} />
      <input
        hidden
        readOnly
        name="favoriteChains"
        value={JSON.stringify(favoriteChains) ?? "[]"}
      />
      <ActionIcon
        c={isFavorite ? "yellow" : "gray"}
        size="xl"
        title={`Set blockchain ${blockchain.blockchain} as favorite`}
        type="submit"
        onClick={() => {
          setIsFavorite((s) => !s)
          trackEvent({
            category: AnalyticCategories.app,
            action: AnalyticActions.app_chain_favorite,
            label: `${blockchain.favorite ? "Remove" : "Add"} favorite ${blockchain.id}`,
          })
        }}
      >
        {isFavorite ? <RiStarFill size={18} /> : <RiStarLine size={18} />}
      </ActionIcon>
    </Form>
  )
}

export default FavoriteChain
