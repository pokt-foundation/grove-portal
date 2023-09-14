import { Box, Stack, Text } from "@pokt-foundation/pocket-blocks"
import React from "react"
import useModals from "~/hooks/useModals"
import { Blockchain } from "~/models/portal/sdk"
import AddSettingsButton from "~/routes/account.$accountId.$appId.security/components/AddSettingsButton"
import ChainWhitelistModal from "~/routes/account.$accountId.$appId.security/components/ChainWhitelistModal"
import ChainWhitelistTable from "~/routes/account.$accountId.$appId.security/components/ChainWhitelistTable"
import { BlockchainWhitelist } from "~/routes/account.$accountId.$appId.security/utils"

type ChainWhitelistProps = {
  whitelists: BlockchainWhitelist[]
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

const ChainWhitelist = ({ whitelists, blockchains, type }: ChainWhitelistProps) => {
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
          onDelete={() => console.log("DELETE")}
        />
      )}
    </Box>
  )
}

export default ChainWhitelist
