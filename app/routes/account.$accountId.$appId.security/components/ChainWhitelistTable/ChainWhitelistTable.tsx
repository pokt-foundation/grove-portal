import {
  ActionIcon,
  Flex,
  TextInput,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { useMemo } from "react"
import { LuTrash2 } from "react-icons/lu"
import Chain from "~/components/Chain"
import CopyTextButton from "~/components/CopyTextButton"
import { DataTable } from "~/components/DataTable"
import { Blockchain, WhitelistContractsV2, WhitelistMethodsV2 } from "~/models/portal/sdk"
import { BlockchainWhitelist } from "~/routes/account.$accountId.$appId.security/utils"
import useCommonStyles from "~/styles/commonStyles"

type ChainsTableProps = {
  blockchains: Blockchain[]
  blockchainWhitelist: WhitelistContractsV2[] | WhitelistMethodsV2[]
  onDelete: (val: string) => void
  type: "contracts" | "methods"
}

const ChainWhitelistTable = ({
  blockchains,
  blockchainWhitelist,
  onDelete,
  type,
}: ChainsTableProps) => {
  const theme = useMantineTheme()
  const { classes: commonClasses } = useCommonStyles()

  const data = useMemo(
    () =>
      blockchainWhitelist.map((item) => {
        const blockchain = blockchains.find((c) => c?.id === item.blockchainID)

        // @ts-ignore
        const value = item[type]

        return {
          ...blockchain,
          whitelistValue: value,
        }
      }),
    [blockchainWhitelist, blockchains, type],
  )

  return (
    data && (
      <DataTable
        data={data?.map((chain) => {
          return {
            chain: {
              element: <Chain chain={chain as Blockchain} />,
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
                  value={chain.whitelistValue}
                />
              ),
            },
            action: {
              element: (
                <Flex gap="lg" justify="flex-end">
                  <CopyTextButton value={chain.whitelistValue} />
                  <ActionIcon
                    className={commonClasses.grayOutlinedButton}
                    radius="xl"
                    size={40}
                    variant="outline"
                    onClick={() => onDelete(chain.id as string)}
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
export default ChainWhitelistTable
