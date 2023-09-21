import { Box, Stack, Text } from "@pokt-foundation/pocket-blocks"
import React from "react"
import { SecurityReducerActions } from "../../view"
import useModals from "~/hooks/useModals"
import { Blockchain, WhitelistContractsV2, WhitelistMethodsV2 } from "~/models/portal/sdk"
import AddSettingsButton from "~/routes/account.$accountId.$appId.security/components/AddSettingsButton"
import ChainWhitelistModal from "~/routes/account.$accountId.$appId.security/components/ChainWhitelistModal"
import ChainWhitelistTable from "~/routes/account.$accountId.$appId.security/components/ChainWhitelistTable"

type ChainWhitelistProps = {
  dispatch: Dispatch<SecurityReducerActions>
  whitelists: WhitelistContractsV2[] | WhitelistMethodsV2[]
  blockchains: Blockchain[]
  type: "contracts" | "methods"
}

export const whitelistInfo = {
  contracts: {
    title: "Whitelist Contracts",
    subtitle: "Limits requests to the smart contract addresses specified.",
  },
  methods: {
    title: "Whitelist Methods",
    subtitle: "Limits requests to use specific RPC methods.",
  },
}

const ChainWhitelist = ({
  dispatch,
  whitelists,
  blockchains,
  type,
}: ChainWhitelistProps) => {
  const { openFullScreenModal } = useModals()

  return (
    <Box px={40} py={32}>
      <Stack align="flex-start">
        <Text fw={600}>{whitelistInfo[type].title}</Text>
        <Text>{whitelistInfo[type].subtitle}</Text>
        <AddSettingsButton
          onClick={() =>
            openFullScreenModal({
              children: <ChainWhitelistModal blockchains={blockchains} type={type} />,
            })
          }
        />
      </Stack>
      {whitelists.length > 0 && (
        <ChainWhitelistTable
          blockchainWhitelist={whitelists}
          blockchains={blockchains}
          type={type}
          onDelete={() => console.log("DELETE")}
        />
      )}
    </Box>
  )
}

export default ChainWhitelist
