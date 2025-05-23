import { ActionIcon } from "@mantine/core"
import { Form } from "@remix-run/react"
import cx from "clsx"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import classes from "./FavoriteChain.module.css"
import { Blockchain, Maybe } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type FavoriteChainProps = {
  blockchain: Blockchain & {
    favorite: boolean
  }
  favoriteChains?: Maybe<string[]>
  readOnly: boolean
}

export const FavoriteChain = ({
  blockchain,
  favoriteChains,
  readOnly,
}: FavoriteChainProps) => {
  const [isFavorite, setIsFavorite] = useState(blockchain.favorite)

  useEffect(() => {
    if (favoriteChains?.includes(blockchain.id)) {
      setIsFavorite(true)
    } else {
      setIsFavorite(false)
    }
  }, [blockchain, favoriteChains])

  return (
    <Form method="post" style={{ cursor: readOnly ? "not-allowed" : "pointer" }}>
      <input hidden readOnly name="isFavorite" value={String(!blockchain.favorite)} />
      <input hidden readOnly name="chainId" value={blockchain.id} />
      <input
        hidden
        readOnly
        name="favoriteChains"
        value={JSON.stringify(favoriteChains) ?? "[]"}
      />
      <ActionIcon
        aria-label={`Set blockchain ${blockchain.blockchain} as favorite`}
        className={cx(classes.favoriteChain, {
          [classes.isFavorite]: isFavorite,
        })}
        disabled={readOnly}
        size="xl"
        title={`Set blockchain ${blockchain.blockchain} as favorite`}
        type="submit"
        variant={readOnly ? "transparent" : "subtle"}
        onClick={() => {
          setIsFavorite((s) => !s)
          trackEvent({
            category: AnalyticCategories.app,
            action: AnalyticActions.app_chain_favorite,
            label: `${blockchain.favorite ? "Remove" : "Add"} favorite ${blockchain.id}`,
          })
        }}
      >
        <Star fill={isFavorite ? "currentColor" : "none"} size={18} strokeWidth={1.5} />
      </ActionIcon>
    </Form>
  )
}

export default FavoriteChain
