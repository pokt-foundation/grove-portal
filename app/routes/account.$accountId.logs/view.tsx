import { Box, Stack, Text, Title } from "@mantine/core"
import React from "react"
import LogsControls from "app/routes/account.$accountId.logs/components/LogsControls"
import { Blockchain } from "~/models/portal/sdk"
import LogsTable from "~/routes/account.$accountId.logs/components/LogsTable"
import { AccountLogsData } from "~/routes/account.$accountId.logs/route"

type AccountLogsViewProps = AccountLogsData & {
  blockchains: Blockchain[]
}

const AccountLogsView = ({ logs, meta, apps, blockchains }: AccountLogsViewProps) => {
  return (
    <Stack gap="lg">
      <Box>
        <Title order={2}>Logs</Title>
        <Text mt={8}>
          Logs can be filtered over the last 24 hours with a maximum detail window of one
          hour.
        </Text>
      </Box>
      {apps.length > 0 ? <LogsControls apps={apps} /> : null}
      <LogsTable blockchains={blockchains} logs={logs} meta={meta} />
    </Stack>
  )
}

export default AccountLogsView
