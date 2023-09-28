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
import { Blockchain } from "~/models/portal/sdk"
import { BlockchainWhitelist } from "~/routes/account.$accountId.$appId.security/utils/utils"
import useCommonStyles from "~/styles/commonStyles"

type ChainsTableProps = {
  blockchains: Blockchain[]
  blockchainWhitelist: BlockchainWhitelist[]
  onDelete: (val: BlockchainWhitelist) => void
}

const ChainWhitelistTable = ({
  blockchains,
  blockchainWhitelist,
  onDelete,
}: ChainsTableProps) => {
  const theme = useMantineTheme()
  const { classes: commonClasses } = useCommonStyles()

  const data = useMemo(
    () =>
      blockchainWhitelist.map(({ blockchainID, whitelistValue }) => {
        const blockchain = blockchains.find((c) => c?.id === blockchainID)

        return {
          ...blockchain,
          whitelistValue,
        }
      }),
    [blockchainWhitelist, blockchains],
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
                  readOnly
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
                    onClick={() =>
                      onDelete({
                        blockchainID: chain.id as string,
                        whitelistValue: chain.whitelistValue,
                      })
                    }
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
