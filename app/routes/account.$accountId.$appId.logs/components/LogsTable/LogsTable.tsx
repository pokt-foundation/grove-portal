import { Box, Group, Pagination, Text } from "@mantine/core"
import { useNavigation, useSearchParams } from "@remix-run/react"
import React, { useState } from "react"
import { DataTable } from "~/components/DataTable"
import { EmptyState } from "~/components/EmptyState"
import { Blockchain, D2Log } from "~/models/portal/sdk"
import LogsSideDrawer from "~/routes/account.$accountId.$appId.logs/components/LogsSideDrawer"
import { AppLogsData } from "~/routes/account.$accountId.$appId.logs/route"
import { getChainName } from "~/utils/chainUtils"
import { dayjs } from "~/utils/dayjs"

type LogsTableProps = AppLogsData & {
  blockchains: Blockchain[]
}

const LogsTable = ({ logs, meta, blockchains }: LogsTableProps) => {
  const [selectedLogsItem, setSelectedLogsItem] = useState<D2Log | undefined>()
  const navigation = useNavigation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage: number = Number(searchParams.get("page") ?? "1")

  const isLoadingLogs =
    navigation.state === "loading" && navigation.location.pathname.endsWith("/logs")

  return (
    <Box>
      <LogsSideDrawer
        blockchains={blockchains}
        logsItem={selectedLogsItem}
        onSideDrawerClose={() => setSelectedLogsItem(undefined)}
      />
      <DataTable
        columns={["Timestamp", "Method", "Network", "Status"]}
        data={logs?.map((log) => {
          return {
            timestamp: {
              element: dayjs(log.TS).format("D MMMM, YYYY h:mm:ss A"),
              value: log.TS,
            },
            method: {
              element:
                log?.chainMethods?.length && log?.chainMethods?.length > 0
                  ? log?.chainMethods![0]?.name
                  : "-",
              value:
                log?.chainMethods?.length && log?.chainMethods?.length > 0
                  ? log?.chainMethods![0]?.name
                  : "-",
            },
            network: {
              element: getChainName({
                chainId: log.chainID as string,
                chains: blockchains,
              }),
              value: getChainName({
                chainId: log.chainID as string,
                chains: blockchains,
              }),
            },
            status: {
              element: (
                <Text c={log.isError ? "red" : "green"}>
                  {log.isError ? "Error" : "Success"}
                </Text>
              ),
              value: log.isError ? "Error" : "Success",
            },
            rowSelectData: log,
          }
        })}
        emptyState={
          <EmptyState
            imgHeight={256}
            imgSrc="/logs-empty-state.svg"
            imgWidth={256}
            subtitle="Check back later for updates on any logs."
            title="No logs available yet."
          />
        }
        isLoading={isLoadingLogs}
        paginate={false}
        onRowClick={(logsItem) => setSelectedLogsItem(logsItem as unknown as D2Log)}
      />
      <Group gap="md" justify="center" mt="lg">
        <Pagination
          withEdges
          total={meta?.totalPages}
          value={currentPage}
          onChange={(page) => {
            setSearchParams((searchParams) => {
              searchParams.set("page", String(page))
              return searchParams
            })
          }}
        />
      </Group>
    </Box>
  )
}

export default LogsTable
