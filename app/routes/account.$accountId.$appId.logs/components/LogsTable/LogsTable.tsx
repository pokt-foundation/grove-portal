import React, { useState } from "react"
import { DataTable } from "~/components/DataTable"
import { Logs } from "~/models/dwh/sdk"
import { dayjs } from "~/utils/dayjs"

type LogsTableProps = {
  logs: Logs[]
  searchTerm: string
}

const LogsTable = ({ logs, searchTerm }: LogsTableProps) => {
  const [selectedLogsItem, setSelectedLogsItem] = useState<Logs | undefined>()

  return (
    <>
      <DataTable
        columns={["Timestamp", "Method", "Chain ID", "Error type", "Error name"]}
        data={logs.map((log) => {
          return {
            timestamp: {
              element: dayjs(log.ts).format("D MMMM, YYYY h:mm A"),
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
        paginate={logs.length > 10 ? { perPage: 20 } : false}
        searchTerm={searchTerm}
        onRowClick={(logsItem) => setSelectedLogsItem(logsItem as unknown as Logs)}
      />
    </>
  )
}

export default LogsTable
