import { Box, Group, Button } from "@pokt-foundation/pocket-blocks"
import { useNavigation, useSearchParams } from "@remix-run/react"
import React, { useState } from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { DataTable } from "~/components/DataTable"
import { Logs } from "~/models/dwh/sdk"
import LogsSideDrawer from "~/routes/account.$accountId.$appId.logs/components/LogsSideDrawer"
import { LOGS_PAGE_SIZE } from "~/routes/account.$accountId.$appId.logs/route"
import useCommonStyles from "~/styles/commonStyles"
import { dayjs } from "~/utils/dayjs"

type LogsTableProps = {
  logs: Logs[]
}

const LogsTable = ({ logs }: LogsTableProps) => {
  const [selectedLogsItem, setSelectedLogsItem] = useState<Logs | undefined>()
  const navigation = useNavigation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { classes: commonClasses } = useCommonStyles()
  const activePage = Number(searchParams.get("page") ?? 1)

  const isLoadingLogs =
    navigation.state === "loading" && navigation.location.pathname.endsWith("/logs")

  return (
    <Box>
      <LogsSideDrawer
        logsItem={selectedLogsItem}
        onSideDrawerClose={() => setSelectedLogsItem(undefined)}
      />
      <DataTable
        columns={["Timestamp", "Method", "Chain ID", "Error type", "Error name"]}
        data={logs.map((log) => {
          return {
            timestamp: {
              element: dayjs(log.ts).format("D MMMM, YYYY h:mm:ss A"),
              value: log.ts,
            },
            method: {
              element: log.chainMethod,
              value: log.chainMethod,
            },
            chainId: {
              element: log.chainId,
              value: log.chainId,
            },
            errorType: {
              element: log.errorType,
              value: log.errorType,
            },
            errorName: {
              element: log.errorName,
              value: log.errorName,
            },
            rowSelectData: log,
          }
        })}
        isLoading={isLoadingLogs}
        paginate={false}
        onRowClick={(logsItem) => setSelectedLogsItem(logsItem as unknown as Logs)}
      />
      <Group mt="lg" position="center" spacing="md">
        <Button
          classNames={{ root: commonClasses.grayOutlinedButton }}
          color="gray"
          disabled={activePage === 1 || isLoadingLogs}
          radius="md"
          size="xs"
          variant="outline"
          onClick={() => {
            const params = new URLSearchParams()
            params.set("page", String(activePage - 1))
            setSearchParams(params)
          }}
        >
          <LuChevronLeft size={18} />
        </Button>
        <Button
          classNames={{ root: commonClasses.grayOutlinedButton }}
          color="gray"
          disabled={logs.length < LOGS_PAGE_SIZE || isLoadingLogs}
          radius="md"
          size="xs"
          variant="outline"
          onClick={() => {
            const params = new URLSearchParams()
            params.set("page", String(activePage + 1))
            setSearchParams(params)
          }}
        >
          <LuChevronRight size={18} />
        </Button>
      </Group>
    </Box>
  )
}

export default LogsTable
