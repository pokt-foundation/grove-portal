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
        initialPage={page}
        mt={30}
        page={page}
        position="right"
        radius="md"
        size="sm"
        total={totalPages}
        withControls={false}
        onChange={onPageChange}
      />
    </Group>
  )
}
