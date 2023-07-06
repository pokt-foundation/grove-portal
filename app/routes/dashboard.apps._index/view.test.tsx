import { afterEach, beforeEach, describe, expect, vi } from "vitest"
import AppsView from "./view"
import { render, screen } from "test/helpers"
import {
  endpoints as endpointsData,
  pendingEndpoints,
  profileMockData,
  testPortalUserId,
} from "~/models/portal/portal.data"
import { EndpointsQuery } from "~/models/portal/sdk"
import { relayMetricPerPeriod } from "~/models/relaymeter/relaymeter.data"

vi.mock("@remix-run/react", async () => {
  return {
    ...(await vi.importActual<any>("@remix-run/react")),
    useOutletContext: vi.fn(),
    useSearchParams: vi.fn(() => [new URLSearchParams()]),
  }
})

afterEach(() => {
  vi.clearAllMocks()
})

describe("<AppsView />", () => {
  const userIdGod = "god"

  const setup = ({
    endpoints = endpointsData,
    userId = "mock",
    hasSearchParamsError = false,
  }: {
    endpoints?: EndpointsQuery | null
    userId?: string
    hasSearchParamsError?: boolean
  }) => {
    return render(
      <AppsView
        dailyNetworkRelaysPerPeriod={relayMetricPerPeriod}
        endpoints={endpoints}
        pendingEndpointsQuery={pendingEndpoints}
        portalUserId={testPortalUserId}
        profile={profileMockData}
        searchParams={
          new URLSearchParams({ error: hasSearchParamsError ? "true" : "false" })
        }
        userId={userId}
      />,
    )
  }

  describe("when endpoints data is null", () => {
    beforeEach(async () => {
      setup({ endpoints: null })
    })

    it("renders without endpoints", async () => {
      expect(screen.getByRole("tab", { name: /my applications/i })).toBeInTheDocument()
      expect(screen.queryByRole("table")).not.toBeInTheDocument()
      expect(screen.queryByRole("button", { name: /1/i })).not.toBeInTheDocument()
    })
  })

  describe("when there is endpoints data and user is not god", () => {
    beforeEach(async () => {
      setup({})
    })

    it("renders without pagination", () => {
      expect(screen.getByRole("tab", { name: /my applications/i })).toBeInTheDocument()
      expect(screen.getByRole("table")).toBeInTheDocument()
      expect(screen.queryByRole("button", { name: /1/i })).not.toBeInTheDocument()
    })
  })

  describe("when there are endpoints and user is god", () => {
    beforeEach(async () => {
      setup({ userId: userIdGod })
    })

    it("renders with pagination", () => {
      expect(screen.getByRole("tab", { name: /my applications/i })).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /1/i })).toBeInTheDocument()
    })
  })

  describe("when there is a searchParams error", () => {
    beforeEach(async () => {
      setup({ hasSearchParamsError: true })
    })

    it("renders error modal", () => {
      expect(
        screen.getByRole("dialog", {
          name: /these are not the droids you are looking for./i,
        }),
      ).toBeInTheDocument()
    })
  })
})
