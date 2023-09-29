import {
  ActionIcon,
  Flex,
  TextInput,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { LuTrash2 } from "react-icons/lu"
import CopyTextButton from "~/components/CopyTextButton"
import { DataTable } from "~/components/DataTable"
import useCommonStyles from "~/styles/commonStyles"

type SimpleStringTableProps = {
  data: string[]
  onDelete: (value: string) => void
}

const SimpleStringTable = ({ data, onDelete }: SimpleStringTableProps) => {
  const theme = useMantineTheme()
  const { classes: commonClasses } = useCommonStyles()

  return (
    data && (
      <DataTable
        data={data?.map((value) => {
          return {
            userAgent: {
              element: (
                <TextInput readOnly bg={theme.colors.gray[9]} miw={300} value={value} />
              ),
              cellProps: {
                style: { paddingLeft: 0, paddingRight: 0 },
              },
            },
            action: {
              element: (
                <Flex gap="lg" justify="flex-end">
                  <CopyTextButton value={value} />
                  <ActionIcon
                    className={commonClasses.grayOutlinedButton}
                    radius="xl"
                    size={40}
                    variant="outline"
                    onClick={() => onDelete(value)}
                  >
                    <LuTrash2 size={18} />
                  </ActionIcon>
                </Flex>
              ),
              cellProps: {
                style: { minWidth: "130px", paddingLeft: 0, paddingRight: 0 },
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
export default SimpleStringTable
