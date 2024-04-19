import { Stack, Text } from "@mantine/core"
import React from "react"
import LogsControls from "~/components/LogsControls"
import { Blockchain } from "~/models/portal/sdk"
import LogsTable from "~/routes/account.$accountId.$appId.logs/components/LogsTable"
import { AppLogsData } from "~/routes/account.$accountId.$appId.logs/route"

type AppLogsProps = AppLogsData & {
  blockchains: Blockchain[]
}

const AppLogs = ({ logs, meta, blockchains }: AppLogsProps) => {
  return (
    <Stack mt={22}>
      <Text>
        Logs can be filtered over the last 24 hours with a maximum detail window of one
        hour.
      </Text>
      <LogsControls />
      <LogsTable blockchains={blockchains} logs={logs} meta={meta} />
    </Stack>
  )
}

export default AppLogs
