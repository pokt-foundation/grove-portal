import { Group, Pagination } from "@pokt-foundation/pocket-blocks"
import { TablePaginationProps } from "~/types/table"

export const DataTablePagination = ({
  page,
  totalPages,
  onPageChange,
}: TablePaginationProps) => {
  return (
    <Group align="center" className="pokt-table-paginate" position="apart">
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
