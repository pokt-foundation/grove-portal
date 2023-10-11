import { Divider } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { Box, Flex, Input, Text } from "@pokt-foundation/pocket-blocks"
import React, { useState } from "react"
import { LuSearch } from "react-icons/lu"
import { EmptyState } from "~/components/EmptyState"
import { Logs } from "~/models/dwh/sdk"
import LogsTable from "~/routes/account.$accountId.$appId.logs/components/LogsTable"

type AppLogsProps = {
  logs: Logs[]
}

const AppLogs = ({ logs }: AppLogsProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 200)

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
        title="No logs available yet."
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
        <Input
          icon={<LuSearch />}
          placeholder="Search logs"
          value={searchTerm}
          onChange={(event: any) => setSearchTerm(event.currentTarget.value)}
        />
      </Flex>
      <Divider />
      <LogsTable logs={logs} searchTerm={debouncedSearchTerm} />
    </Box>
  )
}

export default AppLogs
