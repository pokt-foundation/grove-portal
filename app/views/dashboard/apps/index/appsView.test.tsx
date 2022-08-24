import { expect } from "vitest"
import AppsView from "./appsView"
import { render, screen, userEvent } from "test/helpers"
import { endpoints } from "~/models/portal/portal.data"
import { relayMetricPerWeek } from "~/models/relaymeter/relaymeter.data"

const userId = "mock"
const userIdGod = "god"

describe("<AppsView />", () => {
  it("renders without endpoints", () => {
    render(
      <AppsView
        dailyNetworkRelaysPerWeek={relayMetricPerWeek}
        endpoints={null}
        userId={userId}
      />,
    )

    expect(screen.getByRole("heading", { name: /applications/i })).toBeInTheDocument()
    expect(screen.queryByRole("table")).not.toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /1/i })).not.toBeInTheDocument()
  })
  it("renders without pagination", () => {
    render(
      <AppsView
        dailyNetworkRelaysPerWeek={relayMetricPerWeek}
        endpoints={endpoints}
        userId={userId}
      />,
    )

    expect(screen.getByRole("heading", { name: /applications/i })).toBeInTheDocument()
    expect(screen.getByRole("table")).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /1/i })).not.toBeInTheDocument()
  })
  it("renders with pagination", () => {
    render(
      <AppsView
        dailyNetworkRelaysPerWeek={relayMetricPerWeek}
        endpoints={endpoints}
        userId={userIdGod}
      />,
    )

    expect(screen.getByRole("heading", { name: /applications/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /1/i })).toBeInTheDocument()
  })
})
