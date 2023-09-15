import {
  ActionIcon,
  Avatar,
  Flex,
  Menu,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
  UnstyledButton,
} from "@pokt-foundation/pocket-blocks"
import { useParams } from "@remix-run/react"
import { useMemo } from "react"
import { LuBook } from "react-icons/lu"
import { RiStarLine } from "react-icons/ri"
import FavoriteChain from "../FavoriteChain"
import ContextMenuTarget from "~/components/ContextMenuTarget"
import CopyTextButton from "~/components/CopyTextButton"
import { DataTable } from "~/components/DataTable"
import { Blockchain, Maybe } from "~/models/portal/sdk"
import { CHAIN_DOCS_URL } from "~/utils/chainUtils"

type AppEndpointsProps = {
  blockchains: Blockchain[]
  favoriteChains?: Maybe<string[]>
  searchTerm: string
}

const getAppEndpointUrl = (chain: Blockchain, appId: string | undefined) =>
  `https://${chain?.blockchain}.gateway.pokt.network/v1/lb/${appId}`

const AppEndpointsTable = ({
  blockchains,
  favoriteChains,
  searchTerm,
}: AppEndpointsProps) => {
  const theme = useMantineTheme()
  const { appId } = useParams()

  const chains = useMemo(() => {
    let fav = blockchains
      .filter((chain) => favoriteChains?.includes(chain.id))
      .map((c) => ({
        ...c,
        favorite: true,
      }))
      .sort((a, b) => (a.blockchain > b.blockchain ? 1 : -1))
    let other = blockchains
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
                  <FavoriteChain blockchain={chain} favoriteChains={favoriteChains} />
                  <Avatar
                    radius={40}
                    size={40}
                    src={`/chain-logos/${chain.blockchain}.svg`}
                  />
                  <Stack spacing={0} w={200}>
                    <Text truncate fw={600}>
                      {chain.description}
                    </Text>
                    <Text c="dimmed" fz="xs">
                      {chain.blockchain}
                    </Text>
                  </Stack>
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
                            href={`https://docs.portal.pokt.network/supported-methods/supported-methods/${
                              CHAIN_DOCS_URL[chain.blockchain]
                            }`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            Documentation
                          </UnstyledButton>
                        </Menu.Item>
                      )}

                      <Menu.Item icon={<RiStarLine size={18} />}>
                        Mark as favorite
                      </Menu.Item>
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
