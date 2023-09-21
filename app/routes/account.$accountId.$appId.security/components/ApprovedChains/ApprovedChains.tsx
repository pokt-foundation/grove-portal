import { Box, Stack, Text } from "@pokt-foundation/pocket-blocks"
import React, { Dispatch } from "react"
import { SecurityReducerActions } from "../../view"
import useModals from "~/hooks/useModals"
import { Blockchain } from "~/models/portal/sdk"
import AddSettingsButton from "~/routes/account.$accountId.$appId.security/components/AddSettingsButton"
import ApprovedChainsModal from "~/routes/account.$accountId.$appId.security/components/ApprovedChainsModal"
import ChainsTable from "~/routes/account.$accountId.$appId.security/components/ChainsTable"

type ApprovedChainsFormProps = {
  approvedChainsIds: string[]
  blockchains: Blockchain[]
  dispatch: Dispatch<SecurityReducerActions>
}

const ApprovedChains = ({
  approvedChainsIds,
  blockchains,
  dispatch,
}: ApprovedChainsFormProps) => {
  const { openFullScreenModal } = useModals()

  return (
    <Box px={40} py={32}>
      <Stack align="flex-start">
        <Text fw={600}>Approved Chains</Text>
        <Text>Limits the Endpoints to be used only with specific chains.</Text>
        <AddSettingsButton
          onClick={() =>
            openFullScreenModal({
              children: (
                <ApprovedChainsModal
                  approvedChainsIds={approvedChainsIds}
                  blockchains={blockchains}
                  dispatch={dispatch}
                />
              ),
            })
          }
        />
      </Stack>
      {approvedChainsIds.length > 0 && (
        <ChainsTable
          blockchains={blockchains}
          selectedBlockchainsIds={approvedChainsIds}
          onDeleteChain={(id) => dispatch({ type: "blockchains-remove", payload: id })}
        />
      )}
    </Box>
  )
}

export default ApprovedChains
