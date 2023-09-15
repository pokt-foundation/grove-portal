import { Divider } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { Box, Flex, Input, Title } from "@pokt-foundation/pocket-blocks"
import { ActionFunction, json, MetaFunction, redirect } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import { useEffect, useState } from "react"
import { LuSearch } from "react-icons/lu"
import invariant from "tiny-invariant"
import { AppIdOutletContext } from "../account.$accountId.$appId/route"
import { initPortalClient } from "~/models/portal/portal.server"
import AppEndpointsTable from "~/routes/account.$accountId.$appId._index/components/AppEndpointsTable"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getErrorMessage } from "~/utils/catchError"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: "Application Details",
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const formData = await request.formData()
  const { accountId, appId } = params
  const isFavorite = formData.get("isFavorite")
  const chainId = formData.get("chainId")
  const favoriteChains = formData.get("favoriteChains")

  try {
    invariant(accountId && typeof accountId === "string", "accountId not found")
    invariant(appId && typeof appId === "string", "appId not found")
    invariant(isFavorite && typeof isFavorite === "string", "isFavorite not found")
    invariant(chainId && typeof chainId === "string", "chainId not found")
    invariant(
      favoriteChains && typeof favoriteChains === "string",
      "favoriteChains not found",
    )

    const oldFavs: string[] = JSON.parse(favoriteChains)
    const newFavs =
      isFavorite === "true"
        ? [...oldFavs, chainId]
        : oldFavs.filter((f: string) => f !== chainId)

    const udpateUserPortalAppResponse = await portal
      .updateUserPortalApp({
        input: {
          appID: appId,
          appSettings: {
            favoritedChainIDs: newFavs,
          },
        },
      })
      .catch((err) => {
        console.log(err)
        throw new Error(
          `portal api could not update app ${appId} with favoriteChain ${chainId}`,
        )
      })

    if (!udpateUserPortalAppResponse.updateUserPortalApp) {
      throw new Error(
        `portal api could not update app ${appId} with favoriteChain ${chainId}`,
      )
    }

    return null
  } catch (error) {
    return json({
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export const Application = () => {
  const { app, blockchains } = useOutletContext<AppIdOutletContext>()
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
      <AppEndpointsTable
        blockchains={blockchains}
        favoriteChains={app.settings.favoritedChainIDs}
        searchTerm={debouncedSearchTerm}
      />
    </Box>
  )
}

export default Application
