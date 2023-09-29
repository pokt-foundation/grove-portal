import { Box, Stack, Text } from "@pokt-foundation/pocket-blocks"
import React, { Dispatch } from "react"
import { SecurityReducerActions } from "../../utils/stateReducer"
import useModals from "~/hooks/useModals"
import AddSettingsButton from "~/routes/account.$accountId.$appId.security/components/AddSettingsButton"
import SimpleStringTable from "~/routes/account.$accountId.$appId.security/components/SimpleStringTable"
import WhitelistUserAgentsModal from "~/routes/account.$accountId.$appId.security/components/WhitelistUserAgentsModal"

type WhitelistUserAgentsProps = {
  dispatch: Dispatch<SecurityReducerActions>
  whitelistUserAgents: string[]
  readOnly: boolean
}

const WhitelistUserAgents = ({
  dispatch,
  whitelistUserAgents,
  readOnly,
}: WhitelistUserAgentsProps) => {
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
          disabled={readOnly}
          onClick={() =>
            openFullScreenModal({
              children: <WhitelistUserAgentsModal dispatch={dispatch} />,
            })
          }
        />
      </Stack>
      {whitelistUserAgents.length > 0 && (
        <SimpleStringTable
          data={whitelistUserAgents}
          onDelete={(id) => dispatch({ type: "userAgents-remove", payload: id })}
        />
      )}
    </Box>
  )
}

export default WhitelistUserAgents
