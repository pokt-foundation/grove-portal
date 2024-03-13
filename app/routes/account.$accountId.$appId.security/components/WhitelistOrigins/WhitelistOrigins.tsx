import { Box, Stack, Text } from "@mantine/core"
import React, { Dispatch } from "react"
import { SecurityReducerActions } from "../../utils/stateReducer"
import useModals from "~/hooks/useModals"
import AddSettingsButton from "~/routes/account.$accountId.$appId.security/components/AddSettingsButton"
import SimpleStringTable from "~/routes/account.$accountId.$appId.security/components/SimpleStringTable"
import WhitelistOriginsModal from "~/routes/account.$accountId.$appId.security/components/WhitelistOriginsModal"

type WhitelistOriginsProps = {
  dispatch: Dispatch<SecurityReducerActions>
  whitelistOrigins: string[]
  readOnly: boolean
}
const WhitelistOrigins = ({
  dispatch,
  whitelistOrigins,
  readOnly,
}: WhitelistOriginsProps) => {
  const { openFullScreenModal } = useModals()

  return (
    <Box py={32}>
      <Stack align="flex-start">
        <Text fw={600}>Whitelist Origins</Text>
        <Text>Limits requests to only the HTTP Origins specified.</Text>
        <AddSettingsButton
          disabled={readOnly}
          onClick={() =>
            openFullScreenModal({
              children: <WhitelistOriginsModal dispatch={dispatch} />,
            })
          }
        />
      </Stack>
      {whitelistOrigins.length > 0 && (
        <SimpleStringTable
          data={whitelistOrigins}
          readOnly={readOnly}
          onDelete={(id) => dispatch({ type: "origins-remove", payload: id })}
        />
      )}
    </Box>
  )
}

export default WhitelistOrigins
