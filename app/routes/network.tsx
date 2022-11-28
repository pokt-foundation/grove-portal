import { LoaderFunction, json, MetaFunction } from "@remix-run/node"
import { useLoaderData, useTransition } from "@remix-run/react"
import { Block } from "~/models/indexer/sdk"
import { initPoktScanClient } from "~/models/poktscan/poktscan.server"
import { GetHighestBlockQuery } from "~/models/poktscan/sdk"
import { initPortalClient } from "~/models/portal/portal.server"
import { Blockchain } from "~/models/portal/sdk"
import {
  getRelays,
  getRelaysPerWeek,
  RelayMetric,
} from "~/models/relaymeter/relaymeter.server"
import { dayjs } from "~/utils/dayjs"
import NetworkView, { links as NetworkViewLinks } from "~/views/network/networkView"

export const links = () => {
  return [...NetworkViewLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: "Pocket Network Summary | POKT",
  }
}

export type LatestBlockType = Block & {
  // took: number
  total_accounts: number
  total_apps: number
  total_nodes: number
  // total_relays_completed: number
  total_txs: number
}

export type NetworkLoaderData = {
  blockchains: Blockchain[] | null
  dailyNetworkRelaysPerWeek: RelayMetric[]
  dailyNetworkRelays: RelayMetric
  weeklyNetworkRelays: RelayMetric
  monthlyNetworkRelays: RelayMetric
  poktscanLatestBlock: GetHighestBlockQuery | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const portal = initPortalClient()
  const blockchainResponse = await portal.blockchains({ active: true }).catch((e) => {
    console.log(e)
  })

  const poktscan = initPoktScanClient()
  const poktscanLatestBlock =
    (await poktscan.getHighestBlock().catch((e) => {
      console.log(e)
    })) ?? null

  const dailyNetworkRelaysPerWeek = await getRelaysPerWeek("network")
  // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one full day
  const today = dayjs().utc().hour(0).minute(0).second(0).millisecond(0).format()
  const week = dayjs()
    .utc()
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .subtract(6, "day")
    .format()
  const month = dayjs()
    .utc()
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .subtract(1, "month")
    .format()
  const dailyNetworkRelays = await getRelays("network", today, today)
  const weeklyNetworkRelays = await getRelays("network", week, today)
  const monthlyNetworkRelays = await getRelays("network", month, today)

  return json<NetworkLoaderData>(
    {
      blockchains: blockchainResponse
        ? (blockchainResponse.blockchains.filter(
            (chain) => chain !== null,
          ) as Blockchain[])
        : null,
      // latestBlock,
      dailyNetworkRelaysPerWeek,
      dailyNetworkRelays,
      weeklyNetworkRelays,
      monthlyNetworkRelays,
      poktscanLatestBlock,
    },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

export default function Index() {
  const {
    blockchains,
    dailyNetworkRelaysPerWeek,
    dailyNetworkRelays,
    monthlyNetworkRelays,
    weeklyNetworkRelays,
    // latestBlock,
    poktscanLatestBlock,
  } = useLoaderData() as NetworkLoaderData
  const { state } = useTransition()
  return (
    <NetworkView
      blockchains={blockchains}
      dailyNetworkRelays={dailyNetworkRelays}
      dailyNetworkRelaysPerWeek={dailyNetworkRelaysPerWeek}
      monthlyNetworkRelays={monthlyNetworkRelays}
      poktscanLatestBlock={poktscanLatestBlock}
      state={state}
      weeklyNetworkRelays={weeklyNetworkRelays}
    />
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h3>{error.message}</h3>
      <p>{error.stack}</p>
    </div>
  )
}
