import {
  ActionIcon,
  Flex,
  TextInput,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { useParams } from "@remix-run/react"
import { useMemo } from "react"
import { LuTrash2 } from "react-icons/lu"
import Chain from "~/components/Chain"
import CopyTextButton from "~/components/CopyTextButton"
import { DataTable } from "~/components/DataTable"
import { Blockchain } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"

type ChainsTableProps = {
  blockchains: Blockchain[]
  selectedBlockchainsIds: string[]
  onDeleteChain: (chainId: string) => void
}

const getAppEndpointUrl = (
  chain: Blockchain | undefined | null,
  appId: string | undefined,
) => `https://${chain?.blockchain}.gateway.pokt.network/v1/lb/${appId}`

const ChainsTable = ({
  blockchains,
  selectedBlockchainsIds,
  onDeleteChain,
}: ChainsTableProps) => {
  const theme = useMantineTheme()
  const { appId } = useParams()
  const { classes: commonClasses } = useCommonStyles()

  const selectedBlockChains = useMemo(
    () =>
      blockchains.filter(({ id: blockchainID }) =>
        selectedBlockchainsIds.some((id) => blockchainID === id),
      ),
    [blockchains, selectedBlockchainsIds],
  )

  return (
    selectedBlockChains && (
      <DataTable
        data={selectedBlockChains
          ?.sort((a, b) => (a.blockchain > b.blockchain ? 1 : -1))
          .map((chain) => {
            return {
              chain: {
                element: <Chain chain={chain} />,
                value: `${chain?.description} ${chain?.blockchain}`,
                cellProps: {
                  style: { minWidth: "250px" },
                  width: "30%",
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
                    <ActionIcon
                      className={commonClasses.grayOutlinedButton}
                      radius="xl"
                      size={40}
                      variant="outline"
                      onClick={() => onDeleteChain(chain.id)}
                    >
                      <LuTrash2 size={18} />
                    </ActionIcon>
                  </Flex>
                ),
                cellProps: {
                  style: { minWidth: "130px" },
                  width: "130px",
                },
              },
            }
          })}
        paginate={false}
      />
    )
  )
}
// return (
//     selectedBlockChains && (
//         <>
//           {selectedBlockChains?.map((chain) => (
//               <Grid key={chain?.id} px={20} py={24}>
//                 <Grid.Col span={3}>
//                   <Flex gap="sm">
//                     <Avatar radius={40} size={40} src="/avalanche-avax-logo.svg" />
//                     <Stack spacing={0} w={160}>
//                       <Text truncate fw={600}>
//                         {chain?.description}
//                       </Text>
//                       <Text c="dimmed" fz="xs">
//                         {chain?.blockchain}
//                       </Text>
//                     </Stack>
//                   </Flex>
//                 </Grid.Col>
//                 <Grid.Col span="auto">
//                   <TextInput
//                       bg={theme.colors.gray[9]}
//                       miw={300}
//                       value={getAppEndpointUrl(chain, appId)}
//                   />
//                 </Grid.Col>
//                 <Grid.Col span="content">
//                   <Group position="right" spacing="lg">
//                     <CopyTextButton value={getAppEndpointUrl(chain, appId)} />
//                     <ActionIcon
//                         className={commonClasses.grayOutlinedButton}
//                         radius="xl"
//                         size={40}
//                         variant="outline"
//                         onClick={() => onDeleteChain(chain.id)}
//                     >
//                       <LuTrash2 size={18} />
//                     </ActionIcon>
//                   </Group>
//                 </Grid.Col>
//               </Grid>
//           ))}
//         </>
//     )
// )
export default ChainsTable
