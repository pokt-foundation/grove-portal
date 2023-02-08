import { expect } from "vitest"
import AppsView from "./appsView"
import { render, screen } from "test/helpers"
import { endpoints, teamsMockData } from "~/models/portal/portal.data"
import { relayMetricPerWeek } from "~/models/relaymeter/relaymeter.data"

const userId = "mock"
const userIdGod = "god"

describe("<AppsView />", () => {
  it("renders without endpoints", () => {
    render(
      <AppsView
        dailyNetworkRelaysPerWeek={relayMetricPerWeek}
        endpoints={null}
        searchParams={new URLSearchParams({ error: "false" })}
        teams={teamsMockData}
        userId={userId}
      />,
    )

    expect(screen.getByRole("tab", { name: /my applications/i })).toBeInTheDocument()
    expect(screen.queryByRole("table")).not.toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /1/i })).not.toBeInTheDocument()
  })
  it("renders without pagination", () => {
    render(
      <AppsView
        dailyNetworkRelaysPerWeek={relayMetricPerWeek}
        endpoints={endpoints}
        searchParams={new URLSearchParams({ error: "false" })}
        teams={teamsMockData}
        userId={userId}
      />,
    )

    expect(screen.getByRole("tab", { name: /my applications/i })).toBeInTheDocument()
    expect(screen.getByRole("table")).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /1/i })).not.toBeInTheDocument()
  })
  it("renders with pagination", () => {
    render(
      <AppsView
        dailyNetworkRelaysPerWeek={relayMetricPerWeek}
        endpoints={endpoints}
        searchParams={new URLSearchParams({ error: "false" })}
        teams={teamsMockData}
        userId={userIdGod}
      />,
    )

    expect(screen.getByRole("tab", { name: /my applications/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /1/i })).toBeInTheDocument()
  })
  it("renders error modal", () => {
    render(
      <AppsView
        dailyNetworkRelaysPerWeek={relayMetricPerWeek}
        endpoints={endpoints}
        searchParams={new URLSearchParams({ error: "true" })}
        teams={teamsMockData}
        userId={userIdGod}
      />,
    )

    expect(
      screen.getByRole("dialog", {
        name: /these are not the droids you are looking for./i,
      }),
    ).toBeInTheDocument()
  })
})
