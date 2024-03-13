import {
  Flex,
  Menu,
  TextInput,
  useMantineTheme,
  UnstyledButton,
  Tooltip,
  ActionIcon,
} from "@mantine/core"
import { useFetcher, useNavigation, useParams } from "@remix-run/react"
import React, { useMemo, useState } from "react"
import { LuBook, LuPlay } from "react-icons/lu"
import { RiStarLine, RiStarFill } from "react-icons/ri"
import FavoriteChain from "../FavoriteChain"
import Chain from "~/components/Chain"
import { ChainSandboxProvider } from "~/components/ChainSandbox/state"
import ContextMenuTarget from "~/components/ContextMenuTarget"
import CopyTextButton from "~/components/CopyTextButton"
import { DataTable } from "~/components/DataTable"
import useActionNotification, {
  ActionNotificationData,
} from "~/hooks/useActionNotification"
import { Blockchain, PortalApp } from "~/models/portal/sdk"
import ChainSandboxSideDrawer from "~/routes/account.$accountId.$appId._index/components/ChainSandboxSideDrawer"
import useCommonStyles from "~/styles/commonStyles"
import { trackEvent, AnalyticCategories, AnalyticActions } from "~/utils/analytics"
import { CHAIN_DOCS_URL, getAppEndpointUrl } from "~/utils/chainUtils"
import { DOCS_PATH } from "~/utils/utils"

type AppEndpointsProps = {
  app: PortalApp
  blockchains: Blockchain[]
  searchTerm: string
  readOnly: boolean
}

const AppEndpointsTable = ({
  app,
  blockchains,
  searchTerm,
  readOnly,
}: AppEndpointsProps) => {
  const theme = useMantineTheme()
  const { appId } = useParams()
  const fetcher = useFetcher()
  const fetcherData = fetcher.data as ActionNotificationData
  const navigation = useNavigation()
  const { classes: commonClasses } = useCommonStyles()
  const [selectedBlockchain, setSelectedBlockchain] = useState<Blockchain>()
  const favoriteChains = app.settings.favoritedChainIDs

  // handle notification for menu fetcher action
  useActionNotification(fetcherData)

  const chains = useMemo(() => {
    const fav = blockchains
      .filter((chain) => favoriteChains?.includes(chain.id))
      .map((c) => ({
        ...c,
        favorite: true,
      }))

    const other = blockchains
      .filter((chain) => !favoriteChains?.includes(chain.id))
      .map((c) => ({
        ...c,
        favorite: false,
      }))

    return [...fav, ...other]
  }, [favoriteChains, blockchains])

  return (
    <>
      <ChainSandboxProvider initialStateValue={{ selectedApp: app }}>
        <ChainSandboxSideDrawer
          blockchain={selectedBlockchain}
          chains={chains}
          onSideDrawerClose={() => setSelectedBlockchain(undefined)}
        />
      </ChainSandboxProvider>
      {blockchains && (
        <DataTable
          data={chains.map((chain) => {
            return {
              chain: {
                element: (
                  <Flex gap="sm">
                    <FavoriteChain
                      blockchain={chain}
                      favoriteChains={favoriteChains}
                      readOnly={navigation.state !== "idle"}
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
                    <Tooltip withArrow label="Try in Sandbox">
                      <ActionIcon
                        className={commonClasses.grayOutline}
                        color="gray"
                        radius="xl"
                        size={40}
                        variant="outline"
                        onClick={() => {
                          setSelectedBlockchain(chain)
                          trackEvent({
                            category: AnalyticCategories.app,
                            action: AnalyticActions.app_chain_sandbox_try,
                            label: `Blockchain: ${chain.blockchain}`,
                          })
                        }}
                      >
                        <LuPlay size={18} style={{ position: "relative", left: 2 }} />
                      </ActionIcon>
                    </Tooltip>
                    <Menu>
                      <ContextMenuTarget />
                      <Menu.Dropdown>
                        {chain.blockchain && CHAIN_DOCS_URL[chain.blockchain] && (
                          <Menu.Item icon={<LuBook size={18} />}>
                            <UnstyledButton
                              component="a"
                              fz="sm"
                              href={`${DOCS_PATH}/${CHAIN_DOCS_URL[chain.blockchain]}`}
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
      )}
    </>
  )
}

export default AppEndpointsTable
