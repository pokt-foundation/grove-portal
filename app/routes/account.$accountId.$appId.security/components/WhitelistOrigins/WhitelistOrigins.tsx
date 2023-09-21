import { Box, Stack, Text } from "@pokt-foundation/pocket-blocks"
import React, { Dispatch } from "react"
import { SecurityReducerActions } from "../../view"
import useModals from "~/hooks/useModals"
import AddSettingsButton from "~/routes/account.$accountId.$appId.security/components/AddSettingsButton"
import SimpleStringTable from "~/routes/account.$accountId.$appId.security/components/SimpleStringTable"
import WhitelistOriginsModal from "~/routes/account.$accountId.$appId.security/components/WhitelistOriginsModal"

type WhitelistOriginsProps = {
  dispatch: Dispatch<SecurityReducerActions>
  whitelistOrigins: string[]
}
const WhitelistOrigins = ({ dispatch, whitelistOrigins }: WhitelistOriginsProps) => {
  const { openFullScreenModal } = useModals()

  return (
    <Box px={40} py={32}>
      <Stack align="flex-start">
        <Text fw={600}>Whitelist Origins</Text>
        <Text>Limits requests to only the HTTP Origins specified.</Text>
        <AddSettingsButton
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
          onDelete={(id) => dispatch({ type: "origins-remove", payload: id })}
        />
      )}
    </Box>
  )
}

export default WhitelistOrigins
