import { Auth0Profile } from "remix-auth-auth0"
import { describe, expect, it, vi } from "vitest"
import { authenticator } from "./auth.server"
import {
  getUserProfile,
  requireAdmin,
  requireUser,
  requireUserProfile,
} from "./user.server"

vi.mock("./auth.server", () => ({
  authenticator: {
    isAuthenticated: vi.fn(),
    logout: vi.fn(),
  },
}))

const request = new Request("https://portal.pokt.network")

describe("requireUser", () => {
  it("throws and redrects if there is no user", async () => {
    // @ts-ignore
    vi.mocked(authenticator.isAuthenticated).mockReturnValue(null)

    try {
      await requireUser(request)
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeTruthy()
    }
    expect(authenticator.isAuthenticated).toHaveBeenCalled()
  })
  it("throws, logs out and redriects to /validate if user email is not verified", async () => {
    vi.mocked(authenticator.isAuthenticated).mockReturnValue(
      new Promise((resolve: any) => {
        resolve({
          accessToken: "",
          refreshToken: "",
          extraParams: {
            expires_in: 86400,
            id_token: "",
            scope: "",
            token_type: "Bearer",
          },
          profile: {
            _json: {
              email_verified: false,
              address: {
                country: "",
              },
              birthdate: "",
              email: "",
              family_name: "",
              gender: "",
              given_name: "",
              locale: "",
              middle_name: "",
              name: "",
              nickname: "",
              phone_number: "",
              phone_number_verified: false,
              picture: "",
              preferred_username: "",
              profile: "",
              sub: "",
              updated_at: "",
              website: "",
              zoneinfo: "",
            },
            displayName: "",
            emails: [
              {
                value: "",
              },
            ],
            id: "",
            name: {
              familyName: "",
              givenName: "",
              middleName: "",
            },
            photos: [
              {
                value: "",
              },
            ],
            provider: "",
          },
        })
      }),
    )

    try {
      await requireUser(request)
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeFalsy()
    }
    expect(authenticator.isAuthenticated).toHaveBeenCalled()
    expect(authenticator.logout).toHaveBeenCalledWith(request, {
      redirectTo: "/validate",
    })
  })
  it("returns user", async () => {
    vi.mocked(authenticator.isAuthenticated).mockReturnValue(
      new Promise((resolve: any) => {
        resolve({
          accessToken: "mockToken",
          refreshToken: "",
          extraParams: {
            expires_in: 86400,
            id_token: "",
            scope: "",
            token_type: "Bearer",
          },
          profile: {
            _json: {
              email_verified: true,
              address: {
                country: "",
              },
              birthdate: "",
              email: "",
              family_name: "",
              gender: "",
              given_name: "",
              locale: "",
              middle_name: "",
              name: "",
              nickname: "",
              phone_number: "",
              phone_number_verified: false,
              picture: "",
              preferred_username: "",
              profile: "",
              sub: "",
              updated_at: "",
              website: "",
              zoneinfo: "",
            },
            displayName: "",
            emails: [
              {
                value: "",
              },
            ],
            id: "",
            name: {
              familyName: "",
              givenName: "",
              middleName: "",
            },
            photos: [
              {
                value: "",
              },
            ],
            provider: "",
          },
        })
      }),
    )

    try {
      const user = await requireUser(request)
      expect(user.accessToken).toBe("mockToken")
    } catch (error) {}
    expect(authenticator.isAuthenticated).toHaveBeenCalled()
  })
})

describe("requireUserProfile", () => {
  it("returns user profile", async () => {
    const profile: Auth0Profile = {
      _json: {
        email_verified: true,
        address: {
          country: "",
        },
        birthdate: "",
        email: "",
        family_name: "",
        gender: "",
        given_name: "",
        locale: "",
        middle_name: "",
        name: "",
        nickname: "",
        phone_number: "",
        phone_number_verified: false,
        picture: "",
        preferred_username: "",
        profile: "",
        sub: "",
        updated_at: "",
        website: "",
        zoneinfo: "",
      },
      displayName: "",
      emails: [
        {
          value: "",
        },
      ],
      id: "",
      name: {
        familyName: "",
        givenName: "",
        middleName: "",
      },
      photos: [
        {
          value: "",
        },
      ],
      provider: "",
    }

    vi.mocked(authenticator.isAuthenticated).mockReturnValue(
      new Promise((resolve: any) => {
        resolve({
          accessToken: "mockToken",
          refreshToken: "",
          extraParams: {
            expires_in: 86400,
            id_token: "",
            scope: "",
            token_type: "Bearer",
          },
          profile: profile,
        })
      }),
    )

    try {
      const user = await requireUserProfile(request)
      expect(user).toBe(profile)
    } catch (error) {}
  })
})

describe("requireAdmin", () => {
  it("throws if user is not admin", async () => {
    const profile: Auth0Profile = {
      _json: {
        email_verified: true,
        address: {
          country: "",
        },
        birthdate: "",
        email: "",
        family_name: "",
        gender: "",
        given_name: "",
        locale: "",
        middle_name: "",
        name: "",
        nickname: "",
        phone_number: "",
        phone_number_verified: false,
        picture: "",
        preferred_username: "",
        profile: "",
        sub: "",
        updated_at: "",
        website: "",
        zoneinfo: "",
      },
      displayName: "",
      emails: [
        {
          value: "",
        },
      ],
      id: "",
      name: {
        familyName: "",
        givenName: "",
        middleName: "",
      },
      photos: [
        {
          value: "",
        },
      ],
      provider: "",
    }

    vi.mocked(authenticator.isAuthenticated).mockReturnValue(
      new Promise((resolve: any) => {
        resolve({
          accessToken: "mockToken",
          refreshToken: "",
          extraParams: {
            expires_in: 86400,
            id_token: "",
            scope: "",
            token_type: "Bearer",
          },
          profile: profile,
        })
      }),
    )

    try {
      await requireAdmin(request)
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeTruthy()
    }
  })
  it("returns user if admin", async () => {
    const profile: Auth0Profile = {
      _json: {
        email_verified: true,
        address: {
          country: "",
        },
        birthdate: "",
        email: "",
        family_name: "",
        gender: "",
        given_name: "",
        locale: "",
        middle_name: "",
        name: "",
        nickname: "",
        phone_number: "",
        phone_number_verified: false,
        picture: "",
        preferred_username: "",
        profile: "",
        sub: "",
        updated_at: "",
        website: "",
        zoneinfo: "",
      },
      displayName: "",
      emails: [
        {
          value: "test@pokt.network",
        },
      ],
      id: "",
      name: {
        familyName: "",
        givenName: "",
        middleName: "",
      },
      photos: [
        {
          value: "",
        },
      ],
      provider: "",
    }

    vi.mocked(authenticator.isAuthenticated).mockReturnValue(
      new Promise((resolve: any) => {
        resolve({
          accessToken: "mockToken",
          refreshToken: "",
          extraParams: {
            expires_in: 86400,
            id_token: "",
            scope: "",
            token_type: "Bearer",
          },
          profile: profile,
        })
      }),
    )

    try {
      const user = await requireAdmin(request)
      expect(user).toBe(profile)
    } catch (error) {}
  })
})

describe("getUserProfile", () => {
  it("throws and redrects if there is no user", async () => {
    // @ts-ignore
    vi.mocked(authenticator.isAuthenticated).mockReturnValue(null)

    try {
      await getUserProfile(request)
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeTruthy()
    }
    expect(authenticator.isAuthenticated).toHaveBeenCalled()
  })
  it("returns user", async () => {
    const profile: Auth0Profile = {
      _json: {
        email_verified: true,
        address: {
          country: "",
        },
        birthdate: "",
        email: "",
        family_name: "",
        gender: "",
        given_name: "",
        locale: "",
        middle_name: "",
        name: "",
        nickname: "",
        phone_number: "",
        phone_number_verified: false,
        picture: "",
        preferred_username: "",
        profile: "",
        sub: "",
        updated_at: "",
        website: "",
        zoneinfo: "",
      },
      displayName: "",
      emails: [
        {
          value: "test@pokt.network",
        },
      ],
      id: "",
      name: {
        familyName: "",
        givenName: "",
        middleName: "",
      },
      photos: [
        {
          value: "",
        },
      ],
      provider: "",
    }

    vi.mocked(authenticator.isAuthenticated).mockReturnValue(
      new Promise((resolve: any) => {
        resolve({
          accessToken: "mockToken",
          refreshToken: "",
          extraParams: {
            expires_in: 86400,
            id_token: "",
            scope: "",
            token_type: "Bearer",
          },
          profile: profile,
        })
      }),
    )

    try {
      const user = await getUserProfile(request)
      expect(user).toBe(profile)
    } catch (error) {}
  })
})
