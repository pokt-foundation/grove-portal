import { Box, Stack, Text } from "@pokt-foundation/pocket-blocks"
import React from "react"
import useModals from "~/hooks/useModals"
import AddSettingsButton from "~/routes/account.$accountId.$appId.security/components/AddSettingsButton"
import SimpleStringTable from "~/routes/account.$accountId.$appId.security/components/SimpleStringTable"
import WhitelistUserAgentsModal from "~/routes/account.$accountId.$appId.security/components/WhitelistUserAgentsModal"

type WhitelistUserAgentsProps = {
  whitelistUserAgents: string[]
}

const WhitelistUserAgents = ({ whitelistUserAgents }: WhitelistUserAgentsProps) => {
  const { openFullScreenModal } = useModals()

  return (
    <Box px={40} py={32}>
      <Stack align="flex-start">
        <Text fw={600}>Whitelist User-Agents</Text>
        <Text>
          Limits requests to only the HTTP User-Agents specified. If nothing is specified,
          all User-Agents will be accepted.
        </Text>
        <AddSettingsButton
          onClick={() =>
            openFullScreenModal({
              children: <WhitelistUserAgentsModal />,
            })
          }
        />
      </Stack>
      {whitelistUserAgents.length > 0 && (
        <SimpleStringTable
          data={whitelistUserAgents}
          onDelete={() => console.log("DELETE")}
        />
      )}
    </Box>
  )
}

export default WhitelistUserAgents
