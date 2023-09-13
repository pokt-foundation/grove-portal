import { Divider } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { Box, Flex, Input, Title } from "@pokt-foundation/pocket-blocks"
import { MetaFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import { useEffect, useState } from "react"
import { LuSearch } from "react-icons/lu"
import { AppIdOutletContext } from "../account.$accountId.$appId/route"
import AppEndpointsTable from "~/routes/account.$accountId.$appId._index/components/AppEndpointsTable"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

export const meta: MetaFunction = () => {
  return {
    title: "Application Details",
  }
}

export const Application = () => {
  const { blockchains } = useOutletContext<AppIdOutletContext>()
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 200)

  useEffect(() => {
    trackEvent(AmplitudeEvents.AppDetailsView)
  }, [])

  return (
    <Box>
      <Flex align="center" justify="space-between" my="xl">
        <Title order={5}>Endpoints</Title>
        <Input
          icon={<LuSearch />}
          placeholder="Search network"
          value={searchTerm}
          onChange={(event: any) => setSearchTerm(event.currentTarget.value)}
        />
      </Flex>
      <Divider />
      <AppEndpointsTable blockchains={blockchains} searchTerm={debouncedSearchTerm} />
    </Box>
  )
}

export default Application
