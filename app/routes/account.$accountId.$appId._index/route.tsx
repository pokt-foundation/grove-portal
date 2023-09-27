import { Divider } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { Box, Flex, Input, Title } from "@pokt-foundation/pocket-blocks"
import { ActionFunction, json, MetaFunction } from "@remix-run/node"
import { useActionData, useOutletContext } from "@remix-run/react"
import { useEffect, useState } from "react"
import { LuSearch } from "react-icons/lu"
import invariant from "tiny-invariant"
import { AppIdOutletContext } from "../account.$accountId.$appId/route"
import { initPortalClient } from "~/models/portal/portal.server"
import { PortalApp, PortalAppEnvironment } from "~/models/portal/sdk"
import AppEndpointsTable from "~/routes/account.$accountId.$appId._index/components/AppEndpointsTable"
import { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Application Endpoints ${seo_title_append}`,
  }
}

export type AppIdActionData = {
  app: PortalApp
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
            environment: PortalAppEnvironment.Production,
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

    return json<DataStruct<AppIdActionData>>({
      data: {
        app: udpateUserPortalAppResponse.updateUserPortalApp as PortalApp,
      },
      error: false,
    })
  } catch (error) {
    return json<DataStruct<AppIdActionData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export const Application = () => {
  const { app, blockchains } = useOutletContext<AppIdOutletContext>()
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 200)
  const actionData = useActionData() as DataStruct<AppIdActionData>

  useEffect(() => {
    if (!actionData) return

    if (!actionData.error) {
      showNotification({
        message: "Favorite chain updated",
      })
    }
    if (actionData.error) {
      showNotification({
        message: actionData.message,
      })
    }
  }, [actionData])

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
