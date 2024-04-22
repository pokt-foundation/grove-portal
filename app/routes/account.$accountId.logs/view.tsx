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
          Logs are updated every minute and can be filtered to any one-hour window from
          the past 24 hours.
        </Text>
      </Box>
      {apps.length > 0 ? <LogsControls apps={apps} /> : null}
      <LogsTable blockchains={blockchains} logs={logs} meta={meta} />
    </Stack>
  )
}

export default AccountLogsView
