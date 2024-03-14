import { ActionIcon, Flex, TextInput } from "@mantine/core"
import { LuTrash2 } from "react-icons/lu"
import CopyTextButton from "~/components/CopyTextButton"
import { DataTable } from "~/components/DataTable"

type SimpleStringTableProps = {
  data: string[]
  readOnly?: boolean
  onDelete: (value: string) => void
}

const SimpleStringTable = ({ data, readOnly, onDelete }: SimpleStringTableProps) => {
  return (
    data && (
      <DataTable
        data={data?.map((value) => {
          return {
            userAgent: {
              element: <TextInput readOnly miw={300} value={value} />,
              cellProps: {
                style: { paddingLeft: 0, paddingRight: 0 },
              },
            },
            action: {
              element: (
                <Flex gap="lg" justify="flex-end">
                  <CopyTextButton value={value} />
                  {!readOnly && (
                    <ActionIcon
                      aria-label="Delete value"
                      radius="xl"
                      size={40}
                      variant="outline"
                      onClick={() => onDelete(value)}
                    >
                      <LuTrash2 size={18} />
                    </ActionIcon>
                  )}
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
