import { Group, Pagination } from "@mantine/core"
import { TablePaginationProps } from "~/types/table"

export const DataTablePagination = ({
  page,
  totalPages,
  onPageChange,
}: TablePaginationProps) => {
  return (
    <Group align="center" position="center">
      <Pagination
        defaultValue={page}
        mt={30}
        position="right"
        radius="md"
        size="sm"
        total={totalPages}
        value={page}
        withControls={false}
        onChange={onPageChange}
      />
    </Group>
  )
}
