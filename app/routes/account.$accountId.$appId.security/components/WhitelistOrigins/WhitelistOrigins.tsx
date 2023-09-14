import { Box, Stack, Text } from "@pokt-foundation/pocket-blocks"
import React from "react"
import useModals from "~/hooks/useModals"
import AddSettingsButton from "~/routes/account.$accountId.$appId.security/components/AddSettingsButton"
import SimpleStringTable from "~/routes/account.$accountId.$appId.security/components/SimpleStringTable"
import WhitelistOriginsModal from "~/routes/account.$accountId.$appId.security/components/WhitelistOriginsModal"

type WhitelistOriginsProps = {
  whitelistOrigins: string[]
}
const WhitelistOrigins = ({ whitelistOrigins }: WhitelistOriginsProps) => {
  const { openFullScreenModal } = useModals()

  return (
    <Box px={40} py={32}>
      <Stack align="flex-start">
        <Text fw={600}>Whitelist Origins</Text>
        <Text>Limits requests to only the HTTP Origins specified.</Text>
        <AddSettingsButton
          onClick={() =>
            openFullScreenModal({
              children: <WhitelistOriginsModal />,
            })
          }
        />
      </Stack>
      {whitelistOrigins.length > 0 && (
        <SimpleStringTable
          data={whitelistOrigins}
          onDelete={() => console.log("DELETE")}
        />
      )}
    </Box>
  )
}

export default WhitelistOrigins
