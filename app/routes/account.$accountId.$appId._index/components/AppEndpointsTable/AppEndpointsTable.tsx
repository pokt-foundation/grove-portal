import {
  Flex,
  Menu,
  TextInput,
  useMantineTheme,
  UnstyledButton,
} from "@pokt-foundation/pocket-blocks"
import { useFetcher, useParams } from "@remix-run/react"
import React, { useMemo } from "react"
import { LuBook } from "react-icons/lu"
import { RiStarLine, RiStarFill } from "react-icons/ri"
import FavoriteChain from "../FavoriteChain"
import Chain from "~/components/Chain"
import ContextMenuTarget from "~/components/ContextMenuTarget"
import CopyTextButton from "~/components/CopyTextButton"
import { DataTable } from "~/components/DataTable"
import useActionNotification from "~/hooks/useActionNotification"
import { Blockchain, Maybe } from "~/models/portal/sdk"
import { trackEvent, AnalyticCategories, AnalyticActions } from "~/utils/analytics"
import { CHAIN_DOCS_URL } from "~/utils/chainUtils"
import { DOCS_PATH } from "~/utils/utils"

type AppEndpointsProps = {
  blockchains: Blockchain[]
  favoriteChains?: Maybe<string[]>
  searchTerm: string
  readOnly: boolean
}

const getAppEndpointUrl = (chain: Blockchain, appId: string | undefined) =>
  `https://${chain?.blockchain}.rpc.grove.city/v1/lb/${appId}`

const AppEndpointsTable = ({
  blockchains,
  favoriteChains,
  searchTerm,
  readOnly,
}: AppEndpointsProps) => {
  const theme = useMantineTheme()
  const { appId } = useParams()
  const fetcher = useFetcher()

  // handle notification for menu fetcher action
  useActionNotification(fetcher.data)

  const chains = useMemo(() => {
    const fav = blockchains
      .filter((chain) => favoriteChains?.includes(chain.id))
      .map((c) => ({
        ...c,
        favorite: true,
      }))
      .sort((a, b) => (a.blockchain > b.blockchain ? 1 : -1))

    const other = blockchains
      .filter((chain) => !favoriteChains?.includes(chain.id))
      .map((c) => ({
        ...c,
        favorite: false,
      }))
      .sort((a, b) => (a.blockchain > b.blockchain ? 1 : -1))

    return [...fav, ...other]
  }, [favoriteChains, blockchains])

  return (
    blockchains && (
      <DataTable
        data={chains.map((chain) => {
          return {
            chain: {
              element: (
                <Flex gap="sm">
                  <FavoriteChain
                    blockchain={chain}
                    favoriteChains={favoriteChains}
                    readOnly={false}
                  />
                  <Chain chain={chain} />
                </Flex>
              ),
              value: `${chain.description} ${chain.blockchain}`,
              cellProps: {
                style: { minWidth: "340px" },
                width: "35%",
              },
            },
            endpointUrl: {
              element: (
                <TextInput
                  readOnly
                  bg={theme.colors.gray[9]}
                  miw={300}
                  value={getAppEndpointUrl(chain, appId)}
                />
              ),
            },
            action: {
              element: (
                <Flex gap="lg" justify="flex-end">
                  <CopyTextButton value={getAppEndpointUrl(chain, appId)} />
                  <Menu>
                    <ContextMenuTarget />
                    <Menu.Dropdown>
                      {chain.blockchain && CHAIN_DOCS_URL[chain.blockchain] && (
                        <Menu.Item icon={<LuBook size={18} />}>
                          <UnstyledButton
                            component="a"
                            fz="sm"
                            href={`${DOCS_PATH}/supported-methods/supported-methods/${
                              CHAIN_DOCS_URL[chain.blockchain]
                            }`}
                            rel="noreferrer"
                            target="_blank"
                            onClick={() => {
                              trackEvent({
                                category: AnalyticCategories.app,
                                action: AnalyticActions.app_chain_docs,
                                label: chain.id,
                              })
                            }}
                          >
                            Documentation
                          </UnstyledButton>
                        </Menu.Item>
                      )}

                      {!readOnly && (
                        <Menu.Item
                          icon={
                            chain.favorite ? (
                              <RiStarFill size={18} />
                            ) : (
                              <RiStarLine size={18} />
                            )
                          }
                          onClick={() => {
                            trackEvent({
                              category: AnalyticCategories.app,
                              action: AnalyticActions.app_chain_favorite,
                              label: `${chain.favorite ? "Remove" : "Add"} favorite ${
                                chain.id
                              }`,
                            })
                            fetcher.submit(
                              {
                                isFavorite: String(!chain.favorite),
                                chainId: chain.id,
                                favoriteChains: JSON.stringify(favoriteChains),
                              },
                              {
                                method: "post",
                              },
                            )
                          }}
                        >
                          {chain.favorite ? "Remove favorite" : "Mark as favorite"}
                        </Menu.Item>
                      )}
                    </Menu.Dropdown>
                  </Menu>
                </Flex>
              ),
              cellProps: {
                style: { minWidth: "130px" },
                width: "130px%",
              },
            },
          }
        })}
        paginate={false}
        searchTerm={searchTerm}
      />
    )
  )
}

export default AppEndpointsTable
