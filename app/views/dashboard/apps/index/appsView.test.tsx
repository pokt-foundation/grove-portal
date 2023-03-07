import { expect } from "vitest"
import AppsView from "./appsView"
import { render, screen } from "test/helpers"
import { endpoints } from "~/models/portal/portal.data"
import { relayMetricPerWeek } from "~/models/relaymeter/relaymeter.data"
import { PocketUser } from "~/routes/api/user"

const userId = "mock"
const userIdGod = "god"
const user: PocketUser = {
  profile: {
    displayName: "Test User",
    emails: [{ value: "test@test.test" }],
    id: userId,
    name: {
      familyName: "",
      givenName: "",
      middleName: "",
    },
    photos: [{ value: "" }],
    provider: "",
    _json: {
      address: {
        country: "USA",
      },
      birthdate: "",
      email: "",
      email_verified: true,
      family_name: "",
      gender: "",
      given_name: "",
      locale: "",
      middle_name: "",
      name: "",
      nickname: "",
      phone_number: "",
      phone_number_verified: true,
      picture: "",
      preferred_username: "",
      profile: "",
      sub: "",
      updated_at: "",
      website: "",
      zoneinfo: "",
    },
  },
  extraParams: {
    expires_in: 86400,
    id_token: "",
    scope: "",
    token_type: "Bearer",
  },
  accessToken: "",
  refreshToken: "",
}

describe("<AppsView />", () => {
  it("renders without endpoints", () => {
    render(
      <AppsView
        dailyNetworkRelaysPerWeek={relayMetricPerWeek}
        endpoints={null}
        searchParams={new URLSearchParams({ error: "false" })}
        user={user}
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
        user={user}
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
        user={user}
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
        user={user}
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
