import { expect } from "vitest"
import NetworkView from "./networkView"
import { render, screen } from "test/helpers"
import { latestBlock, chainTotals } from "~/models/poktscan/poktscan.data"
import { blockchains } from "~/models/portal/portal.data"
import {
  relayMetricPerWeek,
  month,
  today,
  week,
} from "~/models/relaymeter/relaymeter.data"

describe("<NetworkView />", () => {
  it("renders view", () => {
    render(
      <NetworkView
        blockchains={blockchains}
        dailyNetworkRelays={today}
        dailyNetworkRelaysPerWeek={relayMetricPerWeek}
        monthlyNetworkRelays={month}
        poktscanChains={chainTotals}
        poktscanLatestBlock={latestBlock}
        state={"idle"}
        weeklyNetworkRelays={week}
      />,
    )

    const headers = [
      /network summary/i,
      /network success rate/i,
      /relay count/i,
      /available networks/i,
      /latest block/i,
      /relay performance/i,
      /share feedback/i,
    ]

    headers.forEach((header) => {
      expect(screen.getByRole("heading", { name: header })).toBeInTheDocument()
    })
  })
  it("hides blockchains when PUB returns an error or nothing", () => {
    render(
      <NetworkView
        blockchains={null}
        dailyNetworkRelays={today}
        dailyNetworkRelaysPerWeek={relayMetricPerWeek}
        monthlyNetworkRelays={month}
        poktscanChains={chainTotals}
        poktscanLatestBlock={latestBlock}
        state={"idle"}
        weeklyNetworkRelays={week}
      />,
    )

    expect(
      screen.queryByRole("heading", { name: /available networks/i }),
    ).not.toBeInTheDocument()
  })
  it("hides latest block when poktscan returns an error or nothing", () => {
    render(
      <NetworkView
        blockchains={blockchains}
        dailyNetworkRelays={today}
        dailyNetworkRelaysPerWeek={relayMetricPerWeek}
        monthlyNetworkRelays={month}
        poktscanChains={null}
        poktscanLatestBlock={null}
        state={"idle"}
        weeklyNetworkRelays={week}
      />,
    )

    expect(
      screen.queryByRole("heading", { name: /latest block/i }),
    ).not.toBeInTheDocument()
  })
})
