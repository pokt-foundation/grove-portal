import { Divider } from "@mantine/core"
import { Box, Flex, Input, Title } from "@pokt-foundation/pocket-blocks"
import { MetaFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import { useEffect } from "react"
import { LuSearch } from "react-icons/lu"
import { AppIdOutletContext } from "../account.$accountId.$appId/route"
import AppEndpointsContainer from "~/routes/account.$accountId.$appId._index/components/AppEndpointsContainer"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

export const meta: MetaFunction = () => {
  return {
    title: "Application Details",
  }
}

export const Application = () => {
  const { blockchains } = useOutletContext<AppIdOutletContext>()

  useEffect(() => {
    trackEvent(AmplitudeEvents.AppDetailsView)
  }, [])

  return (
    <Box>
      <Flex align="center" justify="space-between" my="xl">
        <Title order={5}>Endpoints</Title>
        <Input icon={<LuSearch />} placeholder="Search network" />
      </Flex>
      <Divider />
      <AppEndpointsContainer blockchains={blockchains} />
    </Box>
  )
}

export default Application
