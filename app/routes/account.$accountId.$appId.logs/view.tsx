import { Divider } from "@mantine/core"
import { Box, Flex, Text } from "@pokt-foundation/pocket-blocks"
import { useSearchParams } from "@remix-run/react"
import React from "react"
import { EmptyState } from "~/components/EmptyState"
import { Logs } from "~/models/dwh/sdk"
import LogsTable from "~/routes/account.$accountId.$appId.logs/components/LogsTable"

type AppLogsProps = {
  logs: Logs[]
}

const AppLogs = ({ logs }: AppLogsProps) => {
  const [searchParams] = useSearchParams()
  const hasActivePage = Boolean(searchParams.get("page"))

  if (logs.length === 0) {
    return (
      <EmptyState
        imgHeight={256}
        imgSrc="/logs-empty-state.svg"
        imgWidth={256}
        subtitle={
          <>
            They refresh hourly and are retained for 3 hours.
            <br />
            Check back later for updates on any errors.
          </>
        }
        title={hasActivePage ? "No more logs available." : "No logs available yet."}
      />
    )
  }

  return (
    <Box mb={70}>
      <Flex align="center" justify="space-between" my="xl">
        <Text>
          Logs update hourly and are retained for a 3-hour window, ensuring you have the
          most relevant data at your disposal.
        </Text>
      </Flex>
      <Divider />
      <LogsTable logs={logs} />
    </Box>
  )
}

export default AppLogs
